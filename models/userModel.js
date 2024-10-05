const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamps');
const userSchema = mongoose.Schema({
     firstname:{ type: String },
     lastname:{ type: String },
     mobileno:{ type: String },
     aadharCardno:{ type: String },
     countrycode:{ type: String  },
     email:{ type: String },
     password:{ type: String },
     usertype : { type: Number, default:2, enum:[1, 2] },
     createdAt: Date,
     updatedAt: Date
})
userSchema.plugin(timestamps, { index: true });
module.exports=mongoose.model('User',userSchema ) 






