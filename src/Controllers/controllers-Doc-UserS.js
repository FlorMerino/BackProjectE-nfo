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
    else return'Required fields are missing';
};


const confirmationUserStatus = async(name)=> {
    if(name){
        const newStatus = await UserStatus.create({
            name,          
        });
        // console.log(newDocument)
     return `Your status ${name} was successfully created.`;
    }
    else return'Required fields are missing';
};

module.exports= {
 confirmationDocument,
 confirmationUserStatus
}