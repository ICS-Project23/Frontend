import React, { useEffect } from 'react'
import VoterDashboardSideBar from '../components/VoterDashboardSideBar';
import CastVote from '../components/CastVote';
import axios from '../api/axios';
import { redirect, useNavigate, useNavigation } from 'react-router-dom';
import web3 from 'web3';


const VoterDashboard = () => {
    const navigate = useNavigate();
    /*
     * Function to connect to MetaMask
     */
    const connectMetaMask = async () => {
        if (typeof window.ethereum !== "undefined") {
            console.log("MetaMask is installed");
        }
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log("Connected account:", accounts[0]);
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    };
    useEffect(() => {
        axios
            .get("/auth/verify")
            .then((response) => {
                console.log("Response from express server");
                console.log(response);
                connectMetaMask();
            })
            .catch((error) => {
                navigate("/login");
                console.error("Error from express server");
                console.error(error);
            });
    }, [navigate]);
    return (
        <div className="w-full h-[100vh] flex flex-row">
            <VoterDashboardSideBar />
            <main className="w-3/4 border border-red-500 relative h-full">
                <CastVote />
            </main>
        </div>
    );
}

export default VoterDashboard