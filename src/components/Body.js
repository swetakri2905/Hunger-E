import RestaurantCard , { withPromotedLabel } from "./RestaurantCard";
import {useState , useEffect} from "react";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom"; 
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () =>{

  //Local state variable - Super powerful variable
  const [listofRestaurants,setListOfRestaurant ] = useState([]);

  const [filteredRestaurant , setFilteredRestaurant] = useState([]);

  const [searchText,setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
 


 useEffect(() => {
  fetchData();
 },[]);

 const fetchData = async () =>{
   const data = await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.71578267921963&lng=86.95010891508213&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
   );

  const json = await data.json();

  console.log(json);
  //Optional chaining
  setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
 };

   

  const onlineStatus = useOnlineStatus();

    if(onlineStatus === false)
      return(
        <h1>
          Looks like you are offline!!Please check your internet connections;
        </h1>  
      );

    if( listofRestaurants.length === 0 ){
      return(
        <Shimmer />
      )
    }

   return(
      <div className="body">
        <div className="filter flex"> 
          <div className="search p-4 m-4">
            <input type="text" className="border border-solid border-black" value={searchText} 
              onChange = {(e) => {
                setSearchText(e.target.value);
              }}
            /> 
            <button  className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              // console.log(searchText);

              const filteredRestaurant = listofRestaurants.filter((res)=>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
              ); 
              
              setFilteredRestaurant(filteredRestaurant);

            }}
            >Search</button>
          </div> 
          <div className="search p-4 m-4 flex items-center" >
            <button 
              className="px-4 py-2 bg-gray-100 rounded-lg"
              onClick={() => {
                const filteredList = listofRestaurants.filter(
                  (res) => res.info.avgRating > 4 
                ); 
                setListOfRestaurant(filteredList);
              }}
            >Top rated Restaurants
            </button>
            </div> 
        </div>
         
        <div className="flex flex-wrap">
          {filteredRestaurant.map((restaurant)=>(

              <Link key={restaurant.info.id} to={"/restaurants/"+restaurant.info.id}> 
              {restaurant.info.isOpen ? (
                <RestaurantCardPromoted resData={restaurant}/>
              ):(
                <RestaurantCard  resData={restaurant} />
              )}
             </Link>
            ))}

         </div>  
      </div>
    );
  };

 export default Body; 