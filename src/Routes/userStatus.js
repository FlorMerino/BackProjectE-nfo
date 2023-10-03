const { Router } = require('express');
const { confirmationUserStatus } = require('../Controllers/controllers-Doc-UserS');
const router = Router();


router.post('/postStatus', async(req,res,next)=>{ 
    const {name} = req.body;
     try {   
       let response =await confirmationUserStatus(name);
     //  res.status(200).send(response);
     res.status(200).json(response);
    
    } catch (error) {
        console.log(error)
     }
 });


 module.exports= router;