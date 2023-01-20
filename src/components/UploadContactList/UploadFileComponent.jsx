import { useState } from "react";

export default function UploadFileComponent() {
  let uploadedFile; // Variable for XML to JSON conversion

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
      // Handling Transformation XML to Object
      uploadedFile = e.dataTransfer.files[0]
      console.log(uploadedFile)
      console.log(e.dataTransfer.files[0].name);
      setUploadedFileName(e.dataTransfer.files[0].name);
      // Write here file handling !!!!!!!!!!!!!!!!!!!!!!!!
    }
  }

  function handleChange(e) {
    e.preventDefault();
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0].name);
      setUploadedFileName(e.target.files[0].name);
      // Write here file handling !!!!!!!!!!!!!!!!!!!!!!!!
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
