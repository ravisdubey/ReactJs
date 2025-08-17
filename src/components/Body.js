import RestaurantCard, { withDiscountLabel } from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {

    // state variable to hold the list of recipes use Hooks -> useState()
    const [listOfRestaurants, setListOfRestaurants] = useState([]);

    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    const [searchInput, setSearchInput] = useState("");

    const RestaurantCardWithDiscount = withDiscountLabel(RestaurantCard);

    const { loggedInUser, setUserName } = useContext(UserContext);

    // console.log("Body rendered", listOfRestaurants);


    // useEffect to fetch data from API
    // useEffect is a Hook that allows you to perform side effects in function components   
    // It takes a function as the first argument and an array of dependencies as the second argument
    // The function will be called after the component is mounted and whenever the dependencies change
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {

        const data = await fetch("https://swiggy-api-4c740.web.app/swiggy-api.json");
        const json = await data.json();

        console.log("Data fetched: ", json);

        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false)
        return (
            <h1>Looks like you are offline. Please check your internet connection.

            </h1>
        );


    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text"
                        className="border border-solid border-black"
                        value={searchInput}
                        onChange={(event) => {
                            setSearchInput(event.target.value);
                        }} />
                    <button className="m-4 px-4 py-2 bg-green-100 rounded-lg"
                        onClick={() => {
                            // Filter receipes based on search input

                            console.log("Search input: ", searchInput);
                            const filteredRestaurants = listOfRestaurants.filter((res) =>
                                res.info.name.toLowerCase().includes(searchInput.toLowerCase())
                            );
                            setFilteredRestaurants(filteredRestaurants);
                        }}
                    >Search</button>
                    <label>Username: </label>
                    <input className="m-4 px-4 py-2 border border-solid" value={loggedInUser} onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <button className="px-4 py-2 bg-gray-100 rounded-lg" onClick={() => {
                        const filteredList = listOfRestaurants.filter(
                            (res) => res.info.avgRating > 4.5
                        );
                        setFilteredRestaurants(filteredList);
                    }}
                    >
                        Top Rated Restaurants</button>
                </div>

            </div>
            <div className="flex flex-wrap flex-row justify-center">
                {
                    filteredRestaurants.map((res) => (

                        <Link key={res.info.id} to={"/restaurants/" + res.info.id}>
                            {
                                res.info.aggregatedDiscountInfoV3 ? (
                                    <RestaurantCardWithDiscount className="h-full" resData={res?.info} />
                                ) : (
                                    <RestaurantCard className="h-full" resData={res?.info} />
                                )
                            }
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}


export default Body;