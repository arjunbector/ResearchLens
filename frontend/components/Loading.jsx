import ReactLoading from 'react-loading';
const Loading = () => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
         <ReactLoading type={"balls"} color={"white"} height={30} width={30} />
    </div>
  )
}

export default Loading
