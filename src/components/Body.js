import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {

    // state variable to hold the list of recipes use Hooks -> useState()
    const [listOfRestaurants, setListOfRestaurants] = useState([]);

    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    const [searchInput, setSearchInput] = useState("");

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
            <div className="filter">
                <div className="search">
                    <input type="text"
                        value={searchInput}
                        onChange={(event) => {
                            setSearchInput(event.target.value);
                        }} />
                    <button className="search-btn"
                        onClick={() => {
                            // Filter receipes based on search input

                            console.log("Search input: ", searchInput);
                            const filteredRestaurants = listOfRestaurants.filter((res) =>
                                res.info.name.toLowerCase().includes(searchInput.toLowerCase())
                            );
                            setFilteredRestaurants(filteredRestaurants);
                        }}
                    >Search</button>
                </div>
                <button className="filter-btn" onClick={() => {
                    const filteredList = listOfRestaurants.filter(
                        (res) => res.info.avgRating > 4.5
                    );
                    setFilteredRestaurants(filteredList);
                }}
                >
                    Top Restaurants</button>
            </div>
            <div className="restaurant-container">
                {
                    filteredRestaurants.map((res) => (

                        <Link key={res.info.id} to={"/restaurants/" + res.info.id}><RecipeCard key={res.info.id} resData={res?.info} /></Link>
                    ))
                }
            </div>
        </div>
    )
}


export default Body;