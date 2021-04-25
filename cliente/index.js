const express = require('express');
const app = express();
app.use(express.json());
const axios = require("axios");
id = 0;
const clientes = {};

const funcoes = {
    ClienteClassificado: (cliente) => {
        // const clientes =
        //     observacoesPorLembreteId[observacao.lembreteId];
        // const obsParaAtualizar = observacoes.find(o => o.id === observacao.id)
        const clienteParaAtualizar = cliente.id;

        clienteParaAtualizar.status = cliente.status;
        axios.post('http://localhost:10000/eventos', {
            tipo: "ClienteAtualizado",
            dados: {
                id: cliente.id,
                nome: cliente.nome,
                endereco: cliente.endereco,
                idade: cliente.idade,
                status: cliente.status
            }
        });
    }
}


app.get('/clientes', (req, res) => {
    res.send(clientes);
});
app.put('/clientes', async (req, res) => {
    id++;
    const cliente = {
        nome: req.body.nome,
        endereco: req.body.endereco,
        idade: req.body.idade
    }
    clientes[id] = {
        id,
        cliente,
        status: 'aguardando classificação'
    }
    await axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteCriado",
        dados: {
            id,
            cliente,
            status: 'aguardando classificação'
        },

    });
    res.status(201).send(clientes[id]);
});


app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}
    res.status(200).send({
        msg: "ok"
    });
});

app.listen(4000, () => {
    console.log('Clientes. Porta 4000');
});