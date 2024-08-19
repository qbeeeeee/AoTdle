import React, { useEffect, useState } from 'react'

const ResetTime = () => {
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
            const difference = endOfDay - now;
            const seconds = Math.floor(difference / 1000);
            return seconds;
        };

        setTimeRemaining(calculateTimeRemaining());

        const intervalId = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => {
                if (prevTimeRemaining <= 1) {
                    return calculateTimeRemaining();
                }
                return prevTimeRemaining - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    
  return (
    <div className='m-5'>
        <h2 className="font-custom text-3xl items-center justify-center flex">RESET</h2>
        <p className='text-4xl font-none'>{formatTime(timeRemaining)}</p>
    </div>
  )
}

export default ResetTime