const express = require('express');
const app = express();
const PORT = 3000;

// Configuração para o Express reconhecer JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

const produtos = [
  id: 1, nome:
]