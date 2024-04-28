import React from "react";

class UserClass extends React.Component {

    constructor(props){
        super(props);

         this.state = {
            userInfo:{
                name:"Dummy",
                location:"Default",
            },
         };
         console.log(this.props.name+"child constructor");
    }

    async componentDidMount() {
        //console.log(this.props.name+"child Component Did Mount");
        //API call
        
        const data = await fetch("https://api.github.com/users/akshaymarch7");
        const json = await data.json();

        this.setState({
            userInfo:json,
        });

        console.log(json);
    }

    componentDidUpdate(){
        console.log("Component did update");
    }

    componentWillUnmount(){
        console.log("Component will Unmount");
    }

    render(){
        const {name,location,avatar_url} = this.state.userInfo;
        console.log(this.props.name+"child render");
        
        return (
            <div className="user-card">
                <img src={avatar_url}/>
                <h2>Name:{name}</h2>
                <h3>Location:{location}</h3>
                <h4>Contact:@sweta2905</h4>
                
            </div>
        );
    }
}

export default UserClass;
