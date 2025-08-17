import React from 'react';

class UserClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                name: "default name",
                location: "default location",
            }
        }

    }

    async componentDidMount() {
        // console.log("Child component mounted");

        const data = await fetch("https://api.github.com/users/ravi9619");
        const json = await data.json();

        this.setState({
            userInfo: json
        })

        // console.log(json);

    }

    render() {

        const { name, location, avatar_url } = this.state.userInfo;
        return (
            <div className="user-card">
                <img src={avatar_url} alt="User Avatar" />
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: 1234567890</h4>
            </div>
        )
    }
}

export default UserClass;