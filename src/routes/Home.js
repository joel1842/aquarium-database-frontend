import React from 'react';
import "../css/Home.css";
import { HomeNavBar } from '../components/Bars/HomeNavBar';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { MobileMenu } from '../components/Bars/MobileMenu';
import Footer from '../components/Bars/Footer';

export const Home = ({ getSearchTerm }) => {
    return (
        <>
            {/* <MobileMenu/> */}
            <div>
                <HomeNavBar />
                <div className='HomeSearchBar'>
                    <SearchBar getSearchTerm={getSearchTerm} />
                </div>
                <Footer />
            </div>
        </>
    );
}
