import {useContext} from "react";
import {AppContext} from "../App.jsx";
import axios from "axios";

import {useNavigate} from "react-router-dom";




const Log=()=>{
        const navigate = useNavigate()
const {logpassword,logusername, setLogUsername ,setLogPassword , socket ,username ,setUsername , axios}=useContext(AppContext)
    const login= async ()=>{
    try{
        const res=  await axios.post('http://localhost:8800/api/login',

            {email:logusername,password:logpassword})
        console.log(res.data)

        if(res.data){
            navigate('/chat')
            localStorage.setItem('token',res.data.token)
            // setUsername(res.data.user.name)
            console.log(res.data.user.name)
            console.log('login success')
        }

    }
    catch (err)
        {
console.log(err)
    }

    }

    return(
        <div className="h-screen w-screen text-white text-2xl bg-gray-900 flex justify-center items-center flex-col gap-5 ">
      <input className=' w-400px h-30px outline-none p-3 bg-transparent border-2 border-white text-white text-2xl rounded-4xl ' type="text" placeholder="username" onChange={(e)=>{
          setLogUsername(e.target.value)
      }}/>
      <input className=' w-400px h-30px outline-none p-3 bg-transparent border-2 border-white text-white text-2xl rounded-4xl ' type="text" placeholder="Password" onChange={(e)=>{
          setLogPassword(e.target.value)
      }}/>
            <button className="bg-white text-black w-100px h-30px  w-[200px] h-[40px]  flex items-center justify-center rounded-4xl " onClick={
                ()=>{
                    login()
                }
            }>login</button>
        </div>
    )
}
export default Log