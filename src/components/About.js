import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {

    constructor(props) {
        super(props);

        // console.log("Parent component constructor called");

    }

    render() {
        // console.log("Parent component render called");

        return (
            <div className="about">
                <UserClass name={"Ravi coming from class"} location={"Mumbai from class"} />
            </div>
        )
    }
}

export default About;