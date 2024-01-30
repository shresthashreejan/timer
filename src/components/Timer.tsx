import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const [isRunning, setIsRunning] = useState<Boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [initiate, setInitiate] = useState<Boolean>(false);
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);

  function formattedTime() {
    return `00:00:00`;
  }

  function setTimerValues() {
    setInitiate(true);
  }

  return (
    <>
      <main className="mockup-window bg-base-300">
        <div className="flex justify-center px-4 py-16 bg-base-300">
          <div className="flex flex-col items-center gap-4">
            {initiate && (
              <>
                <div className="text-4xl">{formattedTime()}</div>
                <span className="flex gap-4">
                  <button className="btn">Start</button>
                  <button className="btn">Stop</button>
                  <button className="btn">Reset</button>
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
                  />
                  <input
                    type="number"
                    id="minutes"
                    placeholder="MM"
                    className="input w-full"
                    ref={minutesRef}
                  />
                  <input
                    type="number"
                    id="seconds"
                    placeholder="SS"
                    className="input w-full"
                    ref={secondsRef}
                  />
                </span>
                <button className="btn" onClick={setTimerValues}>
                  Start
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Timer;
