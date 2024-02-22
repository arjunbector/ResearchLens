"use client";

import { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState({
    started: false,
    pc: 0,
  });

  const handleUpload = (event) => {
    console.log(event.target.files[0]);
    if (!event.target.files[0]) {
      console.log("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    setProgress(prev=>{
      return {...prev, started: true}
    
    })
    axios
      .post("/api/pdf/convert", formData, {
        onUploadProgress: (progressEvent) => {
          console.log(
            `Upload Progress: ${Math.round(
              setProgress(prev=>{
                return {...prev, pc: (progressEvent.loaded / progressEvent.total) * 100}
              })
            )}%`
          );
        },
      },
      )
      .then((res) => {
        console.log(res);
        setFileUploaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main className="h-[90vh] w-4/5 border-white border-solid border rounded-2xl">
      <div className="flex h-full w-full justify-center items-center">
        {!fileUploaded && (
          <input
            className="text-white file:bg-transparent file:border-solid file:border-white file:rounded-xl m-5 file:text-white"
            placeholder="Enter your query"
            type="file"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              handleUpload(e);
            }}
          />
        )}
      </div>
        <p>{progress.pc}</p>
    </main>
  );
};

export default Chat;
