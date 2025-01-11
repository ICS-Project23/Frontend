// src/components/LiveResults.js
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { ws } from "../config/Socket";

const LiveResults = ({position_id, election_id}) => {
    const [electionResults, setElectionResults] = useState([]);
    // const [election_id, setElectionId] = useState(_election_id);
    // const [position_id, setPositionId] = useState(_position_id);

    const getElectionResults = () => {
        console.log("Getting election results ...");
        console.log(`Position ID: ${position_id}`);
        axios
            .get("/vote/results", {
                params: {
                    position_id: position_id,
                    election_id: election_id
                },
            })
            .then((result) => {
                console.log("Election results");
            })
            .catch((error) => {
                console.log("Error getting election results");
                console.log(error);
            });
    };

    const debounce = (func, delay) => {
        let timerId;
        return function (...args) {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const handleVoteEvent = debounce(getElectionResults, 2000);
    ws.onmessage = (message) => {
        let data = JSON.parse(message.data);
        switch (data.event) {
            case "CandidateResultsEvent":
                if(data.data.id != '0'){
                    console.log("RECEIVED RESULTS EVENT DATA");
                    console.log(data.data);
                    setElectionResults((prev) => {
                        const index = prev.findIndex(
                            (result) => result.id == data.data.id
                        );
                        let newResult;
                        if (index != -1) {
                            console.log("adding vote count");
                            newResult = [
                                ...prev.slice(0, index),
                                {
                                    ...prev[index],
                                    voteCount: data.data.voteCount,
                                },
                                ...prev.slice(index + 1),
                            ];
                        } else {
                            newResult = [...prev, data.data];
                        }
                        console.log("new result", newResult);
                        return newResult;
                    });
                }
                break;
            case "Voted":
                console.log("Data from vote event");
                console.log(data.data);
                handleVoteEvent();
                break;
            default:
                break;
        }
    };
    const polling = setInterval(getElectionResults, 600000);
    useEffect(() => {
        console.log("Election results updated!!!");
        console.log(electionResults);
    }, [electionResults]);

    useEffect(() => {
        getElectionResults();
        return () => {
            clearInterval(polling);
        };
    }, [])
    

    return (
        <>
            <div>
                <h2>Live Update</h2>
            </div>
            <div class="relative flex flex-col w-full h-full overflow-scroll text-my_gray shadow-md rounded-xl bg-clip-border">
                <table class="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Candidate Name
                                </p>
                            </th>
                            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Vote Count
                                </p>
                            </th>
                            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {electionResults.length == 0 ? (
                            <span className="loading loading-dots loading-xs"></span>
                        ) : (
                            <>
                                {electionResults.map((result) => {
                                    return (
                                        <tr>
                                            <td class="p-4 border-b border-blue-gray-50">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {result.full_name}
                                                </p>
                                            </td>

                                            <td class="p-4 border-b border-blue-gray-50">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {result.voteCount}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default LiveResults;
