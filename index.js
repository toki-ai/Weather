import express from "express"; 
import axios from "axios"; 
import bodyParser from "body-parser";

const app = express();
const port = 3000; 

app.use(bodyParser.urlencoded ({extended: true}));

const API_URL = "http://api.weatherstack.com/current";
const apiKey = "b009db1e90dbc715fb1246de36a7e4e8"; 

app.get("/", (req, res)=> {
    res.render("index.ejs");
});

app.post("/submit", async(req, res)=> { 
    const location = req.body.diachi;
    try {
        const respone = await axios.get(API_URL + "?access_key=" + apiKey + "&query=" + location);
        res.render("index.ejs", {content: respone.data});
    } catch (error){
        console.log(error.message); 
        res.render("index.ejs", {content: "error" + error.message});
    }
});

app.listen(port, ()=>{
    console.log(`Your server already in port.`);
});