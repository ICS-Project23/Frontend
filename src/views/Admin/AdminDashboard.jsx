import React, {useState} from "react";
import TopNavBar from "../../components/TopNavBar";
import AdminSideBar from "../../components/AdminSideBar";
import AddElection from "../../components/AddElection";
import AddCandidate from "../../components/AddCandidate";

const AdminDashboard = () => {
    const [isElectionMgt, setisElectionMgt] = useState(false)
    const [isCandidateMgt, setisCandidateMgt] = useState(false)

    const handleElectionMgtClick = () => {
        setisElectionMgt(true)
        setisCandidateMgt(false)
    }
    const handleCandidateMgtClick = () => {
        console.log("Candidate Mgt Clicked");
        setisElectionMgt(false)
        setisCandidateMgt(true)
    }
    return (
        <>
            <TopNavBar name="Admin Dashboard" />
            <div className="w-full h-screen flex flex-row">
                <AdminSideBar
                    onElectionMgtClick={() => {
                        handleElectionMgtClick();
                    }}
                    onCandidateMgtClick={() => {
                        handleCandidateMgtClick();
                    }}
                    onDashboardClick={() => {
                        setisCandidateMgt(false)
                        setisElectionMgt(false)
                    }}
                />
                <main className="w-3/4">
                    {
                        !isCandidateMgt & !isElectionMgt &&(
                            <iframe
                        src="http://localhost:3000/d/XE4V0WGZz/votex-overview?orgId=1&refresh=5s&from=now-5m&to=now"
                        width="1200"
                        height="800"
                    />
                        )
                    }
                    {isCandidateMgt && <AddCandidate /> }
                    {isElectionMgt && <AddElection />}
                </main>
            </div>
        </>
    );
};

export default AdminDashboard;
