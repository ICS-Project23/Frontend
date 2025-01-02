import React, { useEffect, useRef, useState } from "react";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import axios from "../../api/axios";

const RegistrationView = () => {
    const [formData, setFormData] = useState({
        surname: "",
        first_name: "",
        other_names: "",
        dob: "",
        national_identification_number: "",
        password: "",
        password_confirmation: "",
    });
    const isOlderThan18 = (birthdate) => {
        const birthdateObj = new Date(birthdate);
        const currentDate = new Date();
        const ageInMillis = currentDate - birthdateObj;
        const ageInYears = ageInMillis / (1000 * 60 * 60 * 24 * 365);
        return ageInYears >= 18;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "dob" && !isOlderThan18(value)) {
            alert("You must be 18 years or older to register");
            formData.dob = "";
            return;
        }
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
                .post("auth/register", formData)
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

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-1/4 md:w-1/2 border-2 shadow-xl rounded-xl">
                <div className="flex flex-col items-center justify-center my-3">
                    <p className="text-[40px] text-gray-600 tracking-wider">
                        Welcome to Votex
                    </p>
                    <p className="text-gray-500">Please register for voting</p>
                </div>

                <form
                    method="POST"
                    action=""
                    onSubmit={handleRegistrationForm}
                    className="h-4/5 px-3 flex flex-col items-center justify-evenly "
                >
                    <InputComponent
                        label="Surname"
                        name="surname"
                        input_type="text"
                        //    value={formData.surname}
                        onChange={handleInputChange}
                    />
                    <InputComponent
                        label="First Name"
                        name="first_name"
                        input_type="text"
                        // value={formData.first_name}
                        onChange={handleInputChange}
                    />
                    <InputComponent
                        label="Other Names"
                        name="other_names"
                        input_type="text"
                        onChange={handleInputChange}
                    />
                    <InputComponent
                        label={"Date of Birth"}
                        name="dob"
                        input_type="date"
                        onChange={handleInputChange}
                    />
                    <InputComponent
                        label={"Nation ID/Passport Number"}
                        name="national_identification_number"
                        input_type={"number"}
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

                    {/* Capture Images if needed */}
                    {/* <div className="relative flex flex-col rounded-xl border">
                    <video
                        ref={videoRef}
                        className="border-2 border-red-900"
                        autoPlay
                    ></video>
                    <div className="w-full flex flex-row items-center justify-between">
                        <ButtonComponent
                            label={"Start Webcam"}
                            type={"button"}
                            onClickEvent={startWebcam}
                        ></ButtonComponent>
                        <ButtonComponent
                            label={"Capture Photo"}
                            type={"button"}
                            onClickEvent={capturePhoto}
                        ></ButtonComponent>
                    </div>
                    <canvas ref={canvasRef} className="hidden"></canvas>
                    <img ref={photoRef} className="hidden"></img>
                </div> */}
                    <ButtonComponent label="Register" type={"submit"} />
                </form>
            </div>
        </div>
    );
};

export default RegistrationView;
