import React, { useEffect, useRef, useState } from "react";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import axios from "../../api/axios";
import TopNavBar from "../../components/TopNavBar";
import AdminSideBar from "../../components/AdminSideBar";
import { redirect, useNavigate, useNavigation } from "react-router-dom";

const AdminRegistrationView = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: "",
        password: "",
        password_confirmation: "",
    });
    const authenticate = () => {
            return axios
                .get("/auth/verify")
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    navigate("/");
                });
        };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log("Name: ", name);
        console.log("Value: ", value);
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleRegistrationForm = async (e) => {
        e.preventDefault();
        console.log("Submitting data for registration");
        try {
            await axios
                .post("auth/register/admin", formData)
                .then((response) => {
                    console.log("Response from express server");
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Error from express server");
                    console.error(error);
                });
        } catch (error) {
            console.error("Error submitting registration form: ", error);
        }
    };

    useEffect(() => {
        authenticate();
    }, [navigate])

    return (
        <>
            <TopNavBar name="Admin Dashboard" />
            <div className="w-full h-screen flex flex-row">
                <AdminSideBar />
                <main className="w-3/4">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <h2>Add Administrator</h2>
                        <form
                            method="POST"
                            action=""
                            onSubmit={handleRegistrationForm}
                            className="h-4/5 px-3 flex flex-col items-center justify-evenly "
                        >
                            <InputComponent
                                label="user name"
                                name="user_name"
                                input_type="text"
                                //    value={formData.surname}
                                onChange={handleInputChange}
                            />
                            <InputComponent
                                label={"Password"}
                                name="password"
                                input_type={"password"}
                                onChange={handleInputChange}
                            />
                            <InputComponent
                                label={"Confirm Password"}
                                name="password_confirmation"
                                input_type={"password"}
                                onChange={handleInputChange}
                            />
                            <ButtonComponent label="Register" type={"submit"} />
                        </form>
                    </div>
                </main>
            </div>
        </>
        // <div className="h-screen flex justify-center items-center">
        //     <div className="w-1/4 md:w-1/2 border-2 shadow-xl rounded-xl">

        //     </div>
        // </div>
    );
};

export default AdminRegistrationView;
