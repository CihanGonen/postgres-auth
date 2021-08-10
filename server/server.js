const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');

const { Sequelize } = require('sequelize');

const db = new Sequelize('postgresauth', 'postgres', 'kekego459', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = require('./models/Users');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

// check if email exists

app.post("/users/mail",async (req,res)=>{
  try{
    const mail = req.body.email;
    await User.findAll( {
      where: {
        email: mail
      }
    })
      .then(users=>{
        res.json(users);
      })
      .catch(err=>console.log(err));
    }
    catch(err){
      console.log(err);
    }
  }
)

//register

app.post("/users/register",async (req,res)=>{
  try{
    let{name,email,password} = req.body;
    let hashedPassword = await bcrypt.hash(password,10);
    password = hashedPassword;
    await User.create({
      name,email,password
    })
     .then(user=>res.json(user))
     .catch(err=>console.log(err));
  }catch(err){
    console.log(err);
  }


})

//login

app.post("/users/login",async (req,res)=>{
  try{
    const {email,password} = req.body;

    await User.findOne({
      where:{
        email:email
      }
    }).then(user=>{
      if(user){
        bcrypt.compare(password,user.password,(err,same)=>{
          if(same){
            res.json(user);
          }
          else{
            res.json({msg :'wrong informations'});
          }
        })
      }
      else{
        res.json({msg :'wrong informations'});
      }
    })

  }catch(err){
    console.log(err);
  }
})


app.listen(5000,()=>{
  console.log('server started on port 5000');
})