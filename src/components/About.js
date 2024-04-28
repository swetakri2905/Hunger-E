import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
    constructor(props){
        super(props);

        //console.log("Parent Constructor");
    }

    componentDidMount() {
        //console.log("Parent Component Did Mount");
    }

    render(){

        //console.log("Parent Render"); 
        return(
            <div>
                <h1>About class component</h1>
                <h2>This is namaste react web series</h2>
                <UserClass name = {"First"} location={"Dehradun class"} />
 
            </div>
        );
    }
}



export default About;