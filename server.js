// Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");
const app = express();

const url = "https://api.openweathermap.org/data/2.5/forecast?";

const api_key = process.env.api_key;

const { PORT = 3001 } = process.env;

// MiddleWare

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes

app.post("/weather", async (req, res) => {
    console.log(req.body);
    try {
        const response = await axios.get(
            `${url}lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${api_key}`
        );
        console.log(response.data);
        res.json(response.data);
        // const response = await fetch(
        //     `${url}lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${api_key}`
        // );
        // const data = await response.json();
        // console.log(data);
        // res.json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Listener

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
