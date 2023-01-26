import { useEffect, useState, useContext } from "react";
import "./UploadContactList.css";
import UploadFileComponent from "./UploadFileComponent";
import XlxsToObjContext from "../../utility/contexts/XlxsToObjContext";
import DataBaseContext from "../../utility/contexts/DataBaseContext";

export default function UploadContactList() {
  const [fileSend, setFileSend] = useState(false);
  //Form Data Values
  const [formData, setFormData] = useState({
    listName: "",
    feedbacks: ["Called", "Not answerd", "Calendar"],
  });

  // Display Feedbacks Form
  const [displayFeedback, setDisplayFeedback] = useState([]);
  const [updateView, setUpdateView] = useState(0);

  //XLXS Object
  const { xlxsObject } = useContext(XlxsToObjContext);

  //Database Connection
  const { uploadContactList } = useContext(DataBaseContext);

  // Refreshing Feedbacks Section
  function setDisplayFeedbackState() {
    setDisplayFeedback(
      formData.feedbacks.map((feedback, i) => {
        return <FeedbackInput key={i} id={i} />;
      })
    );
  }

  //Initilizing Feedbacks
  useEffect(() => {
    setDisplayFeedbackState();
  }, [updateView]);

  //Handle Form Changes
  function handleChange(event) {
    let { name, value } = event.target;

    let input = name === "listName" ? "listName" : "feedbacks";

    setFormData((prevForm) => {
      if (input === "feedbacks") {
        let newFeedbackArr = prevForm.feedbacks;
        newFeedbackArr[name.slice(8, 10)] = value;
        value = newFeedbackArr;
      }
      return {

        ...prevForm,
        [input]: value,
      };
    });
    setDisplayFeedbackState();
  }

  //Handle Add Feedback
  function addFeedback() {
    setFormData((prevForm) => {
      let feedbackList = prevForm.feedbacks;
      feedbackList.push("");
      return {
        ...prevForm,
        feedbacks: feedbackList,
      };
    });
    setUpdateView((prevState) => prevState + 1);
  }

  //Handle Submit
  function onSubmitHandler(e) {
    e.preventDefault();

    if (formData.listName.trim() !== "" && xlxsObject !== null) {
      // Form xlxsObject to fit Firebase Structure
      let contactList = {};
      xlxsObject.forEach((contact) => {
        return (contactList[contact.name] = {
          number: contact.number.toString(),
          mail: contact.mail ? contact.mail : "none",
          feedback: contact.feedback ? contact.feedback : "none",
          note: contact.note ? contact.note : "none",
          called: contact.called ? contact.called : "none",
        });
      });
      // Form Firebase Object
      let nowDate = new Date(); 
      let date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
      let firebaseObj = {
        [formData.listName]: {
          callCounter: 0,
          uploadDate: date,
          feedbackList: Object.assign({}, formData.feedbacks),
          contacts: contactList,
        },
      };
      // Upload Firebase Object to Database
      console.log(firebaseObj);
      uploadContactList(firebaseObj);
      setFileSend(true);
    }
  }

  //Resteart Form
  function restartForm() {
    setFormData({
      listName: "",
      feedbacks: ["Called", "Not answerd", "Calendar"],
    })

    setFileSend(false)
  }

  // Component Feedback Input
  function FeedbackInput(props) {
    // Deleting Feedbacks Hanlder
    function deleteFeedback(e) {
      if (formData.feedbacks.length > 1) {
        setFormData((prevForm) => {
          let newArr = prevForm.feedbacks;
          let index = e.target.parentNode.firstChild.name.slice(8, 10);
          newArr.splice(index, 1);
          return {
            ...prevForm,
            feedbacks: newArr,
          };
        });
        setUpdateView((prevState) => prevState + 1);
      }
    }

    return (
      <div className="feedbackInput">
        <input
          type="text"
          name={`feedback${props.id}`}
          value={formData.feedbacks[props.id]}
          onChange={handleChange}
        />
        <img
          className="deleteFeedback"
          src={require("../../images/icons/minus.png")}
          alt="-"
          onClick={deleteFeedback}
        />
      </div>
    );
  }

  // Component Upload Contact List Form
  return (
    <section className="uploadContactListSection">
      {fileSend ? (
        <>
          <p>File Send Succesfull</p>
          <button onClick={restartForm}>Load another file</button>
        </>
      ) : (
        <>
          <h2>Add Contact List</h2>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="listName">List Name</label>
            <input
              type="text"
              id="listName"
              name="listName"
              value={formData.listName}
              onChange={handleChange}
            />
            <label>Set Feedback List</label>
            {displayFeedback}
            <img
              className="addFeedback"
              src={require("../../images/icons/plus.png")}
              alt="+"
              onClick={addFeedback}
            />
            <p>
              To upload, first you need to <br />
              <a href="../../download/Contact List Structure.xlsx" download>
                download example file
              </a>
              <br />
              and fill it with your data.
              <br />
              <br />
              <span className="warning">Warning;</span> <br />
              Please note that every <br />
              contact name must be unique!
            </p>
            <UploadFileComponent />
            <button type="submit">Upload File</button>
          </form>
        </>
      )}
    </section>
  );
}
