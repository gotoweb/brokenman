const dotenv = require('dotenv')
const { Client } = require('pg')
dotenv.config()

const { HOSTNAME, USERNAME, PASSWORD, DATABASE } = process.env
const client = new Client({
  host: HOSTNAME,
  user: USERNAME,
  password: PASSWORD,
  database: DATABASE
})

module.exports = client