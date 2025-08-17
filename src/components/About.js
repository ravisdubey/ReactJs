import User from "./User";
import UserClass from "./UserClass";
import React, { Component }from "react";
import UserContext from "../utils/UserContext";

class About extends Component {

    constructor(props) {
        super(props);

        // console.log("Parent component constructor called");

    }

    render() {
        // console.log("Parent component render called");

        return (
            <div>
                <h1>About Class Component</h1>
                <div>
                    <UserContext.Consumer>
                        {({ loggedInUser }) => <h1 className="font-bold">{ loggedInUser }</h1>
                        }
                    </UserContext.Consumer>
                </div>
                <UserClass name={"Ravi coming from class"} location={"Mumbai from class"} />
            </div>
        )
    }
}

export default About;