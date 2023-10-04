const { Router } = require('express');
const { confirmationUserStatus, getAllStatus } = require('../Controllers/controllers-Doc-UserS');
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

 router.get('/allStatus', async(req,res,next)=>{ 
  
  let response=await getAllStatus();
   try {    
      response.Error? res.status(404).json(response.Error) : res.status(200).json(response.message)     
 
     } catch (error) {
       res.status(500).json('Error loading states');
       console.log(error)
     }
});

 module.exports= router;