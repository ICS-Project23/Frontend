import React from "react";
import ButtonComponent from "./ButtonComponent";

const PositionComponent = ({ position, onClickEvent }) => {
    return (
        <div onClick={onClickEvent} className="card bg-base-100 m-5 flex flex-col items-center w-96 shadow-xl hover:shadow-2xl hover:scale-105 hover:cursor-pointer duration-300">
            <div className="card-body text-center">
                <h2 className="card-title">{position.name}</h2>
                <p>{position.description}</p>
                <div className="card-actions justify-center">
                    <button onClick={onClickEvent} className="btn btn-outline">Details</button>
                </div>
            </div>
        </div>
    );
};

export default PositionComponent;
