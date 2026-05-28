
const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.listen(5000,()=>{console.log("Server is running.....")})
app.get("/",(req,res)=>{
    res.send("Backend is working")
});
var users = {email:"123@gmail.com",phone:"1234567890",password:"123"}

app.post("/",async (req,res)=>{
    const {user,password}=req.body
     const existingUser=users.some(u => (u.email === user || u.phone === user) && u.password === password);
    if(existingUser){
        res.send(true)
    } else {
        res.send(false)
    }
})

app.post("/sign",async(req,res)=>{
    const {user,password}=req.body
      const alreadyexists = users.some(u => u.email === user || u.phone === user);
    if(alreadyexists){
        res.send(false)
    }else{
 users.push({email:user, phone:user, password})
    res.send(true)
    console.log("New user created")
    }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});