const express = require("express");
//para enviar eventos para os demais microsserviços
const axios = require("axios");

const app = express();
app.use(express.json());

const eventos = [];

app.post("/eventos", (req, res) => {
  const evento = req.body;
  eventos.push(evento);
  //envia o evento para o microsserviço de Clientes
  axios
    .post("http://localhost:4000/eventos", evento)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => {
      console.log(error);
    });
  //envia o evento para o microsserviço de Ingressos
  axios
    .post("http://localhost:5000/eventos", evento)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => {
      console.log(error);
    });

  //envia o evento para o microsserviço de Consulta
  axios
    .post("http://localhost:6000/eventos", evento)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200).send({ msg: "ok" });
});
  //envia o evento para o microsserviço de Classificacao
  axios
    .post("http://localhost:7000/eventos", evento)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((error) => {
      console.log(error);
    });
app.get("/eventos", (req, res) => {
  res.send(eventos);
});

app.listen(10000, () => {
  console.log("Barramento de eventos. Porta 10000");
});
