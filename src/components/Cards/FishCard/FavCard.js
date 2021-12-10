import DeleteFavorite from '../../Button/DeleteFavButton'
import './FavCard.css'

export const FavCard = ({ userData }) => {

    return (
        <div className='favCard'>
            <img className='favPic' src={userData.pic}/>
            <h2 className='favName'>{userData.fishName}</h2>
            <DeleteFavorite userData={userData}/>
        </div>
    )
}