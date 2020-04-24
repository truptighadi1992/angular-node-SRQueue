const UserModel = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) =>{

    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password , 10 )
    .then( hashedPwd =>{
        const newUser = new UserModel({
            email: email,
            password: hashedPwd
        })
        newUser.save()
        .then( userCreated =>{
            res.status(201).json({
                "message": "User Created Successfully"
            })
        })
        .catch( err =>{
            console.log(err);
            res.status(500).json({
                "message": "Failed to create user"
            })
        })
    }).catch( err =>{
       
        res.status(500).json({
            "message": "Failed to create user"
        })
    })
    
}

exports.login = (req , res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    let fetchedUser;
    UserModel.findOne({ email: email}).then(
        userMatched =>{
            if(!userMatched){
                return res.status(401).json({
                    message:"User Not found"
                })
            }
            fetchedUser = userMatched;
            return bcrypt.compare( password, userMatched.password)
        })
        .then( isMatched => {
            if(!isMatched){
                return res.status(401).json({
                    message:"Auth Failed"
                })
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
              );
            res.status(200).json({
                message:"User authenticated",
                token: token,
                expiresIn : 3600,
                user: fetchedUser
            })

        })
        .catch( err =>{
            console.log(err);
            return res.status(401).json({
                message:"Auth Failed"
            })
        })
}