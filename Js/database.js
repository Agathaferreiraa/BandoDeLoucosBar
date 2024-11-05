const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bando_de_loucos.db", (err) => {
  if (err) {
    console.error("Error ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

//Tabela de produtos
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL,
    estoque INTEGER NOT NULL
    )`);
});

module.exports = db;
