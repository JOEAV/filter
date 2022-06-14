import { FilterComponent } from "../components/FilterComponent";
import { TableComponent } from "../components/TableComponent";
import { HeaderResponsive } from "../components/HeaderResponsive"; 
import {useAppSelector} from '../app/hooks'
import { selectFilteredResults } from "./appSlice";

export function HomePage(){
    const currentFindingsData = useAppSelector(selectFilteredResults)
    return(
        <>
        <HeaderResponsive/>
        <main>
        <FilterComponent/>
        <TableComponent rowsData={currentFindingsData}/>
        </main>
        </>
    )
}