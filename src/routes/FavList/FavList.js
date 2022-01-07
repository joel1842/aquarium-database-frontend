import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FavCard } from "../../components/Cards/FishCard/FavCard";
import { StandardNavBar } from '../../components/Bars/StandardNavBar';
import { withAuthenticationRequired } from "@auth0/auth0-react";
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

    const callFavs = async () => {
        try {

            const token = await getAccessTokenSilently();
            const data = {
                user: user.email
            }

            const response = await fetch('http://localhost:3001/favlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
                }).then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(jsonResponse => {
                    setUserFavs(jsonResponse)
                })  

                setDeleted(false)

        } catch {
            console.error()
        }
    }

    useEffect(() => {

        if (isAuthenticated) {
            callFavs()
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