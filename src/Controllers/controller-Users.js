const {DocumentTypes,UserStatus,SecUsers} = require('../db');




const confirmationUser = async(UserLogin, FirstName,LastName, DocumentTypeId, DocumentNumber, Address, city, PostalCode, 
    PhoneNumbers, Email, PasswordHash, PasswordSalt, MustChangePassword, FailedAccessAttempts, TokenId, 
    TwoFactorEnabled,DateOfBirth, UserStatusId)=> {


    if(UserLogin && FirstName){
        const newUser = await SecUsers.create({UserLogin, FirstName,LastName, DocumentNumber, 
            Address, city, PostalCode, PhoneNumbers, Email, PasswordHash, PasswordSalt, 
            MustChangePassword, FailedAccessAttempts, TokenId, 
            TwoFactorEnabled,DateOfBirth, UserStatusId});

          //console.log(typeof newUser) //obj

        let Document = await DocumentTypes.findOne( {where: {Id: DocumentTypeId} } );
        let Status = await UserStatus.findOne( {where: {Id: UserStatusId} } );
        //console.log(typeof Document) //obj
        await Document.addSecUsers(newUser);
        await Status.addSecUsers(newUser);

     return `Your user ${FirstName} has been successfully created.`;
    }
    else return'Required fields are missing';
};



const getAllUser = async()=>{
 //no trae usuarios eliminados temporalmente
    const usersDb = await SecUsers.findAll({ 
        attributes: ['UserLogin', 'FirstName','LastName', 'DocumentTypeId', 'DocumentNumber', 'Address', 'city', 'PostalCode', 'PhoneNumbers', 'Email', 
            'DateOfBirth','UserStatusId'],
      });
      console.log(usersDb);
      if(usersDb.length>0){
        return usersDb;
      }else{
        return 'No user found'
      }
}



const deleteUser = async(id,UserStatusId)=>{

  const user = await SecUsers.findByPk(id);
  let Status = await UserStatus.findOne( {where: {Id: UserStatusId} } );
  if (!user) {
    return {Error:'Username does not exist'};
  }
  // await Status.addSecUsers(newUser);
  await user.destroy(); // Elimina el usuario temporalmente
  return {message:'Successfully deleted user'};
  
}

const modifyUser = async(id,modifications) =>{

    const user = await SecUsers.findByPk(id);

    if (!user) {
      return { Error: 'Username does not exist' };
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