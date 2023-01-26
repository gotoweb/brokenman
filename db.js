const dotenv = require('dotenv')
const { Client } = require('pg')
dotenv.config()

const { HOSTNAME, USERNAME, PASSWORD, DATABASE } = process.env
console.log(`
[DB 접속 정보]
HOSTNAME=${HOSTNAME}
USERNAME=${USERNAME}
DATABASE=${DATABASE}
`)
const client = new Client({
  host: HOSTNAME,
  user: USERNAME,
  password: PASSWORD,
  database: DATABASE
})

module.exports = client