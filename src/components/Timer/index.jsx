import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

const Timer = (props) => {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [isTimeExpired, setIsTimeExpired] = useState(false);
  const sliceHours = props.time.slice(0, 2);
  const sliceMinutes = props.time.slice(3, 5);

  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  const startTimer = () => {
    const countDownDate = new Date(props.date);
    countDownDate.setHours(sliceHours);
    countDownDate.setMinutes(sliceMinutes);
    const now = new Date().getTime();
    const gap = countDownDate - now;

    if (gap < 0) return setIsTimeExpired(true);

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const remainingDays = Math.floor(gap / day);
    const remainingHours = addZero(Math.floor((gap % day) / hour));
    const remainingMinutes = addZero(Math.floor((gap % hour) / minute));
    const remainingSeconds = addZero(Math.floor((gap % minute) / second));

    setTimerDays(remainingDays);
    setTimerHours(remainingHours);
    setTimerMinutes(remainingMinutes);
    setTimerSeconds(remainingSeconds);
  };

  setInterval(startTimer, 1000);

  return (
    <div>
      <div className="timer">
        {isTimeExpired ? 
          <h3>Time Over</h3> : 
          <Row>
            <Row style={{ margin: "10px" }}>
              <h3 style={{ color: "blue" }}>Remaining Time</h3>
            </Row>
            <Row style={{ padding: "10px", margin: "auto" }}>
              <Col lg={3}>
                <h4>{timerDays} days :</h4>
              </Col>
              <Col lg={3}>
                <h4>{timerHours} hours</h4>
              </Col>
              <Col lg={3}>
                <h4>: {timerMinutes} min</h4>
              </Col>
              <Col lg={3}>
                <h4>: {timerSeconds} sec</h4>
              </Col>
            </Row>
          </Row>
        }
      </div>
    </div>
  );
};

export default Timer;
