import Image from "next/image";
import image from "C:/Users/harsh/Desktop/researchlens/context_image1.png"
const Chat = ({ chatArray, query , data}) => {
  const chat = chatArray.map((ele, idx) => {
    return (
      <>
        <div className="w-full flex justify-end text-right p-2">
          <div className="p-2 bg-blue-500 rounded-lg">{ele.q}</div>
        </div>
        <div className="w-full flex justify-start">
          <div className="p-2 bg-slate-600 rounded-lg my-1">{ele.a}</div>
        </div>
        {data?.data[0] &&   <Image src={image} height={400} width={400}/>}
      </>
    );
  });

  return (
    <section className="h-[80vh] w-4/5">
      <div className=" h-[90%] w-full overflow-y-auto">{chat}</div>
    

    </section>
  );
};

export default Chat;
