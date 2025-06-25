import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://narutoanimetp:narutoanimetp@cluster0.dcrvcxt.mongodb.net/')
.then(()=>console.log('MongoDB Connected Successfully'))
.catch(error => console.log(error));

