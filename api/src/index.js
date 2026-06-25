import express from "express";
const app = express();
const PORT = 3000;
app.get("/", (req,res) => {
    res.send("Hellur :");
})
app.listen(PORT, ()=> {
    console.log("Listening");
})

app.get("/games", (req,res) => {
    
})