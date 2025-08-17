import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {

    const { resData } = props;

    const { name, cuisines, avgRating } = resData;


    return (
        <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-50 hover:bg-gray-200">
            <img className="rounded-lg" src={CDN_URL + resData.cloudinaryImageId} alt="restaurant" />
            <h3 className="font-bold py-2 text-lg">{name}</h3>
            <h4>Cuisine: {cuisines.join(", ")}</h4>
            <h4>Rating: {avgRating}</h4>
        </div>
    )
}

export const withDiscountLabel = (RestaurantCard) => {
    return (props) => {
        const { resData } = props;
        const discount = resData.aggregatedDiscountInfoV3.header + " " + resData.aggregatedDiscountInfoV3.subHeader;
        return (
            <div>
                <label className="absolute bg-black text-white text-sm m-2 p-2 rounded-lg">{discount}</label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}


export default RestaurantCard;