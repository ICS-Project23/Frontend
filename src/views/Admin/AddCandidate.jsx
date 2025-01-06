import React, { useEffect } from "react";
import axios from "../../api/axios";
import { ethers } from "ethers";
import InputComponent from "../../components/InputComponent";
import { ipfs } from "../../config/ipfs";
import { Buffer } from "buffer";
import TopNavBar from "../../components/TopNavBar";
import AdminSideBar from "../../components/AdminSideBar";


const AddCandidate = () => {
    const [candidate, setCandidate] = React.useState({
        full_name: "",
        dob: "",
        position_id: "",
        party: "",
        cid: "",
    });
    const [file, setFile] = React.useState();
    const [positions, setPositions] = React.useState([]);
    const [elections, setElections] = React.useState([]);
    const [electionId, setElectionId] = React.useState(null);

    const getPositions = (election_id) => {
        axios
            .get(`/election/${election_id}/positions`)
            .then((res) => {
                console.log(res);
                setPositions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Name: ${name}, Value: ${value}`);
        if (name === "election_id") {
            setElectionId(value);
        } else {
            setCandidate((prevCandidate) => ({
                ...prevCandidate,
                [name]: value,
            }));
            console.log("Updated Candidate");
            console.log(candidate);
        }
    };
    const updateWithIPFS = async () => {
        try {
            console.log("Getting IPFS....");
            const buffer = await new Promise((resolve, reject) => {
                const reader = new window.FileReader();
                reader.readAsArrayBuffer(file);
                reader.onloadend = () => resolve(Buffer.from(reader.result));
                reader.onerror = () => reject(new Error("Failed to read file"));
            });

            console.log("Buffer");
            console.log(buffer);
            const added = await ipfs.add(buffer);
            console.log("Added file:", added);
            return added.path;
        } catch (error) {
            console.error("An error occurred when trying to add file to IPFS");
            console.error(error);
        }
    };
    const getElections = () => {
        axios
            .get("/election/")
            .then((res) => {
                console.log(res);
                setElections(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const candidateCid = await updateWithIPFS();
            console.log("CID: ", candidateCid);
            // const updatedCandidate = {
            //     ...candidate,
            //     cid: "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
            // };
            setCandidate((prev) => ({
                ...prev,
                cid: candidateCid,
            }));

            console.log("Updated Candidate");
            console.log(candidate);
            const response = await axios.post("/candidate/", candidate);
            console.log(response.data);
            if (response.data.message == "Candidate added successfully") {
                window.flash("Candidate added successfully", "success");
            }
        } catch (error) {
            console.error("Error during candidate submission:", error);
            window.flash("Failed to add candidate", "error");
        }
    };
    useEffect(() => {
        getElections();
    }, []);
    useEffect(() => {
        if (electionId) {
            getPositions(electionId);
        }
    }, [electionId]);

    return (
        <>
            <TopNavBar name="Admin Dashboard" />
            <div className="w-full h-screen flex flex-row">
                <AdminSideBar/>
                <main className="w-3/4">
                    <div className="flex flex-col items-center justify-center w-full">
                        <p>Add Candidate</p>
                        <form
                            onSubmit={handleSubmit}
                            className="p-10 w-1/3 flex flex-col items-center shadow-2xl rounded-lg"
                        >
                            <select
                                className="select w-full max-w-xs mb-10"
                                onChange={handleChange}
                                name="election_id"
                            >
                                <option disabled selected>
                                    Selection Election
                                </option>
                                {elections.map((election) => (
                                    <option
                                        key={election.id}
                                        value={election.id}
                                    >
                                        {election.name}
                                    </option>
                                ))}
                            </select>
                            <InputComponent
                                input_type={"text"}
                                name={"full_name"}
                                label={"Candidate Name"}
                                onChange={handleChange}
                            />
                            <InputComponent
                                input_type={"date"}
                                name={"dob"}
                                label={"Date of Birth"}
                                onChange={handleChange}
                            />
                            <InputComponent
                                input_type={"file"}
                                name={"cid"}
                                label={"Candidate Image"}
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                }}
                            />
                            <select
                                className="select w-full max-w-xs mb-10"
                                onChange={handleChange}
                                name="position_id"
                            >
                                <option disabled selected>
                                    Selection Position Vying For
                                </option>
                                {positions.map((position) => (
                                    <option
                                        key={position.id}
                                        value={position.id}
                                    >
                                        {position.name}
                                    </option>
                                ))}
                            </select>
                            <InputComponent
                                input_type={"text"}
                                name={"party"}
                                label={"Party"}
                                onChange={handleChange}
                            />
                            <button
                                className="btn btn-primary mt-3 w-full"
                                type="submit"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default AddCandidate;
