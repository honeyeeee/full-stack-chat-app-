
import { AppContext, } from "../App";
import {useContext, useEffect} from "react";

const Chat = () => {
    const { username, users ,socket ,setMessage,message,send,reciver,setReciver ,messages,type,setType,clicked,typing,indi,setIndi,stoppedTyping,calindi,setName ,name,axios ,setUsername,setUsers} = useContext(AppContext);



    useEffect(  ()=>{
const findme=async ()=>{
    const res= await axios.get('http://localhost:8800/api/data',{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })
    if(res.data){
        console.log('data found')
        console.log(res.data.user.name)
        // setUsers(res.data.user.name)
        const name = res.data.user.name
        setUsername(name)
        socket.current.emit('join', name)

        console.log(username)
        // setUsers(res.data.user.name)
        console.log(users)
    }
    console.log(res.data)

}
    findme()


},[])
// console.log(data.data)






 const rooms =[username,name].sort().join("-");
 setReciver(rooms)

    // console.log( 'this is from chat ', roomRef.current );
    // console.log(messages)
    // },[username,name])

return  <div className='grid place-items-center grid-cols-[34%_66%] w-full h-full' >
<div className="flex flex-col  gap-5 justify-center items-center h-screen bg-gray-900 w-full  ">
    {users.map((user,index)=><div key={index}> <p className=' w-full py-2 text-center rounded-xl bg-gray-600 text-white p-11' onClick={()=>{
        const rooms = [username,user].sort().join("-");
        setReciver(rooms)
        console.log([username,user])
        console.log(user)
        console.log(username)


    setName(user)
        clicked(username,user)
    }}>{user}</p></div>)}

</div >

    <div className="bg-gray-400  h-screen flex justify-center items-center w-full flex-col">
        <h1 className="text-center text-2xl cpaitalize">
            hello <b className='text-2xl capitalize'>{username}</b> you are now connected with <b className='text-2xl capitalize'>{name}</b>
        </h1>
        <p>
            {!type ? indi: calindi}
        </p>
        <div className="flex flex-col w-full gap-5  h-full overflow-y-scroll">

            {(messages[reciver] || []).map((msg, index) => (
                <div key={index} className={`flex gap-6    w-full ${msg.username === username ? 'justify-end' : 'justify-start'}`} >
                    <div className=" px-4 py-2 bg-white rounded-lg shadow-md m-3 max-w-[30%] ">
                        <b>{msg.username}</b>
                        <p>{msg.message}</p>
                    </div>
                </div>
            ))}


        </div>

        <div className="flex justify-center items-center gap-5 w-full mb-5 ">
            <input 
            value={message}
            onBlur={()=>{
                 
              setType(false)
                stoppedTyping()

            }} 
             onChange={(e)=>{

                setType(true)
                setMessage(e.target.value)
                typing()

            }} type="text" className="w-[70%] h-10 p-3 border-2 border-black rounded-md outline-none   self-baseline" placeholder="message..." />


              <button className="bg-black text-white w-[20%] h-10 rounded-md" onClick={()=>{
                send()
                  stoppedTyping()
                  setMessage('')
                  
            }}>Send</button>
        </div>
    </div>


</div>
}
export default Chat