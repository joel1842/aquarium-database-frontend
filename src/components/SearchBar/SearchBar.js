import React from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css';
import MagnifyingGlass from '../../assets/Search_duotone_icon.svg';

// search bar component
export const SearchBar = ({ getSearchTerm }) => {
    return(
        <div className="searchContainer">
            <input 
                className="SearchText" 
                type="text" 
                placeholder="What 🐠 are you looking for?"
                onChange={(event) => {
                    getSearchTerm(event.target.value)
                }} 
            />
            <Link to="/browse">
                <button className="SearchSubmitButton">
                    <img className='SearchButtonImage' alt='Search Button' src={MagnifyingGlass}></img>
                </button>
            </Link>
        </div>
    );
};
