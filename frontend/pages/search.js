'use client';
import Upload from '@/components/Upload';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { IoMdSend } from "react-icons/io";
import { get, set } from 'mongoose';

const page = () => {
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState('en');
  const [chatArray, setChatArray] = useState([]);
  const [data, setData] = useState(null);

  const getResponse = (query, newArray) => {
    console.log('arrayyyy', newArray);
    fetch('http://127.0.0.1:5000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 101, query: query, language: lang }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        if (newArray.length === 0) {
          console.log('new array');
          newArray.push({ q: query, a: data.data[0] });
          setChatArray(newArray);
        } else {
          console.log('old array');
          newArray[newArray.length - 1].a = data.data[0];
          setChatArray(newArray);
        }
        setQuery('');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newArray = [...chatArray];
      newArray.push({ q: query, a: '' });
      console.log(newArray);
      setChatArray(newArray);
      getResponse(query, newArray);
    }
  };
  const handleLangChange = (event) => {
    setLang(event.target.value);
  }
  return (
    <main className="bg-[#212121] min-h-screen flex flex-col w-ful">
      <Navbar />
      <div className="flex justify-center px-10 pt-10">
        <Upload chatArray={chatArray} query={query} data={data} />
      </div>
      <div className="w-full my-10 flex justify-center">
        <input className="h-10 w-2/3 bg-transparent border border-white px-2 rounded-xl text-white" type="text" placeholder="Enter your query here..." value={query} onChange={handleInputChange} onKeyUp={handleKeyPress} />
       
        <label className='flex items-center justify-center font-bold p-2' for="cars">Choose language:</label>

        <select className='text-black form:p-2' name="lang" id="lang" onChange={handleLangChange}>
          <option value="en" selected>English</option>
          <option value="fr">French</option>
          <option value="hi">Hindi</option>
          <option value="ta">Tamil</option>
          <option value="te">Telgu</option>
        </select>
      </div>
    </main>
  );
};

export default page;
