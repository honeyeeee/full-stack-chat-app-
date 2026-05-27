import  {useEffect, useRef,createContext, useState} from "react";
import {io} from "socket.io-client";
import Chat from "./chatpage/chat.jsx";
import axios from 'axios'
import Log from "./log_in/login.jsx";
export const AppContext = createContext();
import{BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./signup/username.jsx";

const App = () => {
    const socket=useRef()
    // signup page >>>>>

    const [signup, setSignup] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // login page >>>>>
    const [logusername, setLogUsername] = useState('')
    const [logpassword, setLogPassword] = useState('')


    // chat page >>>>>
    const [username, setUsername] = useState('')
    const [calindi,setCalindi] = useState(' ')
const [type,setType]=useState(false)
    const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
    const [messages, setMessages] = useState({})
    const [name,setName]=useState('')
const[indi,setIndi]=useState('')
    const [reciver,setReciver]=useState('')


    const send=()=>{
        socket.current.emit('send', {message,username,name})
        setMessage('')
    }



const clicked=(ap,bp)=>{
        socket.current.emit('private-chat',{ap,bp})
}

const typing=()=>{
        socket.current.emit('typing',{username})
}
const stoppedTyping=()=>{
        socket.current.emit('stop typing',{username})
}

    useEffect(()=>{
 socket.current = io("http://localhost:8800");
        console.log(username)

        socket.current.on('user-connected', (data)=>{
            console.log(data)
            setUsers(data)
            }
        )




        socket.current.on('private-msg', (data)=>{

            console.log('private',data)
            const room = [data.data.ap,data.data.bp].sort().join('-')

            let neo =  data.find.map(msg=>msg.message)
           let add = data.find
          console.log(room)
            console.log(`private data from db hai : `,add)
            setMessages(prev => ({

    ...prev,

    [room]: add

}))
            console.log(messages)
             

            
        })


socket.current.on('typing-msg', (data)=>{
    console.log(`${data} is typing`)
    setIndi(data + ' is typing...')

})

socket.current.on('get',async (data)=>{
            console.log(data)
            let mess = await data.db.map(a=> {
                return {
                    message:a.message,
                    room:a.room,
                    username:a.username,
                    timestamps:a.timestamps
                }
            })

            console.log(mess)
        
            setMessages(prev => {
                const updated = {
                    ...prev,
                    [data.room]: [...(prev[data.room] || []), data]
                };

                console.log("UPDATED:", updated[data.room]);

    return updated;
            });
        })




socket.current.on('stop typing-msg', (data)=>{
    console.log(`${data} stopped typing`)
    // setIndi('')
    setType(true)
    calindi('')
})

        return () => {
            socket.current.off('message');   
            socket.current.disconnect();     
        };
    },[])

useEffect(() => {

    console.log(messages)

}, [messages])


    return (
        <AppContext.Provider  value={{username, setUsername,socket ,setUsers,users ,message, setMessage,send,messages , name,setName,clicked,typing ,setType,type ,indi ,setIndi,stoppedTyping ,calindi,reciver,setReciver ,email,setEmail,password,setPassword,axios,logpassword,logusername, setLogUsername ,setLogPassword , signup, setSignup}}>
   <BrowserRouter>
       <Routes>
           <Route path="/" element={<Login/>}/>
           <Route path="/chat" element={<Chat/>}/>
           <Route path="/login" element={<Log/>}/>
       </Routes>
   </BrowserRouter>
        </AppContext.Provider>
    )
}
export default App
