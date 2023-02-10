import "./CallHisotryWidget.scss";
import DataBaseContext from "../../../utility/contexts/DataBaseContext";
import { useContext, useState } from "react";

export default function CallHistoryWidget() {
  const { userDataBase } = useContext(DataBaseContext);
  let allContacts = [];
  let date = new Date();
  let dayToShow = [];

  // Function - Get all available contact into one array
  getAllContacts(userDataBase);
  function getAllContacts(data) {
    //Convert object to Array
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
  }

  //Function - Filter for date
  function filterDate(contactArr, date) {
    return contactArr[0].split("-")[0].trim() === date;
  }

  //Function -  Get 4 last days in proper format and save it to dayToShow[]
  getCurrentDays();
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

  //Filtering all needed days

  let day0 = allContacts.filter((contact) => filterDate(contact, dayToShow[0]));
  let day1 = allContacts.filter((contact) => filterDate(contact, dayToShow[1]));
  let day2 = allContacts.filter((contact) => filterDate(contact, dayToShow[2]));
  let day3 = allContacts.filter((contact) => filterDate(contact, dayToShow[3]));

  const [data, setData] = useState([day0, day1, day2, day3]);

  console.log(data[0].length);

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
          {data[0].lenght === 0 ? (
            <div className="candles"></div>
          ) : (
            <p>No calls recorded</p>
          )}
          <h3>{dayToShow[3]}</h3>
        </div>
        <div className="day">
          <div className="candles">
            <div className="candle answerStats" style={{ height: "30%" }}></div>
            <div className="candle deniedStats" style={{ height: "60%" }}></div>
            <div className="candle leadStats" style={{ height: "10%" }}></div>
          </div>
          <h3>{dayToShow[2]}</h3>
        </div>
        <div className="day">
          <h3>{dayToShow[1]}</h3>
        </div>
        <div className="day">
          <h3>{dayToShow[0]}</h3>
        </div>
      </div>
    </section>
  );
}
