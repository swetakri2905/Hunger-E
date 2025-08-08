import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch("/api/restaurants");
      const json = await data.json();
      const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setListOfRestaurant(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700 text-lg">
        <img
          src="https://media.tenor.com/qJ5evVs-_uUAAAAC/no-internet.gif"
          alt="Offline"
          className="w-48 mb-4"
        />
        <h1>Looks like you are offline! Please check your internet connection.</h1>
      </div>
    );
  }

  if (listOfRestaurants.length === 0) return <Shimmer />;

  return (
    <div className="bg-white min-h-screen">
      {/* Filter Row */}
      <div className="px-4 md:px-8 py-4 flex flex-wrap gap-3 border-b border-gray-200 text-sm font-medium">
        <button className="px-4 py-2 rounded-full border border-gray-300 hover:border-black">Filter</button>
        <button className="px-4 py-2 rounded-full border border-gray-300 hover:border-black">Sort By</button>
        <button className="px-4 py-2 rounded-full border border-gray-300 hover:border-black">Fast Delivery</button>
        <button className="px-4 py-2 rounded-full border border-gray-300 hover:border-black">Ratings 4.0+</button>
        <button className="px-4 py-2 rounded-full border border-gray-300 hover:border-black">Pure Veg</button>
        <button className="px-4 py-2 rounded-full border border-gray-300 hover:border-black">₹300-₹600</button>
        <button className="px-4 py-2 rounded-full border border-gray-300 hover:border-black">Less than ₹300</button>
      </div>

      {/* Restaurant Grid */}
      <div className="px-4 md:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
              {/* Image Section */}
              <div className="relative">
                <img
                  src={restaurant.info.cloudinaryImageId
                    ? `https://media-assets.swiggy.com/swiggy/image/upload/${restaurant.info.cloudinaryImageId}`
                    : "https://via.placeholder.com/400"}
                  alt={restaurant.info.name}
                  className="w-full h-48 object-cover"
                />
                {restaurant.info.aggregatedDiscountInfoV3?.header && (
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white px-3 py-2 text-xs font-semibold">
                    {restaurant.info.aggregatedDiscountInfoV3.header}{" "}
                    {restaurant.info.aggregatedDiscountInfoV3.subHeader &&
                      " " + restaurant.info.aggregatedDiscountInfoV3.subHeader}
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="p-3">
                <h3 className="font-semibold text-lg truncate">{restaurant.info.name}</h3>
                <div className="flex items-center text-sm text-gray-700 mt-1">
                  <span className="text-green-600 font-bold mr-1">★ {restaurant.info.avgRating}</span>
                  <span>• {restaurant.info.sla?.slaString}</span>
                </div>
                <p className="text-gray-500 text-sm truncate">
                  {restaurant.info.cuisines.join(", ")}
                </p>
                <p className="text-gray-500 text-sm">{restaurant.info.locality}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
