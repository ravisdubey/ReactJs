import { useState } from "react";

const User = (props) => {

    const [ count, setCount ]  = useState(0);

    return (
        <div className="user-card">
            <h4>Count: {count}</h4>
            <button onClick={() => setCount(count + 1)}>Increase Count</button>
            <h2>Name: {props.name}</h2>
            <h3>Location: Mumbai</h3>
            <h4>Contact: 1234567890</h4>
        </div>
    )
}

export default User;