import React from "react";

const CandidateModal = ({candidate, onClose}) => {
    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{candidate.name}</h3>
                <p className="py-4">{candidate.dob}</p>
                <p className="py-4">{candidate.party}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
};

export default CandidateModal;
