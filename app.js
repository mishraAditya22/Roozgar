require('dotenv').config()
//process.env
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var encrypt = require("mongoose-encryption");
const ejs = require("ejs");
const session = require("session");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/RoozGaar" , {useNewUrlParser:true})

const AccountDataSchema = new mongoose.Schema({
    userName : {
        type : String ,
        required :true
    },
    passWord : {
        type : String ,
        required : true
    }
    ,
    Fname : String ,
    Lname : String ,
    phone_no : Number,
    email : String,
    Address : 
        {
            country : String ,
            state : String ,
            city : String ,
            postalCode : Number,
            landMark  : String ,
            address : String 
        }
});

const Account = new mongoose.model("Account",AccountDataSchema);

app.get("/",(req,res)=>{
    res.render("home");
});

app.route("/login")
    .get((req,res)=>{
        res.render("login");
    })
    .post((req,res)=>{
        var username = req.body.UserId;
        var password = req.body.Password;
        console.log(username);
        console.log(password);
        Account.findOne({userName : username},(err,foundUser)=>{
            if(foundUser){
                if(foundUser.userName===username && foundUser.passWord===password){
                    res.redirect("contact");
                }
            }
            else{
                console.log("user not found");
                res.redirect("login");
            }
        });
    })

app.route("/register")
    .get((req,res)=>{
        res.render("register");
    })
    .post((req,res)=>{
        let userid = req.body.UserId;
        let password = req.body.Password;
        // console.log(userid);
        // console.log(password);
        const user = new Account({
            userName : userid,
            passWord : password
        });
        
        Account.findOne({userName : userid},(err,foundUser)=>{
            //if user is already registered
            if(foundUser){
                if(foundUser.userName===userid){
                    res.redirect("register");
                }
            }
            else{
                user.save((err)=>{
                    if(!err){
                        console.log("sucessfully inserted");
                        res.redirect("fillup");
                    }
                    else{
                        console.log(err);
                        res.redirect("register");
                    }
                });
            }
        });
    })
app.route("/fillup")
    .get((req,res)=>{
        res.render("fillup");
    })
    .post((req,res)=>{
    //all the values are working fine 
    //now insert them in db
    var fn = req.body.Fname;
    var ln = req.body.Lname;
    var add = req.body.address;
    var ld = req.body.landMark;
    var phNo = req.body.phoneNo;
    var city = req.body.city;
    var state = req.body.state;
    var pincode = req.body.pincode;
    res.redirect("/");
});

app.route("/contact")
    .get((req,res)=>{
        res.render("contact");
    })
    .post((req,res)=>{
        res.render("contact");
    })
    
app.get("/about",(req,res)=>{
    res.render("about");
});
app.listen(3000,()=>{
    console.log("server is up and running at port no 3000");
});
