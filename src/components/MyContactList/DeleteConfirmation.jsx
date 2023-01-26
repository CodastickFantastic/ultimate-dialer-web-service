import "./DeleteConfirmation.css";

import { remove, ref } from "firebase/database";
import { database } from "../../services/firebase";

export default function DeleteConfirmation(props) {
  function deleteListFromFirebase() {
    remove(
      ref(database, `users/${props.userID}/contactLists/${props.listToDelete}`)
    );
    props.deleteAborted();
  }

  return (
    <section className="deleteConfirmation">
      <p>
        Are you sure you want to delete{" "}
        <span className="listToDelete">{props.listToDelete}</span> ?
      </p>
      <div>
        <button onClick={deleteListFromFirebase}>Yes</button>
        <button onClick={props.deleteAborted}>No</button>
      </div>
    </section>
  );
}
