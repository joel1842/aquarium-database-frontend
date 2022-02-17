import { StandardNavBar } from "../components/Bars/StandardNavBar"
import { FishExpanded } from "../components/Cards/FishCardExpanded.js"
import Footer from "../components/Bars/Footer"

 export const FishPage = ({fishData, tanks, getSearchTerm}) => {
    return(
        <>
            <StandardNavBar getSearchTerm={getSearchTerm}/>
            <FishExpanded tanks={tanks} fishData={fishData}/>
            <Footer />
        </>
    )
}
