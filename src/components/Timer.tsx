import { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import { motion } from "framer-motion";
import Resonance from "../assets/sounds/Resonance.mp3";

function Timer() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [time, setTime] = useState<number>(0);
    const [initiate, setInitiate] = useState<boolean>(false);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const hoursRef = useRef<HTMLInputElement>(null);
    const minutesRef = useRef<HTMLInputElement>(null);
    const secondsRef = useRef<HTMLInputElement>(null);
    const [play, { stop }] = useSound(Resonance, { interrupt: true });

    const fadeInOutVariants = {
        initial: {
            opacity: 0,
            x: -100,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
            },
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
            },
        },
        exit: {
            opacity: 0,
            x: -100,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
            },
        },
    };

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
            setIsEnd(true);
            play();
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
        let hoursValue = 0;
        let minutesValue = 0;
        let secondsValue = 0;
        let hasPositiveValue: boolean = false;

        if (hoursRef.current?.value) {
            hoursValue = parseInt(hoursRef.current?.value) || 0;
        }
        if (minutesRef.current?.value) {
            minutesValue = parseInt(minutesRef.current?.value) || 0;
        }
        if (secondsRef.current?.value) {
            secondsValue = parseInt(secondsRef.current?.value) || 0;
        }

        if (hoursValue >= 0 && minutesValue >= 0 && secondsValue >= 0) {
            hasPositiveValue =
                hoursValue > 0 || minutesValue > 0 || secondsValue > 0;
        }

        setButtonDisabled(!hasPositiveValue);
    };

    function setTimerValues() {
        const hours = parseInt(hoursRef.current?.value || "0");
        const minutes = parseInt(minutesRef.current?.value || "0");
        const seconds = parseInt(secondsRef.current?.value || "0");

        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        setTime(totalSeconds);
        setInitiate(true);
        setIsRunning(true);
        setIsEnd(false);
    }

    function toggleTimer() {
        setIsRunning((prevState) => !prevState);
    }

    function reset() {
        setTime(0);
        setInitiate(false);
        setButtonDisabled(true);
        stop();
    }

    return (
        <>
            <main className="flex justify-center">
                <div className="mockup-window bg-base-300 w-full xl:w-1/2">
                    <div className="flex justify-center px-4 py-16 bg-base-200">
                        <motion.div
                            className="flex flex-col items-center gap-4"
                            variants={fadeInOutVariants}
                            initial="initial"
                            animate={initiate ? "exit" : "animate"}
                            exit="exit"
                        >
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
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center gap-4"
                            variants={fadeInOutVariants}
                            initial="initial"
                            animate={initiate ? "animate" : "exit"}
                            exit="exit"
                        >
                            {initiate && (
                                <>
                                    <div className="text-4xl">
                                        {formattedTime()}
                                    </div>
                                    <span className="flex gap-4">
                                        {!isEnd && (
                                            <button
                                                className="btn"
                                                onClick={toggleTimer}
                                            >
                                                {isRunning ? "Pause" : "Resume"}
                                            </button>
                                        )}

                                        <button className="btn" onClick={reset}>
                                            Reset
                                        </button>
                                    </span>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Timer;
