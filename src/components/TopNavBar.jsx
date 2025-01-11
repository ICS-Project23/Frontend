import React, { useEffect } from "react";
import axios from "../api/axios";

const TopNavBar = ({ name }) => {
    const [user, setUser] = React.useState();
    const handleLogout = () => {
        axios
            .post("/auth/logout")
            .then((res) => {
                console.log(res.data);
                window.location.href = "/";
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const getUser = () => {
        axios
            .get("/auth/user")
            .then((res) => {
                console.log(res.data);
                setUser(res.data.user);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        console.log("Fetching user information");
        getUser();
    }, []);
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">{name}</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 mr-10">
                    <li>
                        <details>
                            <summary>Account</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li className="border-b-2 p-2">
                                    {user
                                        ? user.role == "admin"
                                            ? user.user_name
                                            : user.first_name +
                                              " " +
                                              user.surname
                                        : "Loading..."}
                                </li>
                                <li>
                                    <button className="btn btn-ghost" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TopNavBar;
