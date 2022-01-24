import DeleteFavorite from '../Button/DeleteFavButton'
import './FavCard.css'

export const FavCard = ({ userData, deleteFish }) => {

    return (
        <div className='favCard'>
            <img className='favPic' src={userData.pic} alt={userData.fishName}/>
            <div className='nameContainer'>
                <h2 className='favName'>{userData.fishName}</h2>
            </div>
            <DeleteFavorite className='favDel' userData={userData} deleteFish={deleteFish}/>
        </div>
    )
}