import "./CallHisotryWidget.scss";
import DataBaseContext from "../../../utility/contexts/DataBaseContext";
import { useContext, useEffect, useState } from "react";

export default function CallHistoryWidget() {
  const { userDataBase } = useContext(DataBaseContext);
  const [day0Stats, setDay0Stats] = useState({ total: 0 });
  const [day1Stats, setDay1Stats] = useState({ total: 0 });
  const [day2Stats, setDay2Stats] = useState({ total: 0 });
  const [day3Stats, setDay3Stats] = useState({ total: 0 });
  let date = new Date();
  let dayToShow = [];

  useEffect(() => {
    if (userDataBase.contactLists !== undefined) {
      let allContacts = getAllContacts(userDataBase);
      getCurrentDays();

      //Filtering all needed days
      let day0 = allContacts.filter((contact) =>
        filterDate(contact, dayToShow[0])
      );
      let day1 = allContacts.filter((contact) =>
        filterDate(contact, dayToShow[1])
      );
      let day2 = allContacts.filter((contact) =>
        filterDate(contact, dayToShow[2])
      );
      let day3 = allContacts.filter((contact) =>
        filterDate(contact, dayToShow[3])
      );

      setDay0Stats(returnDayStats(day0));
      setDay1Stats(returnDayStats(day1));
      setDay2Stats(returnDayStats(day2));
      setDay3Stats(returnDayStats(day3));
    }
  }, []);

  // Function - Get all available contact into one array
  function getAllContacts(data) {
    //Convert object to Array
    let allContacts = [];

    let conversion = Object.entries(data.contactLists);
    conversion = conversion.map((contacList) => {
      return Object.entries(contacList[1]).map((contactListNext) => {
        return Object.entries(contactListNext[1]).map((contacts) => {
          return Object.entries(contacts[1]).map((contact) => {
            return contact[1];
          });
        });
      });
    });

    //Iterate over array and push every single contact from each base to one array.
    for (let i = 0; i < conversion.length; i++) {
      for (let j = 0; j < conversion[i][1].length; j++) {
        allContacts.push(conversion[i][1][j]);
      }
    }

    return allContacts;
  }

  //Function - Filter for date
  function filterDate(contactArr, date) {
    return contactArr[0].split("-")[0].trim() === date;
  }

  //Function -  Get 4 last days in proper format and save it to dayToShow[]
  function getCurrentDays() {
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

    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        date.setDate(date.getDate());
      } else {
        date.setDate(date.getDate() - 1);
      }

      let day = date.toUTCString().split(" ")[1];
      let month = months[date.toUTCString().split(" ")[2]];
      let year = date.toUTCString().split(" ")[3];

      dayToShow.push(`${day}/${month}/${year}`);
    }
  }

  // Filter for answer
  function filterAnswered(contact, answer) {
    if (contact[1][1] === answer) {
      return contact;
    }
  }

  function returnDayStats(day) {
    let dayMax = day.length;
    let dayAnswered = day.filter((contact) =>
      filterAnswered(contact, "called")
    );
    let dayDenied = day.filter((contact) =>
      filterAnswered(contact, "no answer")
    );
    let dayLead = day.filter((contact) => filterAnswered(contact, "lead"));

    let aProc = (dayAnswered.length / dayMax) * 100 * 1.8 + "%";
    let dProc = (dayDenied.length / dayMax) * 100 * 1.8 + "%";
    let lProc = (dayLead.length / dayMax) * 100 * 1.8 + "%";
    return {
      answeredP: aProc,
      deniedP: dProc,
      leadP: lProc,
      answered: dayAnswered.length,
      denied: dayDenied.length,
      lead: dayLead.length,
      total: dayMax,
    };
  }

  return (
    <section className="callHistoryWidget">
      <div className="legend">
        <div className="legendItem">
          <div className="color color1"></div>
          <p>Answered</p>
        </div>
        <div className="legendItem">
          <div className="color color2"></div>
          <p>Denied</p>
        </div>
        <div className="legendItem">
          <div className="color color3"></div>
          <p>Lead</p>
        </div>
      </div>
      <div className="chart">
        <div className="day">
          {day3Stats.total !== 0 ? (
            <div className="candles">
              <div
                className="candle answerStats"
                style={{ height: day3Stats.answeredP }}
              >
                <div className="counter">{day3Stats.answered}</div>
              </div>
              <div
                className="candle deniedStats"
                style={{ height: day3Stats.deniedP }}
              >
                <div className="counter">{day3Stats.denied}</div>
              </div>
              <div
                className="candle leadStats"
                style={{ height: day3Stats.leadP }}
              >
                <div className="counter">{day3Stats.lead}</div>
              </div>
            </div>
          ) : (
            <p>No calls recorded</p>
          )}
          <h3>
            {dayToShow[3]}
            <br />
            Total Calls: {day3Stats.total}
          </h3>
        </div>
        <div className="day">
          {day2Stats.total !== 0 ? (
            <div className="candles">
              <div
                className="candle answerStats"
                style={{ height: day2Stats.answeredP }}
              >
                <div className="counter">{day2Stats.answered}</div>
              </div>
              <div
                className="candle deniedStats"
                style={{ height: day2Stats.deniedP }}
              >
                <div className="counter">{day2Stats.denied}</div>
              </div>
              <div
                className="candle leadStats"
                style={{ height: day2Stats.leadP }}
              >
                <div className="counter">{day2Stats.lead}</div>
              </div>
            </div>
          ) : (
            <p>No calls recorded</p>
          )}
          <h3>
            {dayToShow[2]}
            <br />
            Total Calls: {day2Stats.total}
          </h3>
        </div>
        <div className="day">
          {day1Stats.total !== 0 ? (
            <div className="candles">
              <div
                className="candle answerStats"
                style={{ height: day1Stats.answeredP }}
              >
                <div className="counter">{day1Stats.answered}</div>
              </div>
              <div
                className="candle deniedStats"
                style={{ height: day1Stats.deniedP }}
              >
                <div className="counter">{day1Stats.denied}</div>
              </div>
              <div
                className="candle leadStats"
                style={{ height: day1Stats.leadP }}
              >
                <div className="counter">{day1Stats.lead}</div>
              </div>
            </div>
          ) : (
            <p>No calls recorded</p>
          )}
          <h3>
            {dayToShow[1]}
            <br />
            Total Calls: {day1Stats.total}
          </h3>
        </div>
        <div className="day">
          {day0Stats.total !== 0 ? (
            <div className="candles">
              <div
                className="candle answerStats"
                style={{ height: day0Stats.answeredP }}
              >
                <div className="counter">{day0Stats.answered}</div>
              </div>
              <div
                className="candle deniedStats"
                style={{ height: day0Stats.deniedP }}
              >
                <div className="counter">{day0Stats.denied}</div>
              </div>
              <div
                className="candle leadStats"
                style={{ height: day0Stats.leadP }}
              >
                <div className="counter">{day0Stats.lead}</div>
              </div>
            </div>
          ) : (
            <p>No calls recorded</p>
          )}
          <h3>
            {dayToShow[0]}
            <br />
            Total Calls: {day0Stats.total}
          </h3>
        </div>
      </div>
    </section>
  );
}
