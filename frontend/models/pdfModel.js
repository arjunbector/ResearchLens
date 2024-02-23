const mongoose = require('mongoose');



const pdfSchema = new mongoose.Schema({
    data: Buffer,
    no:{
        type:"string",
        "default":"-1"
    }
    
  });
  
export const Pdf = mongoose.models.pdfModel ||  mongoose.model("pdfModel", pdfSchema);