const express = require("express");
const axios = require("axios")
const app = express();
app.use(express.json());

const palavraChave = 60;

const funcoes = {
    ClienteCriado: (cliente) => {
        // cliente.forEach((cliente) => {
        //     if (livro.idade >= palavraChave) {
        //         cliente.status = "Prioridade"
        //     } else{
        //         cliente.status = "Comum"
        //     }
        // })

        cliente.status = cliente.idade.includes(palavraChave) ?"importante" : "comum";

        axios.post('http://localhost:10000/eventos', {
            tipo: "ClienteClassificado",
            dados: cliente,
        });
    },

};

app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    }
    catch(err){}
    res.status(200).send({
        msg: "ok"
    });
});

app.listen(7000, () => console.log("Classificação. Porta 7000"));