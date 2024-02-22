"use client";

import { useState } from "react";

const Chat = () => {
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleUpload = (event) => {
    setFileUploaded(true);
    console.log(event.target.files[0]);
    console.log("Uploading file");
  };
  return (
    <main className="h-[90vh] w-4/5 border-white border-solid border rounded-2xl">
      <div className="flex h-full w-full justify-center items-center">
        {!fileUploaded && (
          <input
            className="text-white file:bg-transparent file:border-solid file:border-white file:rounded-xl m-5 file:text-white"
            placeholder="Enter your query"
            type="file"
            onChange={handleUpload}
          />
        )}
      </div>
    </main>
  );
};

export default Chat;
