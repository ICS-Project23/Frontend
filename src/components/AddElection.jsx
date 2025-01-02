import React, { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import axios from "../api/axios";
import socket from "../config/Socket";

const AddElection = () => {
    const [election, setElection] = useState({
        name: "",
        start_date: "",
        end_date: "",
        positions: [],
    });

    const [electionId, setElectionId] = useState(null);

    const onChange = (e) => {
        const { name, value } = e.target;
        setElection((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(election);
    };

    const onAddPositionChange = (e, index, field) => {
        const updatedPositions = [...election.positions];
        updatedPositions[index][field] = e.target.value;
        setElection((prev) => ({
            ...prev,
            positions: updatedPositions,
        }));
        console.log(election.positions);
    };

    const addPosition = (e) => {
        e.preventDefault();
        setElection((prev) => ({
            ...prev,
            positions: [...prev.positions, { name: "", description: "" }],
        }));
        console.log(election.positions);
    };

    const removePosition = (index) => (e) => {
        e.preventDefault();
        setElection((prev) => ({
            ...prev,
            positions: prev.positions.filter((_, i) => i !== index),
        }));
        console.log(election.positions);
    };

    const createElection = () => {
        return axios
            .post("/election/", {
                name: election.name,
                start: election.start_date,
                end: election.end_date,
            })
            .then((result) => {
                console.log("Election created successfully");
                window.flash("Election created successfully", "success");
                console.log(result);
            })
            .catch((error) => {
                console.log("Error creating election");
                window.flash(error.response.data.error, "error");
                console.log(error);
            });
    };

    const getElection = () => {
        return axios
            .get("/election/")
            .then((results) => {
                console.log("Results from server");
                let results_array = results.data;
                console.log(results_array);
                // setElectionId(results_array[results_array.length - 1].id);
                return results_array[results_array.length - 1].id;
            })
            .catch((error) => {
                console.log("Error from server");
                console.log(error);
            });
    };

    const createPositions = async (election_id) => {
        const positionPromise = election.positions.map(async (position) => {
            axios.post("/election/position/", {
                election_id: election_id,
                name: position.name,
                description: position.description,
            });
        });
        try {
            const results = await Promise.all(positionPromise);
            results.forEach((result) => {
                console.log("Position created successfully");
                window.flash("Position created successfully", 'success');
                console.log(result);
            });
        } catch (error) {
            console.error("Error creating position");
            console.error(error);
            // window.flash(error.response.data.error, "error");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Election Data:", election);
        // createPositions();
        createElection()
        socket.on("Election Created Event", () => {
            console.log("Event received");
            getElection()
                .then((id) => {
                    createPositions(id);
                })
        })
        setElection({
            name: "",
            start_date: "",
            end_date: "",
            positions: [],
        })
    };

    useEffect(() => {
        console.log("Election ID");
        console.log(electionId);
    }, [electionId]);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <form
                onSubmit={handleSubmit}
                className="p-10 w-[90%] flex flex-col items-center rounded-lg"
            >
                <div className="flex flex-row items-center justify-evenly w-full">
                    {/* Election Details */}
                    <div className="shadow-2xl rounded-lg p-5 flex flex-col items-center justify-evenly">
                        <h2>Election Details</h2>
                        <br />
                        <InputComponent
                            name="name"
                            input_type="text"
                            label="Election Title"
                            onChange={onChange}
                        />
                        <InputComponent
                            name="start_date"
                            input_type="date"
                            label="Start Date"
                            onChange={onChange}
                        />
                        <InputComponent
                            name="end_date"
                            input_type="date"
                            label="End Date"
                            onChange={onChange}
                        />
                    </div>

                    {/* Positions */}
                    <div className="shadow-2xl rounded-lg p-5 flex flex-col items-center justify-evenly">
                        <h2>Positions</h2>
                        <div id="positions">
                            {election.positions.map((position, index) => (
                                <div key={index} className="mb-4">
                                    <p>Position {index + 1}</p>
                                    <div className="flex flex-row items-center justify-between">
                                        <div>
                                            <InputComponent
                                                name={`position_${index}_name`}
                                                input_type="text"
                                                label="Position Name"
                                                onChange={(e) =>
                                                    onAddPositionChange(
                                                        e,
                                                        index,
                                                        "name"
                                                    )
                                                }
                                                value={position.name}
                                            />
                                            <textarea
                                                className="textarea textarea-bordered"
                                                name={`position_${index}_description`}
                                                cols={40}
                                                rows={2}
                                                value={position.description}
                                                onChange={(e) =>
                                                    onAddPositionChange(
                                                        e,
                                                        index,
                                                        "description"
                                                    )
                                                }
                                                placeholder="Position Description"
                                            ></textarea>
                                        </div>
                                        <button
                                            onClick={removePosition(index)}
                                            className="btn btn-ghost ml-3"
                                        >
                                            x
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                className="btn btn-outline"
                                onClick={addPosition}
                            >
                                Add Position
                            </button>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary mt-5 w-1/4" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddElection;
