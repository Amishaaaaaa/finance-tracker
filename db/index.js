const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://amishamishra12886:lWllpdczzsOA7oJj@cluster0.bv6fqzo.mongodb.net/finance?retryWrites=true&w=majority");

const AdminSchema = new mongoose.Schema(
    { username: String,
      email: String,
      password: String 
    });

const UserSchema = new mongoose.Schema(
    { username: String,
      email: String,
      password: String ,
      sectors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sector'
      }]
    });

const sectorSchema = new mongoose.Schema({
    name: String,
    imageLink: String,
    amount: Number,
    isPublic: Boolean
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Sector = mongoose.model('Sector', sectorSchema);

module.exports = {
    Admin,
    User,
    Sector
}
