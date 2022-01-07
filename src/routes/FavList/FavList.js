import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { FavCard } from "../../components/Cards/FishCard/FavCard";
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
            const data = {
                user: user.email
            }

            const response = await fetch('http://localhost:3001/favList', {
                method: 'POST',    
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json()
            setUserFavs(responseData)
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

            <h1 className='favHeader'>My Favorites</h1>
            {!isAuthenticated && <p>Catching your favorite fish...</p>}
            {isAuthenticated && userFavs && userFavs.map((userData, index) => (
                <FavCard userData={userData} deleteFish={deleteFish} key={index}/>
            ))}
            <Footer />
        </div>
    )
}
export default withAuthenticationRequired(FavList, {
    onRedirecting: () => <Loading />,
  });