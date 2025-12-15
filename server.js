const express = require("express");
const app = express();
const db = require("./dataBase");

app.use(express.json());

//add novo usuario
app.post("/usuario", (req, res) => {
  const { nome, email, senha } = req.body;

  db.query(
    "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senha], //isso vai substituir as ? do VALUES
    (err, results) => {
      if (err) {
        console.log("ERRO MYSQL:", err);
        return res.status(500).json({ error: "Erro ao inserir usuário" });
      }
      res.json({
        message: "Usuário criado com sucesso!",
        id: results.insertId,
      });
    }
  );
});

//rota de listando todos usuarios existentes
app.get("/usuario", (req, res) => {
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro no Servidor!" });
    }
    res.json(results);
  });
});

const port = 3002;
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

// buscando usuarios pelo ID
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  db.queryu(
    "SELECT * FROM usuario WHERE id = ?",
    [id], //insere o id do usuario no ? da consulta
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar o usuário" });
      }
    }
  );
});

//atualizar cadastro usuario
app.put("/usuario/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  db.query(
    "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?",
    [nome, email, senha, id], //insere os respectivos dados na consulta db.query
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erro ao atualizar dados do Usuário!" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado..." });
      }

      res.json({ message: "Usuário atualizado com sucesso!" });
    }
  );
});

app.delete("/usuario/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM usuario WHERE id = ?", [íd], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao deletar usuário..." });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado..." });
    }

    res.json({ message: "Usuário DELETADO com sucesso!" });
  });
});
