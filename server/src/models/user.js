const mongoose = require('mongoose') 
const book = require('./book')

const userschema = mongoose.Schema({
    name:{type:String, required:true}, // 이름
    age:{type:Number, required:true}, // 나이
    email:{type:String, required:true}, // 이메일
    books:{type:[book], required:true} // 도서 구매 목록
})

const user = mongoose.model('User', userschema)
module.exports = user