import UploadInstruction from "../../components/AddContactList/UploadInstruction/UploadInstruction";
import UploadDataBase from "../../components/AddContactList/UploadDataBase/UploadDataBase";

import { XlxsToObjContextProvider } from "../../utility/contexts/XlxsToObjContext";

import "./AddContactList.scss";

export default function AddContactList() {
  return (
    <XlxsToObjContextProvider>
      <section className="addContactList">
        <h1>Follow the instruction to upload data to your application</h1>
        <UploadInstruction />
        <h2>Upload Your Database</h2>
        <UploadDataBase />
      </section>
    </XlxsToObjContextProvider>
  );
}
