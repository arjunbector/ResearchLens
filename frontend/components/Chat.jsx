const Chat = ({ chatArray, query }) => {
  const chat = chatArray.map((ele, idx) => {
    return (
      <>
        <div className="w-full flex justify-end text-right">
          <div className="p-2 bg-blue-500 rounded-lg">{ele.q}</div>
        </div>
        <div className="w-full flex justify-start">
          <div className="p-2 bg-slate-600 rounded-lg my-1">{ele.a}</div>
        </div>
      </>
    );
  });

  return (
    <section className="h-[65vh] w-4/5 overflow-y-scroll">
      <div className="flex flex-col h-full w-full justify-end  items-start">
        {chat}
      </div>
    </section>
  );
};

export default Chat;
