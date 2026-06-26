
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// --- USERS ---
const users = {
  mehul: { password: "admin123", role: "HEAD" },
  abhishek: { password: "manager123", role: "HEAD" },
  nitesh: { password: "crm123", role: "MANAGER" }
};

// --- DATA (can replace later) ---
let customers = [
  {id:1, flat:"1A-101", name:"Customer 1", stage:"Payment Pending"},
  {id:2, flat:"1A-102", name:"Customer 2", stage:"Possession Completed"}
];

let remarks = [];

// --- SERVE UI ---
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// --- LOGIN ---
app.post("/login",(req,res)=>{
  const {user,pass} = req.body;
  if(users[user] && users[user].password === pass){
    return res.json({role: users[user].role, user});
  }
  res.status(401).send("Invalid");
});

// --- DATA ---
app.get("/data",(req,res)=>res.json(customers));

// --- REMARKS ---
app.post("/remark",(req,res)=>{
  const {id,text,user} = req.body;
  remarks.push({id,text,user,date:new Date().toLocaleString()});
  res.send("ok");
});

app.get("/remarks/:id",(req,res)=>{
  res.json(remarks.filter(r=>r.id == req.params.id));
});

// --- PORT ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("Running on " + PORT));
