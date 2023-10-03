const { Router } = require('express');
const { confirmationDocument } = require('../Controllers/controllers-Doc-UserS');
const router = Router();


 router.post('/postDoc', async(req,res,next)=>{ 
    const {name, description} = req.body;
    console.log(req.body)
     try {   
      let response =await confirmationDocument(name, description);
     //  res.status(200).send(response);
     res.status(200).json(response);
    
    } catch (error) {
        console.log(error)
     }
 });

 module.exports= router;