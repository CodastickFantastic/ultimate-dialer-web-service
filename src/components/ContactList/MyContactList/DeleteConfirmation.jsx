import "./DeleteConfirmation.scss";

import { remove, ref } from "firebase/database";
import { database } from "../../../services/firebase";

export default function DeleteConfirmation({
  listToDelete,
  user,
  deleteAborted,
}) {
  function deleteListFromFirebase() {
    remove(
      ref(database, `users/${user.user.uid}/contactLists/${listToDelete}`)
    );
    deleteAborted();
  }

  return (
    <section className="deleteConfirmation">
      <p>
        Are you sure you want to delete{" "}
        <span className="listToDelete">{listToDelete}</span> ?
      </p>
      <div>
        <button onClick={deleteListFromFirebase}>Yes</button>
        <button onClick={deleteAborted}>No</button>
      </div>
    </section>
  );
}
