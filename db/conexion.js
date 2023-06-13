const mongoose = require("mongoose");


const connection = async()=>{
    try {
       await mongoose.connect('mongodb+srv://jduartecfr:laradevelopment@cluster0.x3uxvgr.mongodb.net/');
       console.log("conectado a la base de datos");
    }
    
    catch (error) {
        console.log(error);
        throw new Error ("No se ha podido conectar a la base de datos");
    }
} 

module.exports = {
    connection
}

