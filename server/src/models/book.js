const mongoose = require("mongoose")

const bookschma = mongoose.Schema({
    title:{type:String, required:true, trim:true}, // 제목
    author:{type:String, required:true, trim:true}, // 저자
    summary:{type:String, trim:true}, // 내용 요약
    genre: {type:String, trim:true}, // 장르
    release: {type:String, required:true, trim:true}, // 발매일
    ISBN: {type:Number, required:true} // 국제표준도서정보
})

const Book = mongoose.model('Book', bookschma)
module.exports = Book;