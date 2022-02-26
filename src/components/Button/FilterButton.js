import React from 'react';
import './FilterButton.css';

// Button to filter fish
// Takes label, filterCriterion & category
export const FilterButton = ({label, filterCriterion, category, getFilterCriterion}) => {

    return(
        <button className='FilterButton' onClick={() => getFilterCriterion(filterCriterion, category)}>
            <p>{label}</p>
        </button>
    );
}