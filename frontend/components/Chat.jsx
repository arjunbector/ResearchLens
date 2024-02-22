"use client";

import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const Chat = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({
    started: false,
    pc: 0,
  });

  const handleUpload = (event) => {
    setLoading(true);
    console.log(event.target.files[0]);
    if (!event.target.files[0]) {
      console.log("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    axios
      .post("/api/pdf/uploadPdf", formData, {
      },
      )
      .then((res) => {
        console.log(res);
        setFileUploaded(true);
        setLoading(false);
      })
      .catch((err) => {
        setFileUploaded(false);
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <main className="h-[65vh] w-4/5">
      <div className="flex h-full w-full justify-center items-center">
        {!fileUploaded && (
          loading ? <div className=""><Loading/></div>:
          (<input
            className="text-white file:bg-transparent file:cursor-pointer file:border-solid file:border-white file:rounded-xl m-5 file:text-white"
            placeholder="Enter your query"
            type="file"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              handleUpload(e);
            }}
          />)
        )}
      </div>
    </main>
  );
};

export default Chat;
