import React from 'react';
import "./Home.css";
import { HomeNavBar } from '../components/Bars/HomeNavBar';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { StandardNavBar } from '../components/Bars/StandardNavBar';
import Footer from '../components/Bars/Footer';
import { NotificationBar } from '../components/Bars/NotificationBar';

export const Home = ({ getSearchTerm }) => {
    return (
        <div>
            <HomeNavBar />
            
            {/* <NotificationBar /> */}
            <div className='HomeSearchBar'>
                <SearchBar getSearchTerm={getSearchTerm} />
            </div>
            <Footer />
        </div>
    );
}
