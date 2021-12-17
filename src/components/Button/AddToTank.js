import React from "react";

const AddToTank = ({ fishData }) => {

    const { user } = useAuth0()

    const data = {
        user: user.email,
        pic: fishData.pic1,
        name: fishData.name
    }

    const sendRequest = () => {

        fetch('http://localhost:3001/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }

    return <button>➕</button>
}

export default AddToTank;