"use client";
import Chat from "@/components/Chat";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
    const handleInputChange = (event) => {
    }
  return (
    <main className="bg-[#212121] min-h-screen flex flex-col w-ful">
      <Navbar />
      <div className="flex justify-center px-10 pt-10">
        <Chat />
      </div>
      <div className="w-full my-10 flex justify-center">
        <input
          className="h-10 w-4/5 bg-transparent border border-white px-2 rounded-xl text-white"
          type="text"
          placeholder="Enter your query here..."
          onChange={handleInputChange}
        />
      </div>
    </main>
  );
};

export default page;
