import DeleteFavorite from '../../Button/DeleteFavButton'
import './FavCard.css'

export const FavCard = ({ userData }) => {

    return (
        <div className='favCard'>
            <img className='favPic' src={userData.pic}/>
            <div className='nameContainer'>
                <h2 className='favName'>{userData.fishName}</h2>
            </div>
            <DeleteFavorite className='favDel' userData={userData}/>
        </div>
    )
}