const express = require('express')
const cors = require('cors')
const os = require('os')
const app = express()
app.use(cors())
const port = 80

let broken = false;

let doWrong = (req, res) => {
  broken = true;
  console.log('[v3] running in pod ' + req.socket.remoteAddress)
  console.log('[v3] internal server error')
  res.status(500).send(`
    <h1>Internal Server Error</h1>
    <div>뭔가 문제가 있어요! 문제가 생긴 파드 이름: ${os.hostname()}</div>
  `)
}

app.get('/', (req, res) => {
  console.log('[v3] running in pod ' + req.socket.remoteAddress)
  if(broken) {
    doWrong(req, res);
    return;
  }
  res.send(`
    <h1>뭔가 수상한 CozServer에 오신 것을 환영합니다!</h1>
    <div>버전:
      <span style="color:red; font-weight: bold">v3.0</span>
    </div>
    <div>파드 이름: ${os.hostname()}</div>
    <div>${req.socket.remoteAddress}에서 오셨군요!</div>
  `)
})

app.get('/wrong', doWrong)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})