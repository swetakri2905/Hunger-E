import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./Restaurantcategory";
import { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    totalRatingsString,
    cloudinaryImageId,
    sla,
    locality,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Restaurant Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Restaurant Image */}
          <img
            src={
              cloudinaryImageId
                ? `https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`
                : "https://via.placeholder.com/300"
            }
            alt={name}
            className="w-40 h-40 object-cover rounded-lg"
          />

          {/* Restaurant Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-500">{cuisines?.join(", ")}</p>
            <p className="text-gray-500">{locality}</p>

            <div className="mt-3 flex flex-col md:flex-row md:items-center gap-3">
              {/* Rating */}
              <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-md text-sm font-semibold w-fit mx-auto md:mx-0">
                <Star size={14} /> {avgRating} ({totalRatingsString})
              </div>
              {/* Delivery Time & Cost */}
              <div className="text-sm text-gray-600">
                {sla?.slaString} • {costForTwoMessage}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Accordion */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        {categories.map((category, index) => {
          const isOpen = index === showIndex;
          return (
            <div
              key={category?.card?.card.title}
              className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                onClick={() => setShowIndex(isOpen ? null : index)}
                className="w-full flex justify-between items-center px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 transition"
              >
                {category?.card?.card.title}
                {isOpen ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  <RestaurantCategory
                    data={category?.card?.card}
                    showItems={true}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
