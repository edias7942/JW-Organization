const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "jwccc"
})

app.post('/designacao', (req, res) => {
    const semana = req.body.semana
    const posicaoSemana = req.body.posicaoSemana
    db.query
        (`SELECT ID, LUGAR, HORARIO, DESIGNADO_1, DESIGNADO_2 FROM designacoes_2023 WHERE SEMANA = ${semana} AND P_SEMANA = ${posicaoSemana}`,
            (err, result) => {
                if (err) res.send(err)
                res.send(result)
            })
})

app.post('/designar', (req, res) => {
    const id = req.body.ID
    const local = req.body.local
    const horarioInicial = req.body.horarioInicial
    const horarioFinal = req.body.horarioFinal
    const designado1 = req.body.designado1
    const designado2 = req.body.designado2

    let horario = `${horarioInicial.slice(0, 2)}${horarioInicial.slice(3)}${horarioFinal.slice(0, 2)}${horarioFinal.slice(3)}`
    parseInt(horario)

    db.query
    (`UPDATE designacoes_2023 SET LUGAR = '${local}', HORARIO = '${horario}', DESIGNADO_1 = '${designado1}', DESIGNADO_2 = '${designado2}' WHERE ID = ${id}`)
})

app.post('/locais_carrinho', (req, res) => {
    let comando = req.body.comando
    db.query
        (comando,
        (err, result) => {
            if (err) res.send(err)
            res.send(result)
        })
})

const porta = 3001
app.listen(porta, () => {
    console.log("Rodando na porta", porta)
})
