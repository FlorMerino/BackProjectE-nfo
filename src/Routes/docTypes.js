const { Router } = require('express');
const { confirmationDocument, getAllDocuments } = require('../Controllers/controllers-Doc-UserS');
const router = Router();


 router.post('/postDoc', async(req,res,next)=>{ 
    const {name, description} = req.body;
    console.log(name)
     try {   
      let response =await confirmationDocument(name, description);
     //  res.status(200).send(response);
     //manejar errores
     console.log(response)
     res.status(200).json(response);
    
    } catch (error) {
        console.log(error)
     }
 });

 router.get('/allDocuments', async(req,res,next)=>{ 
  
    let response=await getAllDocuments();
     try {    
        response.Error? res.status(404).json(response.Error) : res.status(200).json(response.message)     
       //resp array de obj
       } catch (error) {
         res.status(500).json('Error loading document types');
         console.log(error)
       }
});

 module.exports= router;