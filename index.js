const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const SECRET_KEY = "HeyMyNameIsKarthikAkulaSriRamSaiKarthi"
const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/Marksentry",{useNewUrlParser:true});

const FacultyDetails = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    phone_number:String,
    facStat:String,
    dept:String,
})

const User =  mongoose.model('User',FacultyDetails);
app.post("/register",(req,res)=>{
    const password = req.body.password;
    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if(err){
            console.log("Error in hasing password");
        }
        else{
            const newUser = new User({
                username:req.body.username,
                email:req.body.email,
                password: hash,
                phone_number:req.body.phonenumber,
                facStat : req.body.facuStat,
                dept : req.body.dept,
            }    
            )
            newUser.save(
                res.json(newUser),
            )
        }
    })
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email }).then((userfound) => {
        if (!userfound) {
            res.status(404).json("User Not Found");
        } else {
            const hashedPassword = userfound.password;
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) {
                    console.log("Password error");
                } else {
                    if (result) {
                        const token = jwt.sign({ email: userfound.email }, SECRET_KEY, { expiresIn: '1h' });
                        res.json({ message: "Success", token: token });
                    } else {
                        res.json("Login Failed");
                    }
                }
            });
        }
    });
});
    
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/home', authenticateJWT, (req, res) => {
    res.json("logintohome");
});
app.listen(4000,()=>{
    console.log("server is running");
})