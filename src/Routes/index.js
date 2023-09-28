const { Router } = require('express');
const { confirmationDocument } = require('../Controllers/controllers-Doc-UserS');
const router = Router();

router.get('/allUsers', async(req,res,next)=>{ 
  
     const response = 'soy una respuesta';
     try {   
        res.status(200).json(response);
       
       } catch (error) {
          console.log(error)
       }
   });
    

 router.post('/postUser', async(req,res,next)=>{ 
     const {name, direcction} = req.body;
     try {   
      res.status(200).json(name);
     
     } catch (error) {
        console.log(error)
     }
 });

 router.delete('/deleteUser/:id', async(req,res,next)=>{ 
    const { id } = req.params;
     try {
      res.status(200).json(id);
     
     } catch (error) {
        console.log(error)
     }
 });

 
 router.put('/modifyUser/:id', async(req,res,next)=>{ 
    const { id } = req.params;
     try {
      res.status(200).json(id);
     } catch (error) {
        console.log(error)
     }
 });

 


 router.post('/post/DocumentTypes', async(req,res,next)=>{ 
     const {Id,name, description,IsActive} = req.body;
     try {   
      let response =await confirmationDocument(Id,name, description,IsActive);
     //  res.status(200).send(response);
      res.status(200).json(response);
     
     } catch (error) {
        console.log(`hola soy ${error}`)
     }
 });


module.exports= router;

