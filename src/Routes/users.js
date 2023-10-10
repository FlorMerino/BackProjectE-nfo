const { Router } = require('express');
const { confirmationUser, getAllUser, deleteUser, modifyUser } = require('../Controllers/controller-Users');
const router = Router();

router.post('/postUser', async(req,res,next)=>{ 
    const {userLogin, firstName,lastName,documentNumber,DocumentTypeId, address, city, postalCode, phoneNumbers, email, 
        passwordHash, passwordSalt, mustChangePassword, failedAccessAttempts, tokenId, twoFactorEnabled, dateOfBirth,
        UserStatusId} = req.body;
    try {   
     let response = await confirmationUser(userLogin, firstName,lastName, DocumentTypeId, documentNumber, address, city, postalCode, phoneNumbers, email, 
      passwordHash, passwordSalt, mustChangePassword, failedAccessAttempts, tokenId, twoFactorEnabled, dateOfBirth,
      UserStatusId)


     res.status(201).json(response.message)
    } catch (error) {

      res.status(400).json(error.message.toString())
      
      //console.log(error)
    }
});

router.get('/allUsers', async(req,res,next)=>{ 
  
     try {    
        let response=await getAllUser();
        res.status(200).json(response.message)     
       
       } catch (error) {
         res.status(500).json(error.message.toString());
         //console.log(error)
       }
});
    

 router.delete('/deleteUser/:id', async(req,res,next)=>{ 
    const { id } = req.params;
    const {UserStatusId}= req.body;
    
     try {
     let response = await deleteUser(id,UserStatusId)
     res.status(200).json(response.message)
     
     } catch (error) {
      res.status(500).json(error.message.toString());
        //console.log(error)
     }
 });

 
 router.put('/modifyUser/:id', async(req,res,next)=>{ 
    const { id } = req.params;
    
    const modifications= req.body;

     try {
      let response = await modifyUser(id,modifications)
 
      res.status(200).json(response.message)

     } catch (error) {
      res.status(500).json(error.message.toString());
       //console.log(error)
     }
 });



module.exports= router;

