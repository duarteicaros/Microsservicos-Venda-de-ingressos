const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const axios = require('axios');

const ingressosPorClienteID = {};
const {
    v4: uuidv4
} = require('uuid');

app.put('/clientes/:id/ingressos', async (req, res) => {
    const idIngresso = uuidv4();
    const ingresso = {
        descricao: req.body.descricao,
        quantidade: req.body.quantidade
    }
    //req.params dá acesso à lista de parâmetros da URL
    const ingressoPorCliente =
        ingressosPorClienteID[req.params.id] || [];
    ingressoPorCliente.push({
        id: idIngresso,
        ingresso
    });
    ingressosPorClienteID[req.params.id] =
        ingressoPorCliente;
    await axios.post('http://localhost:10000/eventos', {
        tipo: "IngressoCriado",
        dados: {
            id: idIngresso,
            ingresso,
            clienteId: req.params.id
        }
    })
    res.status(201).send(ingressoPorCliente);
});

app.get('/clientes/:id/ingressos', (req, res) => {
    res.send(ingressosPorClienteID[req.params.id] || []);
});

app.post("/eventos", (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    }
    catch(err){}
    res.status(200).send({
        msg: "ok"
    });
});

app.listen(5000, (() => {
    console.log('Ingressos. Porta 5000');
}));