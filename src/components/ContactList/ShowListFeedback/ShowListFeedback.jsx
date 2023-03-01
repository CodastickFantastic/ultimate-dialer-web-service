import "./ShowListFeedback.scss";
import DataBaseContext from "../../../utility/contexts/DataBaseContext";
import { useContext, useEffect, useState } from "react";
import ShowListFeedbackRow from "./ShowListFeedbackRow";

export default function ShowListResult({ listName }) {
  const { userDataBase } = useContext(DataBaseContext);
  const [contactList, setContactList] = useState();

  useEffect(() => {
    if (listName !== undefined) {
      let arrDataBase = Object.entries(
        userDataBase.contactLists[listName].contacts
      );
      arrDataBase = arrDataBase.map((item, index) => {
        return (
          <ShowListFeedbackRow
            key={index}
            name={item[0]}
            feedback={item[1].feedback[0]}
            called={item[1].called}
            number={item[1].number}
            // note={item[1].note}
          />
        );
      });
      setContactList(arrDataBase);
    }
  }, [listName]);

  return (
    <section className="showListResult">
      {listName == undefined ? (
        <h2>Choose list to show results</h2>
      ) : (
        <>
          <h2>{listName}</h2>
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Feedback</th>
                  <th>Called</th>
                  <th>Number</th>
                  {/* <th>Note</th> */}
                </tr>
              </thead>
              <tbody>{contactList}</tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
