const express = require("express");
const app = express();
app.use(express.json());

const baseConsulta = {};

const funcoes = {
    ClienteCriado: (cliente) => {
        baseConsulta[cliente.id] = cliente;
    },
    IngressoCriado: (ingresso) => {
        const ingressos =
            baseConsulta[ingresso.clienteId]["ingressos"] || [];

        ingressos.push(ingresso);
        baseConsulta[ingresso.clienteId]["ingressos"] = ingressos;

    },
    ClienteAtualizado: (cliente) => {
        const clientes = baseConsulta[cliente]["clientes"];
        const indice = clientes.findIndex((o) => o.id === cliente.id);
        clientes[indice] = cliente;
    }
};

app.get("/clientes", (req, res) => {
    res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}
    res.status(200).send(baseConsulta);
});

app.listen(6000, () => console.log("Consultas. Porta 6000"));