import { StandardNavBar } from "../components/Bars/StandardNavBar"
import { FishExpanded } from "../components/Cards/FishCard/fishCardExpanded"

 export const FishPage = ({fishData}) => {
    return(
        <>
            <StandardNavBar />
            <FishExpanded fishData={fishData}/>
        </>
    )
}
