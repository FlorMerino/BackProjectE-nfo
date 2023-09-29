const { Router } = require('express');
const { confirmationUser, getAllUser, deleteUser, modifyUser } = require('../Controllers/controller-Users');
const router = Router();

router.post('/postUser', async(req,res,next)=>{ 
    const {UserLogin, FirstName,LastName, DocumentTypeId, DocumentNumber, Address, city, PostalCode, PhoneNumbers, Email, 
        PasswordHash, PasswordSalt, MustChangePassword, FailedAccessAttempts, TokenId, TwoFactorEnabled, DateOfBirth,
        UserStatusId} = req.body;
    try {   
     let response = await confirmationUser(UserLogin, FirstName,LastName, DocumentTypeId, DocumentNumber, Address, city,
         PostalCode, PhoneNumbers, Email, PasswordHash, PasswordSalt, MustChangePassword, 
         FailedAccessAttempts, TokenId, TwoFactorEnabled, DateOfBirth, UserStatusId)

     response.Error? res.status(404).json(response.Error) : res.status(200).json(response.message)
    
    } catch (error) {
      res.status(500).json('Error creating user');
      console.log(error)
    }
});

router.get('/allUsers', async(req,res,next)=>{ 
  
    let response=await getAllUser();
     try {    
        response.Error? res.status(404).json(response.Error) : res.status(200).json(response.message)     
       
       } catch (error) {
         res.status(500).json('Error loading users');
         console.log(error)
       }
});
    

 router.delete('/deleteUser/:id', async(req,res,next)=>{ 
    const { id } = req.params;
    const {UserStatusId}= req.body;
    let response = await deleteUser(id,UserStatusId)
     try {
      response.Error? res.status(404).json(response.Error) : res.status(200).json(response.message)
     
     } catch (error) {
      res.status(500).json('Error deleting user');
        console.log(error)
     }
 });

 
 router.put('/modifyUser/:id', async(req,res,next)=>{ 
    const { id } = req.params;
    
    const modifications= req.body;

      console.log(req.body)
     try {
      let response = await modifyUser(id,modifications)
 
      response.Error? res.status(404).json(response.Error) : res.status(200).json(response.message)

     } catch (error) {
        console.log(error)
     }
 });



module.exports= router;

