'use client';

import { useState } from 'react';
import axios from 'axios';
import Loading from './Loading';
import Chat from './Chat';

const Upload = ({ chatArray, query, data }) => {
  const [fileUploaded, setFileUploaded] = useState(true);
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
      console.log('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    axios
      .post('http://127.0.0.1:5000/uploadpdf', formData, {})
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
        {!fileUploaded ? (
          loading ? (
            <div className="">
              <Loading />
            </div>
          ) : (
            <form action="http://127.0.0.1:5000/uploadpdf" method="post" enctype="multipart/form-data">
              <label for="file">Upload PDF:</label>
              <input type="file" name="file" id="file" accept=".pdf" onChange={handleUpload}/>
              {/* <input type="submit" value="submit" /> */}
            </form>
          )
        ) : (
          <Chat chatArray={chatArray} query={query} data={data}/>
        )}
      </div>
    </main>
  );
};

export default Upload;
