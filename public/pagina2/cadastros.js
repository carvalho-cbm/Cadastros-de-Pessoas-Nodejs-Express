async function listapessoas() {
    const resposta = await fetch('http://localhost:3000/cadastros');
    const dados = await resposta.json();
    let str = ``;/*Variavel para imprimir um pessoa em cada linha da tabela */

    const tela = document.getElementById('tabel');
    dados.forEach(pessoa => {/*Realiza uma impressão para cada pessoa cadastrada*/
        str += `
            <tr class="cartao">
                <td><h5>${pessoa.nome}</h5></td>
                <td><h5>R$ ${pessoa.renda}</h5></td>
                <td><h5>${pessoa.data}</h5></td>
            </tr>
        `;
    });
    tela.innerHTML = str;
};
