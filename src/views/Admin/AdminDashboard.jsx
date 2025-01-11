import React, { useEffect, useState } from "react";
import TopNavBar from "../../components/TopNavBar";
import AdminSideBar from "../../components/AdminSideBar";
import axios from "../../api/axios";
import { redirect, useNavigate, useNavigation } from "react-router-dom";


const AdminDashboard = () => {
    const [electionStatus, setElectionStatus] = useState(false);
const navigate = useNavigate();

    const getElectionStatus = () => {
        axios
            .get("/election")
            .then((result) => {
                console.log("Results from server");
                setElectionStatus(result.data);
            })
            .catch((error) => {
                console.error("Error from server");
                console.error(error);
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
                return results_array[results_array.length - 1];
            })
            .catch((error) => {
                console.log("Error from server");
                console.log(error);
            });
    };
    const authenticate = () => {
        return axios
            .get("/auth/verify/admin")
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                navigate("/admin/login");
            });
    };

    const startElection = () => {
        axios
            .post("/election/start")
            .then((result) => {
                console.log("Results from server");
            })
            .catch((error) => {
                console.error("Error from server");
                console.error(error);
            });
    };
    const stopElection = () => {
        axios
            .post("/election/stop")
            .then((result) => {
                console.log("Results from server");
            })
            .catch((error) => {
                console.error("Error from server");
                console.error(error);
            });
    };

    useEffect(() => {
        authenticate().then(() => {
            console.log("Authenticated");
        })
        getElection()
            .then((election) => {
                console.log(election);
                const now = new Date();
                const start = new Date(election.start);
                const end = new Date(election.end);
                if (now > start && electionStatus != true) {
                    startElection();
                } else if (now > end && electionStatus != false) {
                    stopElection();
                }
            })
            .catch((error) => {
                console.error("Error from server");
                console.error(error);
            });
    }, [navigate]);

    return (
        <>
            <TopNavBar name="Admin Dashboard" />
            <div className="w-full h-screen flex flex-row">
                <AdminSideBar />
                <main className="w-3/4">
                    <iframe
                        // src="https://snapshots.raintank.io/dashboard/snapshot/ZcABQi2r7IyiFVwKWTS3eZx9WNnFIm4p"
                        width="1200"
                        height="800"
                    />
                </main>
            </div>
        </>
    );
};

export default AdminDashboard;
