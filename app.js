const express = require('express')
const cors = require('cors')
const os = require('os')
const db = require('./db')
const app = express()
db.connect()
  .then(() => console.log('DB 연결 완료')).catch(err => console.log('연결 오류', err.stack))

app.use(cors())
app.use((req, res, next) => {
  console.log(`${req.method}\t${req.path}`)
  next()
})

const port = 80
let broken = false;

let breakdown = (req, res) => {
  broken = true;
  console.log('[v3] internal server error')
  res.status(500).send(`
    <h1>Internal Server Error</h1>
    <div>뭔가 문제가 있어요! 문제가 생긴 호스트 이름: ${os.hostname()}</div>
    <div>${req.socket.remoteAddress}에서 오셨군요!</div>
  `)
}

app.get('/', (req, res) => {
  if(broken) {
    breakdown(req, res);
    return;
  }
  res.send(`
    <h1>뭔가 수상한 Brokenman에 오신 것을 환영합니다!</h1>
    <div>호스트 이름: ${os.hostname()}</div>
    <div>${req.socket.remoteAddress}에서 오셨군요!</div>
    <div><a href="/breakdown">서버 고장내러 가기</a></div>
  `)
})

app.get('/touchdb', async (req, res) => {
  let queryString = 'SELECT column_name, udt_name, is_nullable FROM information_schema.columns'

  console.log(`\n${queryString}\n`)
  let result
  try {
    result = await db.query(queryString)
    console.table(result.rows)
  }
  catch(e) {
    console.log(e)
  }
  finally {
    res.status(200).json(result.rows)
  }
})

app.get('/breakdown', breakdown)

app.listen(port, () => {
  console.log(`${port} 포트에서 앱이 실행됩니다`)
})

process.on('SIGINT', async (sig) => {
  console.log('\n데이터베이스 연결 닫는 중...')
  await db.end()
  console.log('데이터베이스 연결 종료')
  process.exit(1)
})