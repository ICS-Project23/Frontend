import React, {useState, useEffect} from "react";

const LiveClockUpdate = ({startDate, endDate}) => {
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

    // Calculate the time remaining
    function getTimeRemaining() {
        const now = new Date();
        const end = new Date(endDate);
        const timeDiff = Math.max(0, end - now); // Ensure no negative values

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        if (!startDate || !endDate) {
            console.error("Both startDate and endDate props are required");
            return;
        }

        const interval = setInterval(() => {
            setTimeRemaining(getTimeRemaining());
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [endDate]);

    if (new Date() < new Date(startDate)) {
        return (
            <div className="text-my_navy_blue">
                Countdown will start on {new Date(startDate).toLocaleString()}
            </div>
        );
    }
    return (
        <p className="font-extralight text-my_gray">
            {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}
            m {timeRemaining.seconds}s
        </p>
    );
};

export default LiveClockUpdate;
