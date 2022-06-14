import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockData, mapFieldNameToValue } from "./mockData.js";
import _ from "lodash";
const mockAPI = new MockAdapter(axios);

const createFilterFunction = (filterConfig) => {
  const { fieldName, eq, fieldValue } = filterConfig;
  const resFilterFunction = (findingDataValue) => {
      
    const valueToBeCompared = mapFieldNameToValue(findingDataValue, fieldName);
    const answer = eq
    ? valueToBeCompared === fieldValue
    : valueToBeCompared !== fieldValue;
    
    return answer 
  };
  return resFilterFunction;
};
const buildFilteredResults = (queryParams) => {
  const filtersArr = [];
  for (let i = 0; i < queryParams.fieldName.length; i++) {
    const filterFuncConfig = {
      fieldName: queryParams.fieldName[i],
      eq: queryParams.eq[i],
      fieldValue: queryParams.fieldValue[i],
    };
    filtersArr.push(createFilterFunction(filterFuncConfig));
  }
  const filterFromPredicates = _.flow(_.overEvery, _.curryRight(_.filter));
  const filtersTransformation = filterFromPredicates(filtersArr.reverse());
  const filteredNodeList = filtersTransformation(mockData);
  return filteredNodeList;
};
mockAPI.onGet(/filteredResults\?.*/).reply((config) => {
  console.log(config.url, parseQueryString(config.url));
  const queryParams = parseQueryString(config.url);
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve([202, buildFilteredResults(queryParams)]);
    }, 1000);
  });
});

function parseQueryString(url) {
  const queryString = url.replace(/.*\?/, "");

  if (queryString === url || !queryString) {
    return null;
  }

  const urlParams = new URLSearchParams(queryString);
  const result = {
    fieldName: [],
    eq: [],
    fieldValue: [],
  };

  //this way the resultObject will have {fieldType[],eq:[],fieldValue:[]}
  //concatinating fieldType[i] with eq[i] and fieldValue[i] will generate
  //filterFuncParams to create the relevant filter
  urlParams.forEach((val, key) => {
    if (key === "eq") {
      result[key].push(val === "=" ? true : false);
      //e.g if the param is Score=5
    } else if (key === "fieldValue" && !isNaN(parseInt(val))) {
      result[key].push(parseInt(val));
      //e.g ticketStatus might be null
    } else if (key === "fieldValue" && val === "null") {
      result[key].push(null);
    } else {
      result[key].push(val);
    }
  });

  return result;
}

export function getFilteredResults(url) {
  return axios.get(url).then(function (response) {
    console.log(response.data);
    return response;
  });
}

export function getInitalData(){return mockData}