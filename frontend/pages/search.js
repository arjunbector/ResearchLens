"use client";
import Upload from "@/components/Upload";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const page = () => {
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      
    }
  };
  return (
    <main className="bg-[#212121] min-h-screen flex flex-col w-ful">
      <Navbar />
      <div className="flex justify-center px-10 pt-10">
        <Upload />
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
