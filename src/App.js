import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Cart from "./components/Cart";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

// import Grocery from "./components/Grocery";


// Chunking 
// Code splitting
// Dynamic Bundling
// lazy loading
// on demand loading
// dynamic import

const Grocery = lazy(() => import("./components/Grocery"));
// const About = lazy(() => import("./components/About"))

const AppLayout = () => {
    const [userName, setUserName] = useState("");

    // authentication
    useEffect(() => {
        // Make and API call  and send username
        const data = {
            name: "Ravi Dubey"
        };
        setUserName(data.name);
    }, [])

    return (
        <Provider store={appStore} >
            <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
                <div className="app">
                    <Header />
                    <Outlet />
                </div>
            </UserContext.Provider>
        </Provider>
    )
}



const appRouter = createBrowserRouter([

    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading... </h1>}><Grocery /></Suspense>
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />
            }
        ],
        errorElement: <Error />,
    },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(jsxHeading);
root.render(<RouterProvider router={appRouter} />);