import React, { useEffect, useState } from "react";
import VoterDashboardSideBar from "../../components/VoterDashboardSideBar";
import CastVote from "../../components/CastVote";
import axios from "../../api/axios";
import { redirect, useNavigate, useNavigation } from "react-router-dom";
import logo from "../../assets/votex-high-resolution-logo-transparent.png";
import { BrowserProvider } from "ethers";
import ButtonComponent from "../../components/ButtonComponent";
import { ethers } from "ethers";
import PositionComponent from "../../components/PositionComponent";
import TopNavBar from "../../components/TopNavBar";
import LiveClockUpdate from "../../components/LiveClockUpdate";

let WALLET_CONNECTED = "";
const VoterDashboard = () => {
    const saveData = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };
    const [electionObject, setElectionObject] = useState({
        name: "",
        start: "",
        end: "",
    });
    const [elections, setElections] = useState([]);
    const [positions, setPositions] = useState([]);
    const [isElectionStarted, setIsElectionStarted] = useState(false);
    const [isElectionEnded, setIsElectionEnded] = useState(false);
    const [isElectionSelect, setIsElectionSelect] = useState(false);
    const [election_id, setElectionId] = useState(null)

    const navigate = useNavigate();
    
    const getElections = () => {
        axios
            .get("/election/")
            .then((result) => {
                console.log("getElections(). Results: ");
                console.log(result);
                saveData("elections_list", result.data);
                setElections(result.data);
                const now = new Date();
                const end = new Date(electionObject.end);
                if (now < end) {
                    setIsElectionStarted(true);
                } else if (now > end) {
                    setIsElectionEnded(true);
                } else {
                    setIsElectionStarted(false);
                }
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
                console.log("getPositions(). Results: ");
                console.log(res);
                setPositions(res.data);
                setIsElectionSelect(false);
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
        const electionId = e.target.value;
        setIsElectionSelect(true);
        console.log("Election ID");
        console.log(electionId);
        const election = elections.find(
            (election) => election.id == electionId
        );
        console.log("Election: ", election);
        console.log("Storing state electiion id: ", election.id);
        setElectionObject({
            name: election.name,
            start: election.start,
            end: election.end,
        })
        setElectionId(election.id);
        console.log("Getting positions for election id: ", election.id);
        getPositions(election.id);
    };

    useEffect(() => {
        authenticate().then(() => {
            getElections()
        });
        // getPositions();
    }, [navigate]);

    useEffect(() => {
        console.log("Selected Election id: ", election_id)
    }, [election_id])

    return (
        <>
            <TopNavBar name={"Voter Dashboard"} />
            <div
                className={`w-full h-screen flex flex-col items-center ${
                    positions.length == 0 ? "justif-center" : ""
                } p-10`}
            >
                <div className="flex flex-col items-center justify-center">
                    <img src={logo} alt="Logo" className="w-96" />
                </div>
                <form className=" w-full flex flex-col items-center p-10">
                    <h3 className="mb-3">Select Elections</h3>
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
                {positions.length == 0 && isElectionSelect ? (
                    <p>
                        <span className="loading loading-infinity loading-lg"></span>
                    </p>
                ) : (
                    <>
                        <div className="my-10 flex flex-col items-center">
                            <p className="font-serif font-bold text-4xl tracking-wide text-my_white text-center">
                                {electionObject.name}
                            </p>
                            <div className="mt-10 flex flex-col items-center">
                                {isElectionStarted ? (
                                    <p className="font-extralight">
                                        Time remaining to cast vote
                                    </p>
                                ) : (
                                    <p className="font-extralight">
                                        { isElectionEnded
                                            ? "Election has ended"
                                            : "Time remaining before election starts"}
                                    </p>
                                )}
                                <LiveClockUpdate
                                    startDate={electionObject.start}
                                    endDate={electionObject.end}
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
                                            state: { position, election_id },
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
