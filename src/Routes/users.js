const { Router } = require('express');
const router = Router();

router.post('/postUser', async(req,res,next)=>{ 
    const {name, direcction} = req.body;
    try {   
     res.status(200).json(name);
    
    } catch (error) {
       console.log(error)
    }
});

router.get('/allUsers', async(req,res,next)=>{ 
  
     const response = 'soy una respuesta';
     try {   
        res.status(200).json(response);
       
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



module.exports= router;

