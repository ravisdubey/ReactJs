import { CDN_URL } from "../utils/constants";

const RecipeCard = (props) => {

    const { resData } = props;


    return (
        <div className="restaurant-card" style={{ backgroundColor: "#f0f0f0" }}>
            <img src={CDN_URL + resData.cloudinaryImageId} alt="restaurant" />
            <h3>{resData.name}</h3>
            <h4>Cuisine: {resData.cuisines.join(", ")}</h4>
            <h4>Rating: {resData.avgRating}</h4>
        </div>
    )
}


export default RecipeCard;