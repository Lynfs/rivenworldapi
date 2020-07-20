const express = require('express');
const mongoose = require('mongoose');
const app = express();

require("../models/hero");
const Hero = mongoose.model('hero');

app.use(express.json());

mongoose.connect('mongodb://localhost/learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("sucessfull connection");
}).catch((erro) => {
    console.log("failed to connect");
});

app.get('/',(req,res ) => {
    return res.json({message: 'Default page'});
});

app.post('/hero',(req,res ) => {
    const hero = Hero.create(req.body, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "cadastro falhou"
        })

        return res.status(200).json({
            error: false,
            message: "cadastro sucess"
        })
    })
});

app.get("/matchup/:name", (req, res) => {
    Hero.findOne({name:req.params.name}).then((matchup)=> {
        return res.json(matchup);
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "matchup not found"
        });
    });
    //return res.json({id: req.params.name});
});

app.listen(3000);