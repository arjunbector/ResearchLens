"use client";
import Upload from "@/components/Upload";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { get } from "mongoose";

const page = () => {
  const [query, setQuery] = useState("");
  const [chatArray, setChatArray] = useState([{ q: "Hello", a: "Hi"}]);

  const getResponse = (query) => {
    fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key:10, query: query}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newArray = [...chatArray];
        if (newArray.length === 0) {
          newArray.push({ q: query, a: data.data });
          setChatArray(newArray);
        } else {
          newArray[newArray.length - 1].a = data.data;
          setChatArray(newArray);
        }
      })
      .catch(err=>{
        console.log(err);
      });
  };
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const newArray = [...chatArray];
      newArray.push({ q: query, a: "" });
      setChatArray(newArray);
      getResponse(query);
    }
  };
  return (
    <main className="bg-[#212121] min-h-screen flex flex-col w-ful">
      <Navbar />
      <div className="flex justify-center px-10 pt-10">
        <Upload chatArray={chatArray} query={query} />
      </div>
      <div className="w-full my-10 flex justify-center">
        <input
          className="h-10 w-4/5 bg-transparent border border-white px-2 rounded-xl text-white"
          type="text"
          placeholder="Enter your query here..."
          value={query}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />
      </div>
    </main>
  );
};

export default page;
