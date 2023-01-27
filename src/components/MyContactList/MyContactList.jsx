import "./MyContactList.css";
import ContactListRow from "./ContactListRow";
import { useContext, useEffect, useState } from "react";
import DataBaseContext from "../../utility/contexts/DataBaseContext";
import DeleteConfirmation from "./DeleteConfirmation";

function MyContactList(props) {
  const { userDataBase } = useContext(DataBaseContext);
  const [contactLists, setContactLists] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    status: false,
  });

  useEffect(() => {
    if (userDataBase !== "" && userDataBase !== null) {
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
            onClick={props.showListResult}
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
          userID={props.userID}
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

export default MyContactList;
