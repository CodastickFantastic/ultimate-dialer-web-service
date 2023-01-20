import "./UploadContactList.css";
import UploadFileComponent from "./UploadFileComponent";

// Component Feedback Input
function FeedbackInput() {
  return (
    <div className="feedbackInput">
      <input type="text" name="feedback" />
      <img
        className="deleteFeedback"
        src={require("../../images/icons/minus.png")}
        alt="-"
      />
    </div>
  );
}

export default function UploadContactList() {
  

  return (
    <section className="uploadContactListSection">
      <h2>Add Contact List</h2>
      <form>
        <label htmlFor="listName">List Name</label>
        <input type="text" id="listName" name="listName" />
        <label>Set List Feedback</label>
        <FeedbackInput />
        <FeedbackInput />
        <FeedbackInput />
        <img
          className="addFeedback"
          src={require("../../images/icons/plus.png")}
          alt="+"
        />
        <p>
          To upload, first you need to <br />
          <a href="../../images/icons/minus.png" download>
            download example file
          </a>
          <br />
          and fill it with your data.
        </p>
        <UploadFileComponent />
        <button type="submit">Upload File</button>
      </form>
    </section>
  );
}
