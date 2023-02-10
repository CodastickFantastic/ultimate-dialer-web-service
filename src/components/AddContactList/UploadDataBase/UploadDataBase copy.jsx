import { useEffect, useState, useContext } from "react";

import UploadFileComponent from "./UploadFileComponent";
import XlxsToObjContext from "../XlxsToObjContext";
import DataBaseContext from "../../../utility/contexts/DataBaseContext";

import "./UploadDataBase.scss";

export default function UploadDataBase() {
  //Form Data Values
  const [formData, setFormData] = useState({
    listName: "",
    feedbacks: ["Called", "Not answerd", "Calendar"],
  });

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

  // Display Feedbacks Form
  const [displayFeedback, setDisplayFeedback] = useState([]);
  const [updateView, setUpdateView] = useState(0);

  //Initilizing Feedbacks
  useEffect(() => {
    setDisplayFeedbackState();
  }, [updateView]);

  // Refreshing Feedbacks Section
  function setDisplayFeedbackState() {
    setDisplayFeedback(
      formData.feedbacks.map((feedback, i) => {
        return <FeedbackInput key={i} id={i} />;
      })
    );
  }

  // Component Feedback Input
  function FeedbackInput(props) {
    // Deleting Feedbacks Hanlder
    function deleteFeedback(e) {
      if (formData.feedbacks.length > 1) {
        setFormData((prevForm) => {
          let newArr = prevForm.feedbacks;
          let index = e.target.parentNode.firstChild.firstChild.name.slice(
            8,
            10
          );
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
        <div className="feedbackInputList">
          <input
            type="text"
            name={`feedback${props.id}`}
            value={formData.feedbacks[props.id]}
            onChange={handleChange}
          />
          <div className="feedbackInputType">
            <div>
              <input type="radio" name={`feedbackType${props.id}`} />
              <label>Lead</label>
            </div>
            <div>
              <input type="radio" name={`feedbackType${props.id}`} />
              <label>Called</label>
            </div>
            <div>
              <input type="radio" name={`feedbackType${props.id}`} />
              <label>No Answered</label>
            </div>
          </div>
        </div>

        <img
          className="deleteFeedback"
          src={require("../../../images/icons/minus.png")}
          alt="-"
          onClick={deleteFeedback}
        />
      </div>
    );
  }

  //Handle Add Feedback
  function addFeedback() {
    if (formData.feedbacks.length < 6) {
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
  }

  //Handle Submit
  //Database Connection
  const { uploadContactList } = useContext(DataBaseContext);
  //XLXS Object
  const { xlxsObject } = useContext(XlxsToObjContext);
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
      let date =
        nowDate.getFullYear() +
        "/" +
        (nowDate.getMonth() + 1) +
        "/" +
        nowDate.getDate();
      let firebaseObj = {
        [formData.listName]: {
          callCounter: 0,
          uploadDate: date,
          feedbackList: Object.assign({}, formData.feedbacks),
          contacts: contactList,
        },
      };
      // Upload Firebase Object to Database
      console.log(firebaseObj)
      // uploadContactList(firebaseObj);
      // setFileSend(true);
    }
  }

  //Restart Form
  const [fileSend, setFileSend] = useState(false);
  function restartForm() {
    setFormData({
      listName: "",
      feedbacks: ["Called", "Not answerd", "Calendar"],
    });

    setFileSend(false);
  }

  return (
    <section className="uploadDataBase">
      {fileSend ? (
        <div className="fileSentSuccess">
          <h2>File Send Succesfull</h2>
          <button onClick={restartForm}>Load another file</button>
        </div>
      ) : (
        <form className="uploadDataBaseForm" onSubmit={onSubmitHandler}>
          <div className="formLeft">
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
              src={require("../../../images/icons/plus.png")}
              alt="+"
              onClick={addFeedback}
            />
          </div>
          <div className="formRight">
            <UploadFileComponent />
            <button type="submit">Upload File</button>
          </div>
        </form>
      )}
    </section>
  );
}
