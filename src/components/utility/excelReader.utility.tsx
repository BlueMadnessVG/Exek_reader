import { useCallback, useState } from "react";
import { useExcelStore } from "../global/excel.store";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import FileIcon from "../../assets/icons/file.icon";
import SaveIcon from "../../assets/icons/save.icon";

import excelIcon from "../../assets/icons/excel_icon.png";

// Define a type for parsed data
type ParsedData = { [key: string]: any };

function ExcelReader() {
  const { data, setData, setKeys } = useExcelStore((state: any) => state);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file: any) => {
        // Check if file name already exists in data
        const fileExists = Object.keys(data).includes(file.name);
        if (fileExists) {
          // If file exists, remove it from the list of file names
          setFileNames((prev) => prev.filter((name) => name !== file.name));
        }

        // Add the file name to the list of file names
        setFileNames((prev) => [...prev, file.name]);

        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has an error");
        reader.onload = (event) => {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          if (arrayBuffer) {
            // Convert ArrayBuffer to binary string
            const data = new Uint8Array(arrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            let sheetName = workbook.SheetNames[0].trim(); // Trim spaces from sheet name
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json<ParsedData>(sheet);

            // Extract, trim, and normalize keys from the first row of parsed data
            const keys =
              parsedData.length > 0
                ? Object.keys(parsedData[0]).map((key) => key.trim())
                : [];

            console.log(workbook.Sheets[sheetName]);
            // Update store with data and keys
            setData(file.name, parsedData);
            setKeys(keys);
          }
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [data]
  );

  const { getRootProps, acceptedFiles, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  return (
    <>
      <div className="flex flex-col w-[20%] border border-zinc-600 rounded-sm  p-2 overflow-x-hidden gap-4">
        <h1 className="text-white font-semibold">
          INGRESE LOS EXCEL A COMPARAR
        </h1>
        <div
          className="flex justify-center items-center pb-1 border border-dashed rounded-sm border-zinc-600 h-[13%] overflow-hidden"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <h1 className="text-zinc-600 font-semibold flex items-center truncate">
              <SaveIcon />
              Drop your files here
            </h1>
          ) : (
            <h1 className="text-zinc-600 font-semibold flex flex-col items-center truncate">
              <FileIcon />
              Drop your files here
            </h1>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {fileNames.map((name) => (
            <div
              key={name}
              className="flex flex-row items-center gap-4 bg-zinc-700/60 p-2 rounded-sm text-white"
            >
              <picture className="flex w-8 h-8">
                <img src={excelIcon} alt="" className="w-full h-full" />
              </picture>
              <h1 className="text-sm font-semibold truncate"> {name} </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default ExcelReader;
