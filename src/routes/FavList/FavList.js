import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { FavCard } from "../../components/Cards/FavCard";
import { StandardNavBar } from '../../components/Bars/StandardNavBar';
import Footer from "../../components/Bars/Footer";
import Loading from "../Loading";
import './FavList.css';

const FavList = ({ getSearchTerm }) => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [userFavs, setUserFavs] = useState()
    const [deleted, setDeleted] = useState(false)

    const deleteFish = () => {
        setDeleted(true);
    }

    const catchFavs = async () => {
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch('https://fishtank-wiki.herokuapp.com/favList', {
                method: 'GET',    
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json; charset=UTF-8"
                }
            });
            const responseData = await response.json()
            if (responseData.length > 0) {
                setUserFavs(responseData)
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        if (isAuthenticated) {
            catchFavs()
            setDeleted(false)
        }

    }, [isAuthenticated, deleted])

    return(
        <div>
            <StandardNavBar getSearchTerm={getSearchTerm}/>

            {!userFavs && 
            <div>
                <h1 className='favHeader'>My Favorites</h1>
                <h3 className="noFishSub">You don't have any favorites...</h3>
                <Link to="/browse">
                    <button className="addFishButton">Add Fish!</button>
                </Link>
            </div>}

            {userFavs &&           
            <div className="favContainer">
                <h1 className='favHeader'>My Favorites</h1>
                {isAuthenticated && userFavs && userFavs.map((userData, index) => (
                    <FavCard userData={userData} deleteFish={deleteFish} key={index}/>
                ))}
            </div>}

            <Footer />
        </div>
    )
}
export default withAuthenticationRequired(FavList, {
    onRedirecting: () => <Loading />,
  });