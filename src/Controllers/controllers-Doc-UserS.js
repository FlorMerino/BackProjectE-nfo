const {DocumentTypes} = require('../db');


const confirmationDocument = async(Id,name, description,IsActive)=> {
    if(name && description){
        const newDocument = await DocumentTypes.create({
            Id,
            name,
            description,
            IsActive
        });
        // console.log(newDocument)
     return `Your document ${name} was successfully created.`;
    }
    else return'Required fields are missing';
};

module.exports= {
 confirmationDocument,
}