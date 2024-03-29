const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

let DataBaseChoose = "local"

app.use(express.json())
app.use(cors())

let db
// Conexão com o Banco de Dados em Nuvem:
if (DataBaseChoose === "cloud") {
    console.log("Conectado ao Banco de Dados: Planet Scale")
    db = mysql.createConnection({
        database: "jw-organization",
        user: "0sne07cwjouq446ozsn1",
        host: "aws.connect.psdb.cloud",
        password: "pscale_pw_3bqoWpf0JzoAVDrrBib14FFbSp6EEqgIibHwscxOywJ",
        ssl: {
            rejectUnauthorized: true
        }
    });
}

// Conexão com o Banco de Dados Local:
if (DataBaseChoose === "local") {
    console.log("Conectado ao banco de dados Local da máquina!")
    db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "jwccc"
    })
}


app.post("/designation", (req, res) => {
    const week = req.body.week
    const positionInWeek = req.body.positionInWeek
    db.query
        (`SELECT ID, PLACE, TIME, DESIGNATED_1, DESIGNATED_2 FROM DESIGNATIONS2023 WHERE WEEK = ${week} AND P_IN_WEEK = ${positionInWeek}`,
            (err, result) => {
                if (err) res.send(err)
                res.send(result)
            })
})


app.post("/designate", (req, res) => {
    const id = req.body.id
    const place = req.body.place
    const initialTime = req.body.initialTime
    const finalTime = req.body.finalTime
    const designated1 = req.body.designated1
    const designated2 = req.body.designated2

    let time = `${initialTime.slice(0, 2)}${initialTime.slice(3)}${finalTime.slice(0, 2)}${finalTime.slice(3)}`
    parseInt(time)

    db.query
        (`UPDATE DESIGNATIONS2023 SET PLACE = "${place}", TIME = "${time}", DESIGNATED_1 = "${designated1}", DESIGNATED_2 = "${designated2}" WHERE ID = ${id}`)

})



app.post("/cart_places", (req, res) => {
    db.query
        ("SELECT * FROM cart_places ORDER BY PLACE",
            (err, result) => {
                if (err) res.send(err)
                res.send(result)
            })
})



app.post("/territories", (req, res) => {
    db.query
        ("SELECT * FROM territories ORDER BY NUMBER",
            (err, result) => {
                if (err) res.send(err)
                res.send(result)
            })
})


const port = 3001
app.listen(port, () => {
    console.log("Running in the port:", port)
})