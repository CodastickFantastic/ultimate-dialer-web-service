// SCSS Import
import "./MyContactList.scss";

// React Utility Import
import { useContext, useEffect, useState } from "react";

// Component Import
import ContactListRow from "./ContactListRow";
import DeleteConfirmation from "./DeleteConfirmation";

// Context Import
import DataBaseContext from "../../../utility/contexts/DataBaseContext";

// Main Component
export default function MyContactList({ user, showListResult }) {
  const { userDataBase } = useContext(DataBaseContext);
  const [contactLists, setContactLists] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    status: false,
  });

  // Get Contact Lists from Database
  useEffect(() => {
    if (userDataBase.contactLists !== undefined) {
      // console.log("DB: ", userDataBase.contactLists)
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
            onClick={showListResult}
          />
        );
      });
      setContactLists(arrDataBase);
    } else {
      setContactLists(
        <tr>
          <td>You have no contact list.</td>
        </tr>
      );
    }
  }, [userDataBase]);

  // Delete List
  function deleteList(e) {
    setDeleteConfirmation({
      status: true,
      listToDelete: e.target.parentNode.children[1].innerHTML,
    });
  }

  function deleteAborted() {
    setDeleteConfirmation({ status: false });
  }

  return (
    <section className="myContactList">
      {deleteConfirmation.status && (
        <DeleteConfirmation
          listToDelete={deleteConfirmation.listToDelete}
          deleteAborted={deleteAborted}
          user={user}
        />
      )}
      <h2>My Contact Lists</h2>
      <div className="tableContainer">
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
      </div>
    </section>
  );
}
