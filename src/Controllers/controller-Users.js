const {DocumentTypes,UserStatus,SecUsers} = require('../db');




const confirmationUser = async(userLogin, firstName,lastName, DocumentTypeId, documentNumber, address, city, postalCode, phoneNumbers, email, 
  passwordHash, passwordSalt, mustChangePassword, failedAccessAttempts, tokenId, twoFactorEnabled, dateOfBirth,
  UserStatusId)=> {

      // MustChangePassword / TwoFactorEnabled ?
    if(userLogin && firstName){
     if(DocumentTypeId && !documentNumber){

      throw new Error('Please complete with your document number') 

     }else if(!DocumentTypeId && documentNumber)
     {
      throw new Error('Please indicate the type of document')
        
     }  
        const newUser = await SecUsers.create({userLogin, firstName,lastName,documentNumber, address, city, postalCode, phoneNumbers, email, 
          passwordHash, passwordSalt, mustChangePassword, failedAccessAttempts, tokenId, twoFactorEnabled, dateOfBirth});
     
        let Document = await DocumentTypes.findOne( {where: {Id: DocumentTypeId} } );
        let Status = await UserStatus.findOne( {where: {Id: UserStatusId} } );
        
        await Document.addSecUsers(newUser); 
        await Status.addSecUsers(newUser);

     return { message: `Your user ${firstName} has been successfully created.`} ;
    }
    else throw new Error('Required fields are missing') 
};



const getAllUser = async()=>{
 //no trae usuarios eliminados temporalmente
    const usersDb = await SecUsers.findAll({ 
        attributes: ['Id','userLogin', 'firstName','lastName', 'DocumentTypeId', 'documentNumber', 'address', 'city', 'postalCode', 'phoneNumbers', 'email', 
            'dateOfBirth','UserStatusId'],
      });
      // console.log(usersDb);
      if(usersDb.length>0){
        return {message: usersDb};
      }else{
        throw new Error('No user found')
        
      }
}



const deleteUser = async(id)=>{

  const user = await SecUsers.findByPk(id);
  console.log(user)
  // let Status = await UserStatus.findOne( {where: {Id: UserStatusId} } ); //para establecerlo en inactivo antes de borrar
  if (!user) {
    throw new Error('Username does not exist')
    
  }
  // if (!Status){
  //   return {Error:'The status you want to assign does not exist'};
  // }
  // await Status.addSecUsers(user);
  await user.destroy(); // Elimina el usuario temporalmente
  return {message:'Successfully deleted user'};
  
}


const modifyUser = async(id,modifications) =>{
 
    const user = await SecUsers.findByPk(id);

    if (!user) {
      throw new Error('Username does not exist')
  
    }
     if (modifications.DocumentTypeId){
       let Document = await DocumentTypes.findOne( {where: {Id: modifications.DocumentTypeId} } );
       //falta considerar que pasa si no se encontrara el id del doc
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