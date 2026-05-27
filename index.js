const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// DB connected to backend server
mongoose.connect("mongodb://127.0.0.1:27017/netflix-login").then(()=>{console.log("DB attached sucessfully")})
.catch(()=>{console.log("DB failed to connect")})
//model attachment for collections
const users = mongoose.model("user",{email:String,phone:String,password:String},"user")
users.find().then((retdata)=>{
    console.log(retdata)
})

app.listen(5000,()=>{console.log("Server is running.....")})
app.get("/",(req,res)=>{
    res.send("Backend is working")
});


app.post("/",async (req,res)=>{
    const {user,password}=req.body
    const existingUser=await users.findOne({$or:[{email : user} ,{ phone : user}], password : password});
    if(existingUser){
        res.send(true)
    } else {
        res.send(false)
    }
})

app.post("/sign",async(req,res)=>{
    const {user,password}=req.body
    const alreadyexists =await users.findOne({$or:[{email:user},{phone:user}]});
    if(alreadyexists){
        res.send(false)
    }else{
   await users.create({email:user, phone:user, password})
    res.send(true)
    console.log("New user created")
    }
    console.log("Current users:", users);
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});