import { StandardNavBar } from "../components/Bars/StandardNavBar"
import { FishExpanded } from "../components/Cards/FishCard/fishCardExpanded"
import Footer from "../components/Bars/Footer"

 export const FishPage = ({fishData}) => {
    return(
        <>
            <StandardNavBar />
            <FishExpanded fishData={fishData}/>
            <Footer />
        </>
    )
}
