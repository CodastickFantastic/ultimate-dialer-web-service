import "./CallHisotryWidget.scss";
import DataBaseContext from "../../../utility/contexts/DataBaseContext";
import { useContext } from "react";

export default function CallHistoryWidget() {
  const { userDataBase } = useContext(DataBaseContext);
  let allContacts = [];
  let date = new Date();
  let daysToShow = [];

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

  //Function -  Get 4 last days in proper format and save it to daysToShow[]
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

      daysToShow.push(`${day}/${month}/${year}`);
    }
  }

  //   let x = allContacts.filter((contact) =>
  //     filterDate(contact, "05/January/2023")
  //   );
  console.log(daysToShow);

  return (
    <section className="callHistoryWidget">
      <div className="day">
        <h3>{daysToShow[3]}</h3>
        <div className="chart">
            <div>
                
            </div>
        </div>
      </div>
      <div className="day">
        <h3>{daysToShow[2]}</h3>
      </div>
      <div className="day">
        <h3>{daysToShow[1]}</h3>
      </div>
      <div className="day">
        <h3>{daysToShow[0]}</h3>
      </div>
    </section>
  );
}
