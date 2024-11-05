const express = require("express");
const db = require("./database");
const app = express();
const PORT = 3000;

// Configuração para o Express reconhecer JSON
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

// Listar produtos
app.get("/produtos", (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Adicionar produto
app.post("/produtos", (req, res) => {
  const { nome, preco, estoque } = req.body;
  db.run(
    "INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)",
    [nome, preco, estoque],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Remove produto
app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM produtos WHERE id = ?", id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }
    res.status(204).send();
  });
});

// Atualizar produto
app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, preco, estoque } = req.body;
  db.run(
    "UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?",
    [nome, preco, estoque, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        retun;
      }
      if (this.changes === 0) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }
      res.json({ id, nome, preco, estoque });
    }
  );
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
