var express = require("express")
var app = express()
var cors = require("cors")
var logger = require("morgan")
var mongoose = require("mongoose")
var routes = require("./src/routes")

// cors 설정
var corsOptions = {
    origin: 'http://localhost:3000',
    Credential: true
}

app.use(cors(corsOptions)) // cors 설정
app.use(express.json()) // 요청본문(request body) 파싱 설정
app.use(logger('tiny')) // logger 설정
app.use('/api', routes) // 라우팅 설정

// mongoose 설정
const CONNECT_URL = 'mongodb://localhost:27017/book-service' // book-service로 db 설정
mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB(book-service) connected..."))
.catch(e => console.log(`failed to connect MonogoDB: ${e}`))


// 페이지가 없을 때 출력
app.use((req, res, next) =>{
    res.status(404).send("해당 페이지는 존재하지 않습니다.")
})

// 서버 내부 오류 처리
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("서버 내부에 오류가 발생하였습니다.")
})

// port: 5000
app.listen(5000, () => {
    console.log('server is running on port 5000...')
})
