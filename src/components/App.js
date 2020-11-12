import React, { useEffect, useState, useRef } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import { GiPauseButton } from "react-icons/gi";
//to Do: not allow to change time unless
// the clock is not active

const App = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(25);
  const [label, setLabel] = useState("Session");

  const [isActive, setIsActive] = useState(false);

  const breakIncrease = (e) => {
    if (breakTime < 10) {
      setBreakTime(breakTime + 1);
    }
  };
  const breakDecrease = (e) => {
    if (breakTime > 1) {
      setBreakTime(breakTime - 1);
    }
  };

  const sessionIncrease = (e) => {
    if (sessionTime < 60) {
      setSessionTime(sessionTime + 1);
      setSecond(0);
      setMinute(sessionTime + 1);
      setLabel("Session");
    }
  };

  const sessionDecrease = (e) => {
    if (sessionTime > 1) {
      setSessionTime(sessionTime - 1);
      setSecond(0);
      setMinute(sessionTime - 1);
      setLabel("Session");
    } else if (minute < 1) {
      setMinute(sessionTime);
      setSecond(0);
      setLabel("Session");
    }
  };

  const handleReset = (e) => {
    setSessionTime(25);
    setBreakTime(5);
    setSecond(0);
    setIsActive(false);
    setMinute(25);
    beeper.current.pause();
  };

  const beeper = useRef(null);
  useEffect(() => {
    if (isActive === true) {
      let intervalId = setInterval(() => {
        if (second > 0) {
          setSecond((second) => second - 1);
        } else if (second === 0 && minute > 0) {
          setSecond(59);
          setMinute((minute) => minute - 1);
        } else if (minute === 0 && second === 0 && label === "Session") {
          setMinute(breakTime);
          setLabel("Break");
          beeper.current.play();
        } else if (minute === 0 && second === 0 && label === "Break") {
          setLabel("Session");
          setMinute(sessionTime);
          beeper.current.play();
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  });

  const handleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div id="container">
      <div className="clock">
        <h1 id="header">Pomodoro Clock </h1>
        <div id="adjust-time-box">
          <div id="break-box">
            <div id="break-label">Break Length</div>

            <div className="adjust-time">
              <button
                disabled={isActive}
                onClick={breakIncrease}
                id="break-increment"
              >
                <AiOutlineArrowUp />
              </button>
              <div id="break-length">{breakTime}</div>
              <button
                disabled={isActive}
                onClick={breakDecrease}
                id="break-decrement"
              >
                <AiOutlineArrowDown />
              </button>
            </div>
          </div>
          <div id="session-box">
            <div id="session-label">Session Length</div>
            <div className="adjust-time">
              <button
                disabled={isActive}
                onClick={sessionIncrease}
                id="session-increment"
              >
                <AiOutlineArrowUp />
              </button>
              <div id="session-length"> {sessionTime}</div>
              <button
                disabled={isActive}
                onClick={sessionDecrease}
                id="session-decrement"
              >
                <AiOutlineArrowDown />
              </button>
            </div>
          </div>
        </div>
        <div className="time">
          <div id="timer-label"> {label}</div>
          <div id="time-left">
            <span>
              {minute === 0 ? "00" : minute < 10 ? "0" + minute : minute}
            </span>
            <span>:</span>
            <span>
              {second === 0 ? "00" : second < 10 ? "0" + second : second}
            </span>
          </div>
        </div>
        <div className="playPause">
          <button onClick={handleActive} id="start_stop">
            {!isActive ? <BsPlayFill /> : <GiPauseButton />}
          </button>
          <button onClick={handleReset} id="reset">
            <VscDebugRestart />
          </button>
        </div>
        <audio
          id="beep"
          ref={beeper}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    </div>
  );
};

export default App;
