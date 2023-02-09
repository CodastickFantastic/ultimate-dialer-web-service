import "./UploadInstruction.scss";

export default function UploadInstruction() {
  return (
    <section className="uploadingInstruction">
      <div className="uploadStep">
        <h2>Step I</h2>
        <p>Download example file</p>
        <a href="../../../download/Contact List Structure.xlsx" download>
          <img
            src={require("../../../images/icons/download.png")}
            alt="Download example file"
          />
          Download File
        </a>
      </div>
      <div className="uploadStep">
        <h2>Step II</h2>
        <p>Fill up the file with your data.</p>
        <p className="important">Important Notes</p>
        <ul>
          <li>Each name must be unique</li>
          <li>Numbers cannot containt "-", "+" and other special characters</li>
          <li>Avoid blank rows</li>
        </ul>
      </div>
      <div className="uploadStep">
        <h2>Step III</h2>
        <p>
          Fill the list description and upload file. Right now you can login to
          your application and start calling.
        </p>
        <img src={require("../../../images/icons/check.png")} />
      </div>
    </section>
  );
}
