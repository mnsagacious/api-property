const mongoose = require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
const propertySchema = new mongoose.Schema({
  propertyno: Number,
  image: {
    type: String,

  },

  propertytitle: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  propertytype: {
    type: String,
    enum: ['flat', 'home', 'plot'],
    required: true
  },
  city: {
    type: String
  },
  purpose: {
    type: String,
    enum: ['sale', 'rent'],
    required: true
  },
  location: {
    type: String,
    required: true
  },

  bath: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  rooms: {
    type: String,
    required: true
  },
  kitchen: {
    type: String,
    required: true
  },
  storeroom: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },
   owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Users'
   }

})

propertySchema.plugin(AutoIncrement, { inc_field: 'propertyno' });
const properties = mongoose.model('Properties', propertySchema);
module.exports = properties;
