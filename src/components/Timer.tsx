import React, { useState, useEffect, useRef } from "react";

function Timer() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [time, setTime] = useState<number>(0);
    const [initiate, setInitiate] = useState<boolean>(false);
    const hoursRef = useRef<HTMLInputElement>(null);
    const minutesRef = useRef<HTMLInputElement>(null);
    const secondsRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let timerInterval: number | undefined;

        if (isRunning && time > 0) {
            timerInterval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        clearInterval(timerInterval);
                        setIsRunning(false);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [isRunning, time]);

    useEffect(() => {
        if (time === 0 && initiate) {
            setIsRunning(false);
        }
    }, [time, initiate]);

    function formattedTime() {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const formattedHours = padWithZero(hours.toString());
        const formattedMinutes = padWithZero(minutes.toString());
        const formattedSeconds = padWithZero(seconds.toString());

        return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
    }

    function padWithZero(num: string) {
        return num.padStart(2, "0");
    }

    const handleInputChange = () => {
        const hasValue =
            hoursRef.current?.value ||
            minutesRef.current?.value ||
            secondsRef.current?.value;

        setButtonDisabled(!hasValue);
    };

    function setTimerValues() {
        const hours = parseInt(hoursRef.current?.value || "0");
        const minutes = parseInt(minutesRef.current?.value || "0");
        const seconds = parseInt(secondsRef.current?.value || "0");

        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        setTime(totalSeconds);
        setInitiate(true);
        setIsRunning(true);
    }

    return (
        <>
            <main className="flex justify-center">
                <div className="mockup-window bg-base-300 w-full xl:w-1/2">
                    <div className="flex justify-center px-4 py-16 bg-base-300">
                        <div className="flex flex-col items-center gap-4">
                            {initiate && (
                                <>
                                    <div className="text-4xl">
                                        {formattedTime()}
                                    </div>
                                    <span className="flex gap-4">
                                        <button className="btn">Start</button>
                                        <button
                                            className="btn"
                                            onClick={() => setIsRunning(false)}
                                        >
                                            Stop
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => setTime(0)}
                                        >
                                            Reset
                                        </button>
                                    </span>
                                </>
                            )}
                            {!initiate && (
                                <>
                                    <span className="flex gap-4">
                                        <input
                                            type="number"
                                            id="hours"
                                            placeholder="HH"
                                            className="input w-full"
                                            ref={hoursRef}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="number"
                                            id="minutes"
                                            placeholder="MM"
                                            className="input w-full"
                                            ref={minutesRef}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="number"
                                            id="seconds"
                                            placeholder="SS"
                                            className="input w-full"
                                            ref={secondsRef}
                                            onChange={handleInputChange}
                                        />
                                    </span>
                                    <button
                                        className="btn"
                                        onClick={setTimerValues}
                                        disabled={buttonDisabled}
                                    >
                                        Start
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Timer;
