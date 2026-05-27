const router = require('express').Router();
const schema = require('./schema');
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken')
const mdb = require('./msg_schema')


// jsontoken !!!
const jwt = ({name , _id})=>{
    const take = token.sign({name , _id},'secretkey',{expiresIn:'1h'})
    return take;
}

// middleware >>>>>>>>>

// password encryption!!!!!!
const haspassword = async (req,res,next)=>{
    const {password} = req.body;
    const crypt = await bcrypt.hash(password,12);
    req.body.password = crypt;
    next();
}

// const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            error: "please authenticate"
        });
    }

    try {
        const splits = authHeader.split(' ')[1]; 
        const data = token.verify(splits, 'secretkey');
        req.user = data;
        next();
    } catch (error) {
        return res.status(401).json({
            error: "invalid token"
        });
    }
};


// routs>>>>>>>>>

router.post('/api/users', haspassword ,async (req,res) =>
    {
        if(!req.body.username || !req.body.email || !req.body.password){
            return res.status(400).json({
                error:"please fill all the fields"
            })
        }
        const users = await schema.create({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
        })
        res.json({
            message:"user created successfully",
            users
        });
    }
)

router.post('/api/login',async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json(
            {
                error:"please fill all the fields"
            }
        )
    }

        const user = await schema.findOne({email})
    if(!user){
        return res.status(400).json({
            error:"user not found"
        })}

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        res.status(400).json({
            message:"invalid credentials"
        })
    }
    const token = jwt({name:user.username,_id:user._id});

    res.json({
        message:"user logged in successfully",
        token,
        user:{
            name :user.name,
            email:user.email,

        }
    });
})

router.get('/api/data',isAuth,async (req,res)=>{
    res.json({
        message:"user fetched successfully",
        user:req.user
    })

    ;
})

router.get('/api/message/:rooms',isAuth,async(req,res)=>{
try {
     const rooms = req.params.rooms
    const message= await mdb.find({
        room:rooms
    }).sort({createdAt:1})

    res.status(200).json(message)
    
} catch (error) {
    res.status(404).send(error)
}
   
}



   


)
module.exports = router;