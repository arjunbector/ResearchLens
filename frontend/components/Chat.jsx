import { useState } from "react";

const Chat = ({ userQuery }) => {
  const [chatArray, setChatArray] = useState([
    {
      q: "Hello",
      a: [
        ["t", "Hi, how can I help you?"],
        ["t", "This is the second line."],
      ],
    },
  ]);
  const chat = chatArray.map((ele, idx) => {
    const ansArr = ele.a?.map((ans) => {
      if (ans[0] === "t") {
        return (
          <div className="w-full flex justify-start">
            <div className="p-2 bg-slate-600 rounded-lg my-1">{ans[1]}</div>
          </div>
        );
      }
    });
    return (
      <>
        <div className="w-full flex justify-end text-right">
          <div className="p-2 bg-blue-500 rounded-lg">{ele.q}</div>
        </div>
        {ansArr}
      </>
    );
  });

  return (
    <section className="h-[65vh] w-4/5">
      <div className="flex flex-col h-full w-full justify-end  items-start">
        {/* <div className="w-full flex justify-end text-right">
          <div className="p-2 bg-blue-500 rounded-lg">{chatArray[0].q}</div>
        </div>
        <div className="w-full flex justify-start">
          <div className="p-2 bg-slate-600 rounded-lg">{chatArray[0].a}</div>
        </div> */}
        {chat}
      </div>
    </section>
  );
};

export default Chat;
