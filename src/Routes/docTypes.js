const { Router } = require('express');
const { confirmationDocument, getAllDocuments } = require('../Controllers/controllers-Doc-UserS');
const router = Router();


 router.post('/postDoc', async(req,res,next)=>{ 
    const {name, description} = req.body;
   
     try {   
      let response =await confirmationDocument(name, description);
     //  res.status(200).send(response);
     //manejar errores
    
     res.status(200).json(response);
    
    } catch (error) {
        console.log(error)
     }
 });

 router.get('/allDocuments', async(req,res,next)=>{ 
  
     try {    
      let response=await getAllDocuments();
         res.status(200).json(response.message)     
       //resp array de obj
       } catch (error) {
         res.status(500).json(error.message.toString());
         //console.log(error)
       }
});

 module.exports= router;