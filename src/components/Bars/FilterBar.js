import { FilterButton } from "../Button/FilterButton"
import "./filterbar.css"

const FilterBar = ({getFilterCriterion}) => {
    return (
        <div className="filterBar">
            <FilterButton label='Beginner' filterCriterion='beginner' category='careLevel' getFilterCriterion={getFilterCriterion}/>
            <FilterButton label='Intermediate' filterCriterion='intermediate' category='careLevel' getFilterCriterion={getFilterCriterion}/>
            <FilterButton label='Difficult' filterCriterion='difficult' category='careLevel' getFilterCriterion={getFilterCriterion}/>
            <FilterButton label='Plant Compatible' filterCriterion='yes' category='plants' getFilterCriterion={getFilterCriterion}/>
            <FilterButton label='Omnivore' filterCriterion='omnivore' category='diettype' getFilterCriterion={getFilterCriterion}/>
        </div>
    )
}

export default FilterBar;