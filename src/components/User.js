import {useEffect, useState} from "react";

const User = ({name}) => {
    const [count] = useState(0);
      
    useEffect(()=>{
        //API Call
    });

    return (
        <div className="user-card m-4 p-4 bg-gray-50 rounded-lg">
            <h1>Count = {count}</h1>
             
            <h2>{name}</h2>
            <h3>Location:Dhanbad</h3>
            <h4>Contact:@sweta2905</h4>
        </div>
    );
};

export default User; 

