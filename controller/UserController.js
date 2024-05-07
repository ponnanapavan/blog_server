
import bcrypt from 'bcryptjs'
import User from '../model/Usermodel.js';
import generateToken from '../security/genrateToken.js';


const  signup=async(req,res)=>{
    const {username, password}=req.body;
    try{
            const exitusername=await User.findOne({username});
            if(exitusername){
                return res.status(400).json({error:'user already exists'});
            }
            const gensalt=await bcrypt.genSalt(10);
            const hashedpassword=await bcrypt.hash(password, gensalt);
            const newUser=new User({
                username,
                password:hashedpassword
            })
                if(!newUser){
                    return res.status(400).json({error:'sign up not successfull'});
                }
                    await newUser.save();
                    generateToken(newUser._id, res);
                    res.status(200).json(newUser);    
                       

    }catch(err){
        res.status(500).json({error:"server internal error"})
    }

}


async function login(req,res){
    const {username,password}=req.body;
    try{
          const checkUser=await User.findOne({username});
          if(!checkUser){
            return res.status(400).json({error:"user not found"});
          }
          const checkpassword=await bcrypt.compare(password,checkUser.password)
           if(!checkpassword)
           {
            return res.status(400).json({error:"password is wrong"});

           }
              if(checkUser && checkpassword)
              {
                generateToken(checkUser._id, res);
                 res.status(200).json(checkUser);
              }
    }catch(err)
    {
       res.status(500).json({error:err.message});

    }
}


async function logout(req,res){
    try{
        res.cookie("jwttoken" ,'', {maxAge:1})
        res.status(200).json({message:"User logged out suucessfuly"})
}catch(err){
   res.status(500).json({error:err.message});
}
}

export {signup, login, logout};