const express = require("express");
const app = express();

app.use(express.json());
const axios = require("axios");

const baseConsulta = {};

const funcoes = {
  ClienteCriado: (cliente) => {
    baseConsulta[cliente.id] = cliente;
  },
  IngressoCriado: (ingresso) => {
    const ingressos = baseConsulta[ingresso.clienteId]["ingressos"] || [];
    ingressos.push(ingresso);
    baseConsulta[ingresso.clienteId]["ingressos"] = ingressos;
  },
  IngressoAtualizado: (ingresso) => {
    const ingressos = baseConsulta[ingresso.clienteId]["ingressos"];
    const indice = ingressos.findIndex((i) => i.id === ingresso.id);
    baseConsulta[ingresso.clienteId]["ingressos"][indice].quantidade =
      ingresso.quantidade;
  },
};

app.get("/clientes", (req, res) => {
  res.status(200).send(baseConsulta);
});

app.post("/eventos", async (req, res) => {
  try {
    await funcoes[req.body.tipo](req.body.dados);
  } catch (err) {
    console.log(err);
  }
  res.status(200).send(baseConsulta);
});

app.listen(6000, async () => {
  console.log("Consultas. Porta 6000");
  const resp = await axios.get("http://192.168.0.225:10000/eventos");
  resp.data.forEach((valor, indice, colecao) => {
    try {
      funcoes[valor.tipo](valor.dados);
    } catch (er) {
      console.log(er);
    }
  });
});
