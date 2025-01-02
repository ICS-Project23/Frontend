import React from "react";
import logo from "../../assets/votex-high-resolution-logo-transparent.png";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import axios from "../../api/axios";
import {
    UNSAFE_createClientRoutesWithHMRRevalidationOptOut,
    useNavigate,
} from "react-router-dom";
// import axios from 'axios'

const LoginView = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = React.useState({
        national_identification_number: "",
        password: "",
    });
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    const handleSubmit = (e) => {
        console.log("Form submitted ...");
        e.preventDefault();
        console.log(loginData);
        axios
            .post("/auth/login", loginData)
            .then((response) => {
                console.log("Response from express server");
                console.log(response);
                const wallet_address = getCookie("wallet_address");
                console.log("Wallet address: ", wallet_address);
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error("Error from express server");
                console.error(error);
            });
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <img src={logo} alt="Logo" className="w-96" />
            </div>
            <div className="h-2/3 w-1/4 mt-20 flex flex-col items-center justify-center rounded-2xl shadow-2xl">
                <div className="flex flex-col items-center justify-center mb-3">
                    <p className="text-[40px] text-gray-600 tracking-wider">
                        Welcome back!
                    </p>
                    <p className="text-gray-500">
                        Please Login to your account
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <InputComponent
                        label={"National ID/Passport Number"}
                        input_name={"national_identification_number"}
                        input_type={"number"}
                        onChange={(e) => {
                            setLoginData({
                                ...loginData,
                                national_identification_number: e.target.value,
                            });
                            console.log(loginData);
                        }}
                    />
                    <br />

                    <InputComponent
                        label={"Password"}
                        input_name={"Password"}
                        input_type={"password"}
                        onChange={(e) => {
                            setLoginData({
                                ...loginData,
                                password: e.target.value,
                            });
                            console.log(loginData);
                        }}
                    />
                    <br />
                    <div className="flex flex-row items-center justify-center border-red-900 border-3">
                        <ButtonComponent label={"LogIn"} type={"submit"} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginView;
