import React, { useState, useEffect } from 'react';


interface  ICountdown {
    targetDate : Date,
    onFinish : () => void
}

const Countdown = ({ targetDate, onFinish} : ICountdown) => {
    const calculateTimeLeft = (targetDate : any) => {
        const difference = (new Date(targetDate).getTime() as any) - (new Date().getTime() as any);
        let minutes, seconds;

        if (difference > 0) {
            minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((difference % (1000 * 60)) / 1000);
        }

        return { minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
            onFinish();
        }

        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);



    return (
        <div className={"text-center"}>
            <span>{String(timeLeft.minutes).padStart(2, '0') ?? "00"}:</span>
            <span>{String(timeLeft.seconds).padStart(2, '0') ?? "00"}</span>
        </div>
    );
};

export default Countdown;
