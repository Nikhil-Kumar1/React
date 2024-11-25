import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestro, setlistOfRes] = useState([]);
  const [filteredlistOfRestro, setfilteredlistOfRestro] = useState([]);
  const [searchText, setsearchText] = useState("");

  console.log(listOfRestro);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9937651&lng=77.72160079999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(
      // optional chaining
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    setlistOfRes(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
    setfilteredlistOfRestro(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return <h1>Looks like you are offline please check your Connection</h1>;

  // conditional rendering
  // if (listOfRestro.length === 0) {
  //   return <Shimmer />;
  // }

  return listOfRestro.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="search-box bg-slate-400 border-solid border-blue-950"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="px-3 py-1 bg-slate-600 m-2"
            onClick={() => {
              const filteredRestro = listOfRestro.filter((res) =>
                res.info.name
                  .toLowerCase()
                  .includes(searchText.toLocaleLowerCase())
              );
              setfilteredlistOfRestro(filteredRestro);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <button
            className="bg-zinc-400 px-3 py-2 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestro.filter(
                (res) => res.info.avgRating > 4
              );
              setlistOfRes(filteredList);
            }}
          >
            Top Rated restaurant
          </button>
        </div>
      </div>

      <div className="res-container flex flex-wrap">
        {filteredlistOfRestro.map((restaurant) => {
          return (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
