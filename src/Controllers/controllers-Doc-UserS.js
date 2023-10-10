const {DocumentTypes,UserStatus} = require('../db');



const confirmationDocument = async(name, description)=> {
    if(name && description){
        const newDocument = await DocumentTypes.create({
            name,
            description,
        });
        // console.log(newDocument)
     return `Your document ${name} was successfully created.`;
    }
    else throw new Error('Required fields are missing');
};

const getAllDocuments = async()=>{
    const documentsTypeDb = await DocumentTypes.findAll({ 
        attributes: ['Id','name', 'description'],
      });
      
      if(documentsTypeDb.length>0){
        return {message: documentsTypeDb};
      }else{
        throw new Error('Types of documents not found')
      }
}

const confirmationUserStatus = async(name)=> {
    if(name){
        const newStatus = await UserStatus.create({
            name,          
        });
        // console.log(newDocument)
     return `Your status ${name} was successfully created.`;
    }
    else throw new Error('Required fields are missing');
};

const  getAllStatus = async()=>{
    const userStatusDb = await UserStatus.findAll({ 
        attributes: ['Id','name'],
      });
      
      if(userStatusDb.length>0){
        return {message: userStatusDb};
      }else{
        throw new Error('No states found')
      }
}

module.exports= {
 confirmationDocument,
 confirmationUserStatus,
 getAllDocuments,
 getAllStatus
}