import { StandardNavBar } from "../components/Bars/StandardNavBar"
import { FishExpanded } from "../components/Cards/FishCardExpanded.js"
import Footer from "../components/Bars/Footer"
import { FishPageNavBar } from "../components/Bars/FishPageNavBar"

 export const FishPage = ({fishData, tanks}) => {
    return(
        <>
            <FishPageNavBar />         
            <FishExpanded tanks={tanks} fishData={fishData}/>
            <Footer />
        </>
    )
}
