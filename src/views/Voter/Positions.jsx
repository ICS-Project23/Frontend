import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavBar from "../../components/TopNavBar";
import CandidateCard from "../../components/CandidateCard";
import CandidateModal from "../../components/CandidateModal";
import LiveClockUpdate from "../../components/LiveClockUpdate";
import InputComponent from "../../components/InputComponent";

const Positions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { position } = location.state;
    const [startDate, setStartDate] = useState("1 January, 2025");
    const [endDate, setEndDate] = useState("2 January, 2025");
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [electionStatus, setelectionStatus] = useState(null);

    const getCandidatesForPosition = () => {
        axios
            .get("/candidate/position/" + position.id)
            .then((result) => {
                console.log("Candidates for position");
                setCandidates(result.data);
            })
            .catch((error) => {
                console.log("Error getting candidates for position");
                console.log(error);
            });
    };

    const getElectionStatus = () => {
        axios
            .get("/election/status")
            .then((result) => {
                console.log("Election status UI");
                console.log(result.data);
                setelectionStatus(result.data);
            })
            .catch((error) => {
                console.log("Error getting election status");
                console.log(error);
            });
    };

    const handleCastVote = () => {
        console.log("Voting for ", selectedCandidate);
        document.getElementById("my_modal_1").close();
        if (!electionStatus) {
            window.flash("Election has not started yet", "error");
        } else {
            axios
                .post("/vote", {
                    candidateId: selectedCandidate,
                    positionId: position.id,
                })
                .then((result) => {
                    console.log("Vote cast successfully");
                    window.flash("Successfully cast vote", "success");
                })
                .catch((error) => {
                    console.log("Error casting vote");
                    console.log(error.response.data);
                    window.flash(`An error occurred when trying to vote: ${error.response.data}`, 'error');
                });
        }
    };

    useEffect(() => {
        getCandidatesForPosition();
        getElectionStatus();
    }, [navigate]);
    return (
        <div className="w-full h-[100vh] flex flex-col items-center p-10">
            <TopNavBar />
            <div className="w-full h-full flex flex-row justify-around">
                <div className="w-3/4 h-full mr-2">
                    <div>
                        <p className="font-serif font-bold text-4xl tracking-wide text-my_white text-center">
                            {position.name}
                        </p>
                        <p className="text-center font-light mt-3">
                            {position.description}
                        </p>
                    </div>
                    <br />
                    <br />
                    <p>Candidates</p>
                    <br />
                    <br />
                    <div className="w-full carousel carousel-center shadow-xl rounded-box">
                        {candidates.map((candidate) => (
                            <CandidateCard
                                key={candidate.id}
                                candidate={candidate}
                            />
                        ))}
                    </div>
                </div>
                <div className="border-l p-10 w-1/4 h-full">
                    <div className="flex flex-row items-center justify-between">
                        <p>Cast Vote</p>
                        <span className="flex flex-col justify-center items-center">
                            <span>Time remaining:</span>
                            <LiveClockUpdate
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </span>
                    </div>
                    <br />
                    <br />
                    <form action="" className="flex flex-col items-center">
                        <select
                            className="select w-full max-w-xs mb-10"
                            onChange={(e) =>
                            {
                                console.log(e.target.value);
                                setSelectedCandidate(e.target.value)
                            }
                            }
                        >
                            <option disabled selected>
                                Pick Candidate To Vote For
                            </option>
                            {candidates.map((candidate) => (
                                <option key={candidate.id} value={candidate.id}>
                                    {candidate.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={(e) => {
                                e.preventDefault();
                                document
                                    .getElementById("my_modal_1")
                                    .showModal();
                            }}
                        >
                            Cast Vote
                        </button>
                    </form>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Confirmation</h3>
                            <p className="py-4">
                                Are you sure you want to cast your vote for{" "}
                                {selectedCandidate}?
                            </p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button
                                        className="btn"
                                        onClick={handleCastVote}
                                    >
                                        Confirm
                                    </button>
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default Positions;
