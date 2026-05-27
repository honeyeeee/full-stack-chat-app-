
import { AppContext, } from "../App";
import { useContext } from "react";
import{useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {Success} from "../success_page/success"


const Login=()=>{
    const navigate=useNavigate()
    const { username, setUsername, socket,email,setEmail,password,setPassword,axios,signup, setSignup} = useContext(AppContext);



     const createuser= async ()=>{
         try {

         const res=  await  axios.post('http://localhost:8800/api/users',{username,email,password})
             console.log('user created')
             navigate('/successfully_login')

         }
         catch (err) {
             console.log(err)
         }
     }

    return(
        <div className="flex flex-col justify-center items-center h-screen bg-gray-900 w-screen ">
            <div className='flex  w-full justify-end items-center gap-6 mt-6 mr-10 '>
                <h1 className='text-white text- '> If you have an account then </h1>
            <Link to="/login" className="text-black   flex  bg-white w-[100px] h-[30px] items-center justify-center p-4 rounded-4xl outline-1 outline-black hover: text-blue-500  not-hover:text-black transit ">login</Link>

            </div>


        <div className="flex flex-col justify-center gap-5 items-center h-screen bg-gray-900 w-screen ">

            <input type="text" placeholder="username" className="w-400px h-30px outline-none p-3 bg-transparent border-2 border-white text-white text-2xl " onChange={(e)=>{
                setUsername(e.target.value)

            }}/>
            <input type="text" placeholder="email..." className="w-400px h-30px outline-none p-3 bg-transparent border-2 border-white text-white text-2xl " onChange={(e)=>{
                setEmail(e.target.value)
            }}/>

            <input type="text" placeholder="Password" className="w-400px h-30px outline-none p-3 bg-transparent border-2 border-white text-white text-2xl " onChange={(e)=>{
                setPassword(e.target.value)

            }}/>
            <button onClick={()=>{

           createuser()


            }} className="bg-white text-black w-100px h-30px rounded-md w-[200px] h-[30px] ">Join</button>
        </div>
        </div>
    )
}
                // socket.current.emit('join', username)
                // navigate('/chat')

export default Login