import { useState, useContext } from "react";
import XlxsToObjContext from "../../utility/contexts/XlxsToObjContext";

export default function UploadFileComponent() {
  const { setUploadedFile } = useContext(XlxsToObjContext);

  // Drop File Handling
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(false);

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handling Transformation XLXS to Object
      setUploadedFile(e.dataTransfer.files[0]);
      if (
        e.dataTransfer.files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setUploadedFileName(e.dataTransfer.files[0].name);
      } else {
        setUploadedFileName("Invalid File Type, download example file.");
      }
    }
  }

  function handleChange(e) {
    e.preventDefault();
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      // Handling Transformation XLXS to Object
      setUploadedFile(e.target.files[0]);
      if (
        e.target.files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setUploadedFileName(e.target.files[0].name);
      } else {
        setUploadedFileName("Invalid File Type, download example file.");
      }
    }
  }

  return (
    <>
      <label
        htmlFor="uploadFile"
        className={
          dragActive ? "customFileUpload drag-active" : "customFileUpload"
        }
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploadedFileName
          ? uploadedFileName
          : "Click here to upload file or drop it in the area"}
      </label>
      <input
        type="file"
        id="uploadFile"
        name="uploadFile"
        multiple={false}
        onChange={handleChange}
      />
    </>
  );
}
