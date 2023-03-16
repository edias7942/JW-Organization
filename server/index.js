const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(express.json())
app.use(cors())

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "jwccc"
})

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

const port = 3001
app.listen(port, () => {
    console.log("Running in the port:", port)
})