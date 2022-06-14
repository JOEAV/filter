import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getFilteredResults, getInitalData } from '../api/api.js'
const mockData = getInitalData()

const appInitialState = {
  value: {filteredResults:mockData},
  status: 'empty',
};


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getFilteredByFilterAsync = createAsyncThunk(
  'app/getFilteredResults',
  async (filters,thunkAPI) => {
    try{
       if(filters.length > 0){
        let requestUrl = 'filteredResults?'
        filters.forEach(filter=>{
          
           requestUrl = requestUrl.concat(`&fieldName=${filter.name}&eq=${filter.eq}&fieldValue=${filter.value}`)
        })
        let response = await getFilteredResults(requestUrl)
        
        console.log(response)
        return response
       }else{
         return mockData
       }
       
    }catch(err){
      if(axios.isAxiosError(err)){
        return thunkAPI.rejectWithValue(err)  
        }
      }
   
    })

export const appSlice = createSlice({
  name: 'app',
  initialState:appInitialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFilteredByFilterAsync.pending, (state) => {
        state.status = 'loading';

      })
      .addCase(getFilteredByFilterAsync.fulfilled, (state,{payload}) => {
          const filteredResults = payload.data?? payload
          state.value.filteredResults = filteredResults
          
          state.status = 'loaded'
        
        
      })
      .addCase(getFilteredByFilterAsync.rejected, (state,{payload}) => {
        console.log('reject payload', payload)
          state.status='error'

        })
    }
});

export const {addFilter,removeFilter} = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectFilteredResults = (state) => state.app.value.filteredResults
export const selectIsLoading = (state) => state.app.status === 'loading' || state.app.status === 'empty'
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default appSlice.reducer;
