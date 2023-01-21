import { createContext, useState, useEffect } from "react";
import readXlsxFile from "read-excel-file";

const XlxsToObjContext = createContext();

export function XlxsToObjContextProvider(props) {
  //Variables For XLXS to JSON Conversion
  const [uploadedFile, setUploadedFile] = useState(null);
  const [xlxsObject, setXlxsObject] = useState(null);

  //Conversion XLXS to JSON
  useEffect(() => {
    if (
      uploadedFile &&
      uploadedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      readXlsxFile(uploadedFile).then((rows) => {
        const columnNames = rows.shift();
        const objs = rows.map((row) => {
          const obj = {};
          row.forEach((cell, i) => {
            obj[columnNames[i]] = cell;
          });
          return obj;
        });
        setXlxsObject(objs);
      });
    }
  }, [uploadedFile]);

  return (
    <XlxsToObjContext.Provider value={{ xlxsObject, setUploadedFile }}>
      {props.children}
    </XlxsToObjContext.Provider>
  );
}

export default XlxsToObjContext;
