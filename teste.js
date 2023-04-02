require('dotenv').config()
const mysql = require('mysql2')
DATABASE_URL='mysql://76f0it2t12spt0ad1g6q:pscale_pw_v9w6Tk9lEzbf2fpkBGaLTYKVji5NIeg1ODAMJFxmJer@aws.connect.psdb.cloud/jw-organization?ssl={"rejectUnauthorized":true}'
const connection = mysql.createConnection(DATABASE_URL)
let teste = connection.execute("SELECT * FROM DESIGNATIONS2023")
console.log(teste)
console.log('Connected to PlanetScale!')
connection.end()