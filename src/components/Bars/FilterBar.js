import React, { useState } from 'react';
import { FilterButton } from "../Button/FilterButton"
import burger from "../../assets/hamburgermenu.png"
import "./filterbar.css"
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

const FilterBar = ({getFilterCriterion}) => {

    const [active, setActive] = useState(false)
    const filterSwitch = () => {
        if (active) {
            setActive(false)
        } else {
            setActive(true)
        }
    }


        return (
            <div>
                <button className="filterToggle" onClick={filterSwitch}>
                    <img src={burger} alt="Filters"/>
                    <p>Filters</p>
                </button>
                {active && 
                <div className={active ? 'filterBox active' : 'filterBox'}>
                    <div className='filter'>
                        <p className='filterHead'>Difficulty</p>
                        <FilterButton label='Beginner' filterCriterion='beginner' category='careLevel' getFilterCriterion={getFilterCriterion}/>
                        <FilterButton label='Intermediate' filterCriterion='intermediate' category='careLevel' getFilterCriterion={getFilterCriterion}/>
                        <FilterButton label='Difficult' filterCriterion='difficult' category='careLevel' getFilterCriterion={getFilterCriterion}/>
                    </div>
                    <div className='filter'>
                        <p className='filterHead'>Diet Type</p>
                        <FilterButton label='Herbivore' filterCriterion='herbivore' category='diettype' getFilterCriterion={getFilterCriterion}/>
                        <FilterButton label='Omnivore' filterCriterion='omnivore' category='diettype' getFilterCriterion={getFilterCriterion}/>
                        <FilterButton label='Carnivore' filterCriterion='carnivore' category='diettype' getFilterCriterion={getFilterCriterion}/>
                    </div>
                    <div className='filter'>
                        <p className='filterHead'>Plants?</p>
                        <FilterButton label='Yes' filterCriterion='yes' category='plants' getFilterCriterion={getFilterCriterion}/>
                        <FilterButton label='Monitor' filterCriterion='monitor' category='plants' getFilterCriterion={getFilterCriterion}/>
                        <FilterButton label='No' filterCriterion='no' category='plants' getFilterCriterion={getFilterCriterion}/>
                    </div>
                </div>}
            </div>
        )

}

export default FilterBar;