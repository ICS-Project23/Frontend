import React, { useEffect, useState } from "react";
import VoterDashboardSideBar from "../../components/VoterDashboardSideBar";
import CastVote from "../../components/CastVote";
import axios from "../../api/axios";
import { redirect, useNavigate, useNavigation } from "react-router-dom";
import { BrowserProvider } from "ethers";
import ButtonComponent from "../../components/ButtonComponent";
import { ethers } from "ethers";
import PositionComponent from "../../components/PositionComponent";
import TopNavBar from "../../components/TopNavBar";
import LiveClockUpdate from "../../components/LiveClockUpdate";
import socket from "../../config/Socket";

let WALLET_CONNECTED = "";
const VoterDashboard = () => {
    const saveData = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };
    const getData = (key) => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    };
    const [elections, setElections] = useState([]);
    const [electionName, setElectionName] = useState(
        getData("selected_election_name")
    );
    const [startDate, setStartDate] = useState(
        getData("selected_election_startDate")
    );
    const [endDate, setEndDate] = useState(
        getData("selected_election_endDate")
    );
    const [positions, setPositions] = useState([]);
    const [isElectionSelect, setIsElectionSelect] = useState(false);

    const [isElectionStarted, setIsElectionStarted] = useState(false);

    const navigate = useNavigate();
    socket.on("Election List cache expired", () => {
        localStorage.removeItem("selected_election_id");
        localStorage.removeItem("selected_election_name");
        localStorage.removeItem("selected_election_startDate");
        localStorage.removeItem("selected_election_endDate");
    })
    
    const getElections = () => {
        // let elections = getData("elections_list");
        // if (elections.length > 0) {
        //     setElections(elections);
        //     return;
        // }
        axios
            .get("/election/")
            .then((result) => {
                console.log("Results from server");
                console.log(result);
                saveData("elections_list", result.data);
                setElections(result.data);
                
            })
            .catch((error) => {
                console.log("Error from server");
                console.log(error);
            });
    };
    const getPositions = (election_id) => {
        axios
            .get(`/election/${election_id}/positions/`)
            .then((res) => {
                console.log(res);
                setPositions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
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

    const handleElectionChange = (e) => {
        setIsElectionSelect(true);
        const electionId = e.target.value;
        console.log("Election ID");
        console.log(electionId);
        const election = elections.find(
            (election) => election.id == electionId
        );
        console.log("Election: ", election);
        saveData("selected_election_name", election.name);
        saveData("selected_election_startDate", election.start);
        saveData("selected_election_endDate", election.end);
        saveData("selected_election_id", electionId);
        getPositions(getData("selected_election_id"));
    };

    useEffect(() => {
        authenticate().then(() => {
            getElections();
        });
        // getPositions();
    }, [navigate]);

    useEffect(() => {
        const now = new Date();
        const end = new Date(endDate);
        if (now < end) {
            setIsElectionStarted(true);
        } else {
            setIsElectionStarted(false);
        }
    })

    return (
        <>
            <TopNavBar />
            <div
                className={`w-full h-screen border flex flex-col items-center ${
                    positions.length == 0 ? "justif-center" : ""
                } p-10`}
            >
                {!isElectionSelect ? (
                    <form className="border w-full">
                        <h3>Select Elections</h3>
                        <select
                            className="select select-bordered w-1/2"
                            name="elections"
                            onChange={handleElectionChange}
                        >
                            <option disabled selected>
                                Choose Election
                            </option>
                            {elections.map((election, index) => (
                                <option key={index} value={election.id}>
                                    {election.name}
                                </option>
                            ))}
                        </select>
                    </form>
                ) : positions.length == 0 ? (
                    <p>
                        <span className="loading loading-infinity loading-lg"></span>
                    </p>
                ) : (
                    <>
                        <div className="my-10 flex flex-col items-center">
                            <p className="font-serif font-bold text-4xl tracking-wide text-my_white text-center">
                                {electionName}
                            </p>
                            <div className="mt-10 flex flex-col items-center">
                                {isElectionStarted ? (
                                    <p className="font-extralight">
                                        Time remaining to cast vote
                                    </p>
                                ) : (
                                    <p className="font-extralight">
                                        Time remaining before election starts
                                    </p>
                                )}
                                <LiveClockUpdate
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row justify-evenly flex-wrap">
                            {positions.map((position) => (
                                <PositionComponent
                                    key={position.id}
                                    position={position}
                                    onClickEvent={() => {
                                        navigate("positions/" + position.id, {
                                            state: { position },
                                        });
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default VoterDashboard;
