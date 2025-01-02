// src/components/LiveResults.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const LiveResults = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        socket.on("vote", (data) => {
            setResults((prevResults) => {
                const updatedResults = [...prevResults];
                const candidateIndex = updatedResults.findIndex(
                    (c) => c.id === data.candidateId
                );
                if (candidateIndex !== -1) {
                    updatedResults[candidateIndex].voteCount++;
                }
                return updatedResults;
            });
        });

        return () => {
            socket.off("vote");
        };
    }, []);

    return (
        <div>
            <h1>Live Voting Results</h1>
            <ul>
                {results.map((candidate) => (
                    <li key={candidate.id}>
                        {candidate.name}: {candidate.voteCount} votes
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LiveResults;
