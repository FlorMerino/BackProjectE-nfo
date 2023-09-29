const {DocumentTypes,UserStatus,SecUsers} = require('../db');




const confirmationUser = async(UserLogin, FirstName,LastName, DocumentTypeId, DocumentNumber, Address, city, PostalCode, 
    PhoneNumbers, Email, PasswordHash, PasswordSalt, MustChangePassword, FailedAccessAttempts, TokenId, 
    TwoFactorEnabled,DateOfBirth, UserStatusId)=> {

      // MustChangePassword / TwoFactorEnabled ?
    if(UserLogin && FirstName){
     if(DocumentTypeId && !DocumentNumber){
        return { Error: 'Please complete with your document number'}
     }else if(!DocumentTypeId && DocumentNumber){
        return { Error: 'Please indicate the type of document'}
     }  
        const newUser = await SecUsers.create({UserLogin, FirstName,LastName, DocumentNumber, 
            Address, city, PostalCode, PhoneNumbers, Email, PasswordHash, PasswordSalt, 
            MustChangePassword, FailedAccessAttempts, TokenId, 
            TwoFactorEnabled,DateOfBirth, UserStatusId});

        let Document = await DocumentTypes.findOne( {where: {Id: DocumentTypeId} } );
        let Status = await UserStatus.findOne( {where: {Id: UserStatusId} } );
        
        await Document.addSecUsers(newUser);
        await Status.addSecUsers(newUser);

     return { message: `Your user ${FirstName} has been successfully created.`} ;
    }
    else return { Error: 'Required fields are missing'};
};



const getAllUser = async()=>{
 //no trae usuarios eliminados temporalmente
    const usersDb = await SecUsers.findAll({ 
        attributes: ['UserLogin', 'FirstName','LastName', 'DocumentTypeId', 'DocumentNumber', 'Address', 'city', 'PostalCode', 'PhoneNumbers', 'Email', 
            'DateOfBirth','UserStatusId'],
      });
      console.log(usersDb);
      if(usersDb.length>0){
        return {message: usersDb};
      }else{
        return {Error:'No user found'};
      }
}



const deleteUser = async(id,UserStatusId)=>{

  const user = await SecUsers.findByPk(id);
  let Status = await UserStatus.findOne( {where: {Id: UserStatusId} } ); //para establecerlo en inactivo antes de borrar
  if (!user) {
    return {Error:'Username does not exist'};
  }
  if (!Status){
    return {Error:'The status you want to assign does not exist'};
  }

  await Status.addSecUsers(user);
  await user.destroy(); // Elimina el usuario temporalmente
  return {message:'Successfully deleted user'};
  
}


const modifyUser = async(id,modifications) =>{
 
    const user = await SecUsers.findByPk(id);

    if (!user) {
      return { Error: 'Username does not exist' };
    }
     if (modifications.DocumentTypeId){
       let Document = await DocumentTypes.findOne( {where: {Id: modifications.DocumentTypeId} } );

       await Document.addSecUsers(user);
       
    }else if (modifications.UserStatusId){
      let Status = await UserStatus.findOne( {where: {Id: modifications.UserStatusId} } );

      await Status.addSecUsers(user);
    }

    await user.update(modifications);
    return { message: 'User modified successfully'};

}



module.exports= {
    confirmationUser,
    getAllUser,
    deleteUser,
    modifyUser   
}