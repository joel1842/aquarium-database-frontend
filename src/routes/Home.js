import React from 'react';
import "./Home.css";
import { HomeNavBar } from '../components/Bars/HomeNavBar';
import { SearchBar } from '../components/SearchBar/SearchBar';
import Footer from '../components/Bars/Footer';


export const Home = ({ getSearchTerm }) => {
    return (
        <div>
            <HomeNavBar />
            <div className='HomeSearchBar'>
                <SearchBar getSearchTerm={getSearchTerm} />
            </div>
            <Footer />
        </div>
    );
}
