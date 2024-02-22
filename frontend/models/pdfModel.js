const mongoose = require('mongoose');



const pdfSchema = new mongoose.Schema({
    data: Buffer,
  });
  
export const Pdf = mongoose.models.pdfModel ||  mongoose.model("pdfModel", pdfSchema);