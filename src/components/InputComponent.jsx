import React from "react";  

const InputComponent = ({label, name, input_type, onChange}) => {
    return (
        <>
            <div className="w-72 h-12 border my-5 relative flex rounded-xl">
                <input
                    required=""
                    className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-blue focus:shadow-md text-gray-700"
                    id={name}
                    type={input_type}
                    onChange={onChange}
                    name={name}
                    aria-required="true"
                />
                <label
                    className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                    htmlFor={name}
                >
                    {label}
                </label>
            </div>
        </>
    );
};

export default InputComponent;
