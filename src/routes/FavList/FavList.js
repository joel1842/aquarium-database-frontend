import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FavCard } from "../../components/Cards/FishCard/FavCard";
import { StandardNavBar } from '../../components/Bars/StandardNavBar';
import './FavList.css';

const FavList = ({ getSearchTerm }) => {
    const { user, isAuthenticated } = useAuth0()
    const [userFavs, setUserFavs] = useState()
    const [deleted, setDeleted] = useState(false)

    const deleteFish = () => {
        setDeleted(true);
    }

    useEffect(() => {

        if (isAuthenticated) {
            const data = {
                user: user.email
            }

            console.log(data)

            fetch('http://localhost:3001/favlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
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
        </div>
    )
}

export default FavList;