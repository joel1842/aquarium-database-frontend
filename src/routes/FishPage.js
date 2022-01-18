import { StandardNavBar } from "../components/Bars/StandardNavBar"
import { FishExpanded } from "../components/Cards/FishCard/FishCardExpanded.js"
import Footer from "../components/Bars/Footer"

 export const FishPage = ({fishData, tanks}) => {
    return(
        <>
            <StandardNavBar />
            <FishExpanded tanks={tanks} fishData={fishData}/>
            <Footer />
        </>
    )
}
