import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import express from 'express';

const port = 3000; /*Porta usada para rodar o server*/
const app = express();

app.use(express.json());
app.use(express.static('public'));

async function criarTabeladeCadastros(nome, renda, data) {
    console.log("Conectando ao banco");
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });
    console.log("Data = " + data);
    await db.run('CREATE TABLE IF NOT EXISTS pessoas (id INTEGER PRIMARY KEY, nome TEXT, renda REAL, data TEXT)');

    /*Criação da tabela e declaração dos tipos*/

    console.log("Tabela criada ou já existente.");

    await db.run(`INSERT INTO pessoas (nome,renda,data) VALUES (?,?,?)`, [nome,
        renda,
        data
    ]);

    console.log("Dados inseridos. Data = " + data);

    await db.close();

}


app.get('/cadastros', async (req, res) => {
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });
    const pessoas = await db.all('SELECT * FROM pessoas');
    await db.close();
    /*Rota GET para obter os dados das pessoas cadastradas, retornando um vetor*/

    res.json(pessoas);
})


app.post('/cadastros', async (req, res) => {
    const { nome, renda, data } = req.body;
    console.log('Dados recebidos:', req.body);

    /*Rota POST cadastrando uma nova pessoa no banco, recebendo nome,renda e data e realizando a inserção no banco SQLITE*/

    try {
        await criarTabeladeCadastros(nome, renda, data);
        res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar!', error });
    }
});

app.listen(port);

