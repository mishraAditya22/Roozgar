const mongoose = require("mongoose");
const bodyParser = require("body-parser");


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


const addUser = (userid,password)=>{
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
}

export default Account ;
export {addUser};