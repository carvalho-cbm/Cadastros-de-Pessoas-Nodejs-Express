function verificacao() {
    const name = document.getElementById("registername").value.trim();
    const income = document.getElementById("registerincome").value.trim();
    const date = document.getElementById("birthdate").value.trim();
    let avisar = document.getElementById("aviso");

    console.log(name);
    console.log(income);

    /*Verificação inicial caso o nome não seja preenchido, mandará um alert*/

    if (name === "") {
        avisar.innerHTML = ("* Por favor, preencha o nome.");
        console.log("Nome não preenchido.");
        return false;
    }

    /*Verificação da renda, caso não seja preenchida, mandará um alert*/

    if (income < 0 || income == "") {
        avisar.innerHTML = ("* Insira um valor valido.");
        console.log("Valor inválido.");
        return false;
    }

    /*Variáveis para a verificação da data, utilizando a classe Date*/

    let dataAtual = new Date();
    let anoatual = dataAtual.getFullYear();

    const dataNascimento = new Date(date);

    let anonascimento = dataNascimento.getFullYear();
    let idade = anoatual - anonascimento;

    /*Primeira verificação da idade com intenção de saber se a pessoa já fez aniversário, caso não tenha feito, a idade é diminuida em 1*/

    console.log('idade ' + idade);
    if (dataAtual.getMonth() - dataNascimento.getMonth() < 0 || (dataAtual.getMonth() - dataNascimento.getMonth() === 0 && dataAtual.getDate() - dataNascimento.getDate() < 0)) {
        idade--;
    }

    /*Verificação de maioridade e idade válida */

    if (idade < 18 || idade > 125 || date === "") {
        avisar.innerHTML = ("* Insira uma data válida.");
        console.log("Data inválida.");
        return false;
    }
    console.log('Sucesso!')

    /*Caso os dados tenham passado em todas as verificações, são mandados para serem salvos no banco pelo método*/

    cadastrarUsuario(name, income, date);
    return true;
}

async function cadastrarUsuario(nome, renda, data) {
    let avisar = document.getElementById("aviso");
    try {
        const response = await fetch('http://localhost:3000/cadastros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                renda: renda,
                data: data,
            })
        });

        const result = await response.json();

        if (response.ok) {
            avisar.style.color = 'black';
            avisar.innerHTML = ('Usuário cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar usuário: ' + result.message);
        }
    } catch (err) {
        console.error("Erro ao enviar dados:", err);
        alert("Ocorreu um erro ao tentar cadastrar o usuário.");
    }
}