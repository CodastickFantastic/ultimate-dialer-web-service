import "./MyContactList.css";
import ContactListRow from "./ContactListRow";
import { useContext, useEffect, useState } from "react";
import DataBaseContext from "../../utility/contexts/DataBaseContext";
import { remove } from "firebase/database";
import { database } from "../../services/firebase";

function MyContactList() {
  const { userDataBase } = useContext(DataBaseContext);
  const [contactLists, setContactLists] = useState();

  useEffect(() => {
    if (userDataBase !== "") {
      let arrDataBase = Object.entries(userDataBase.contactLists);
      arrDataBase = arrDataBase.map((item, index) => {
        return (
          <ContactListRow
            key={index}
            date={item[1].uploadDate}
            listName={item[0]}
            doneCalls={item[1].callCounter}
            totalCalls={Object.keys(item[1].contacts).length}
            deleteList={deleteList}
          />
        );
      });
      setContactLists(arrDataBase);
    }
  }, [userDataBase]);

  function deleteList(e){
    console.log(e.target.parentNode.children[1].innerHTML)
    
  }

  return (
    <section className="myContactList">
      <h2>My Contact Lists</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>List Name</th>
            <th>Done Calls</th>
            <th>Total Calls</th>
            <th>Delete List</th>
          </tr>
        </thead>
        <tbody>{contactLists}</tbody>
      </table>
    </section>
  );
}

export default MyContactList;
