import {useEffect,useState} from "react";
import {MENU_API} from "../utils/constants";



const useRestaurantMenu = (resId) => {
    const[resInfo , setResInfo] = useState(null);

    useEffect(() => {
        fetchData();
    }, [resId]);

    const fetchData = async () => {
        try {
            // Use local proxy for menu API
            const url = `/api/menu?resId=${resId}`;
            const response = await fetch(url);
            const json = await response.json();
            setResInfo(json.data);
            console.log('Menu API response:', json);
        } catch (error) {
            console.error('Error fetching menu data:', error);
        }
    };

    return resInfo;
};

export default useRestaurantMenu;