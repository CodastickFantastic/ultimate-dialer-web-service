import { useEffect, useState } from "react";
import "./HelloWidget.scss";

export default function HelloWidget(props) {
  let stringDate;
  let todaysDate;
  const [time, setTime] = useState("");
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const startTimer = setInterval(() => {
      let date = new Date();
      setTime(date.toLocaleTimeString());
      if (date.toLocaleTimeString().split(":")[0] < 18) {
        setIsNight(false);
      } else {
        setIsNight(true);
      }
    }, 1000);
    return () => {
      clearInterval(startTimer);
    };
  }, []);

  getDate();

  function getDate() {
    let date = new Date();
    let days = {
      Mon: "Monday",
      Tue: "Tuesday",
      Wed: "Wednesday",
      Thu: "Thursday",
      Fri: "Friday",
      Sat: "Saturday",
      Sun: "Sunday",
    };

    let months = {
      Jan: "January",
      Feb: "February",
      Mar: "March",
      Apr: "April",
      May: "May",
      Jun: "June",
      Jul: "July",
      Aug: "August",
      Sept: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December",
    };

    let day = date.toUTCString().split(" ")[1];
    let month = months[date.toUTCString().split(" ")[2]];
    let year = date.toUTCString().split(" ")[3];

    stringDate = days[date.toUTCString().split(",")[0]];

    todaysDate = day + " " + month + " " + year;
  }

  return (
    <div className="helloWidget">
      <div className="helloImage">
        <img
          src={require("../../../images/icons/hexagon_frame.png")}
          alt="It is night"
          className="img1"
        />
        {isNight ? (
          <img
            src={require("../../../images/icons/moon.png")}
            alt="It is night"
            className="img2"
          />
        ) : (
          <img
            src={require("../../../images/icons/sun.png")}
            alt="It is morning"
            className="img3"
          />
        )}
      </div>
      <div className="helloText">
        {isNight ? (
          <h1>Good Afternoon, {props.name.split(" ")[0]}.</h1>
        ) : (
          <h1>Good Morning, {props.name.split(" ")[0]}.</h1>
        )}
        <p>
          {stringDate}, {todaysDate}
        </p>
        <p>{time}</p>
      </div>
    </div>
  );
}
