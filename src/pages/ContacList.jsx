import { useContext, useState } from "react";
import DataBaseContext from "../utility/contexts/DataBaseContext";
import MyContactList from "../components/ContactList/MyContactList/MyContactList";
import ShowListResult from "../components/ContactList/ShowListFeedback/ShowListFeedback";

export default function ContactList(user) {
  const { userDataBase } = useContext(DataBaseContext);
  const [listName, setListName] = useState();

  function showListResult(choosenListEvent) {
    let listName = choosenListEvent.target.parentElement.cells[1].innerHTML;
    setListName(listName);
  }

  return (
    <section className="contactList">
      <MyContactList
        user={user}
        showListResult={(event) => showListResult(event)}
      />
      <ShowListResult listName={listName} />
    </section>
  );
}
