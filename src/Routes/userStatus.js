const { Router } = require('express');
const { confirmationUserStatus, getAllStatus } = require('../Controllers/controllers-Doc-UserS');
const router = Router();


router.post('/postStatus', async(req,res,next)=>{ 
    const {name} = req.body;
     try {   
       let response =await confirmationUserStatus(name);
     //manejar errores
     res.status(200).json(response);
    
    } catch (error) {
        console.log(error)
     }
 });

 router.get('/allStatus', async(req,res,next)=>{ 
  
   try {    
     let response=await getAllStatus();
     res.status(200).json(response.message)     
 
     } catch (error) {
       res.status(500).json(error.message.toString());
       //console.log(error)
     }
});

 module.exports= router;