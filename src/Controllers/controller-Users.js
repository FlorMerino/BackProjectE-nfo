const {DocumentTypes,UserStatus,SecUsers} = require('../db');




const confirmationUser = async(UserLogin, FirstName,LastName, DocumentTypeId, DocumentNumber, Address, city, PostalCode, 
    PhoneNumbers, Email, PasswordHash, PasswordSalt, MustChangePassword, FailedAccessAttempts, TokenId, 
    TwoFactorEnabled,DateOfBirth, UserStateId)=> {
    if(UserLogin && FirstName){
        const newUser = await SecUsers.create({UserLogin, FirstName,LastName, DocumentNumber, 
            Address, city, PostalCode, PhoneNumbers, Email, PasswordHash, PasswordSalt, 
            MustChangePassword, FailedAccessAttempts, TokenId, 
            TwoFactorEnabled,DateOfBirth, UserStateId});

          //console.log(typeof newUser) //obj

        let Document = await DocumentTypes.findOne( {where: {Id: DocumentTypeId} } );
        //console.log(typeof Document) //obj
        await Document.addSecUsers(newUser);

     return `Your user ${FirstName} has been successfully created.`;
    }
    else return'Required fields are missing';
};






const getAllUser = async()=>{

    const usersDb = await SecUsers.findAll({ 
        attributes: ['UserLogin', 'FirstName','LastName', 'DocumentTypeId', 'DocumentNumber', 'Address', 'city', 'PostalCode', 'PhoneNumbers', 'Email', 
            'DateOfBirth','UserStateId'],
      });
      console.log(usersDb);
      if(usersDb.length>0){
        return usersDb;
      }else{
        return 'No user found'
      }
}

module.exports= {
    confirmationUser,
    getAllUser   
}