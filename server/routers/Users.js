const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const validateToken=require('../middleware/Authmiddle')
const {sign}=require('jsonwebtoken');
const { route } = require("./Posts");



router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post('/login',async(req,res)=>{
  const {username,password}=req.body

  const user=await Users.findOne({where:{username:username}})
  if(!user)res.json({error:"User doesn't exist"})
  
    const match = await bcrypt.compare(password,user.password);
    if (!match) {
      return res.status(401).json({ error: "Wrong username and password combination" });
    }

      const accessToken=sign({username:user.username,id:user.id},"importantsecret")
      res.json({token:accessToken,username:username,id:user.id})
    })

    router.get("/auth", (req, res) => {
      res.json(req.user);
    });
    
 

    router.get("/basicinfo/:id",async(req,res)=>{
      const id=req.params.id
      const basicinfo=await Users.findByPk(id,{attributes:{exclude:['password']}})
   res.json(basicinfo)

    })




module.exports = router;