
import { motion } from "framer-motion"
import {Link} from 'react-router-dom'
const Success = () => {
  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">

      <motion.div
        initial={{ y:100,opacity:0 }}
        animate={{ y:0,opacity:1}}
        transition={{ duration: 1 }}
        className="w-screen h-screen bg-blue-500  flex justify-center items-center flex-col"
      >
        <Link to="/login" className="text-black   flex  bg-white w-[100px] h-[30px] items-center justify-center p-4 rounded-4xl outline-1 outline-black hover: text-blue-500 hover:text-black transit  ">login</Link>

         <motion.h1 className="text-white text-5xl font-bold p-8 self-center text-center"
         initial={{opacity:0,y:-200,scale:0.6}}
         animate= {{opacity:1,y:1,scale:1}}
         transition={{ delay: 1, duration: 1 }}
         >
          

          Account created successfully
        </motion.h1>
      </motion.div>

    </div>
  )
}

export default Success

