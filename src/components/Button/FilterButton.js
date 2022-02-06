import React, { useEffect, useState } from 'react';
import './FilterButton.css';

//Button to filter fish!
export const FilterButton = ({label, filterCriterion, category, getFilterCriterion}) => {

    return(
        <button className='FilterButton' onClick={() => getFilterCriterion(filterCriterion, category)}>
            <p>{label}</p>
        </button>
    );
}