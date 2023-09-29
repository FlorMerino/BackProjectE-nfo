const { Router } = require('express');
const { confirmationUser, getAllUser } = require('../Controllers/controller-Users');
const router = Router();

router.post('/postUser', async(req,res,next)=>{ 
    const {UserLogin, FirstName,LastName, DocumentTypeId, DocumentNumber, Address, city, PostalCode, PhoneNumbers, Email, 
        PasswordHash, PasswordSalt, MustChangePassword, FailedAccessAttempts, TokenId, TwoFactorEnabled, DateOfBirth,
        UserStateId} = req.body;
    try {   
     let response = await confirmationUser(UserLogin, FirstName,LastName, DocumentTypeId, DocumentNumber, Address, city,
         PostalCode, PhoneNumbers, Email, PasswordHash, PasswordSalt, MustChangePassword, 
         FailedAccessAttempts, TokenId, TwoFactorEnabled, DateOfBirth, UserStateId)

     res.status(200).json(response);
    
    } catch (error) {
       console.log(error)
    }
});

router.get('/allUsers', async(req,res,next)=>{ 
  
    let response=await getAllUser();
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

