const express = require('express'); // Importando express.
const app = express(); // Definindo instancia do express.
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Importando JWT para autenticação de usuários na nossa API através de tokens aleatórios.
app.use(cors());

const JWTSecret = "duiwqhdjklsankdlkasn2131@3489749812$@$(&*(*($%@*kdsandklsa"; // Definindo a chave secreta que é usada para criação do token!.

const bodyParser = require('body-parser'); // Importando BodyParser
app.use(bodyParser.urlencoded({ extended: false })); // Definindo o uso do BodyParser
app.use(bodyParser.json()); // Definindo o uso do BodyParser

// Criando banco de dados falsos, com dois arrays, um de games e outro de usuários para serem autenticados
let DB = {
    games: [

        {
            id: 1,
            title: 'Bayonetta ',
            year: 2009,
            price: 36
        },

        {
            id: 2,
            title: 'Subnautica',
            year: 2014,
            price: 57
        },

        {
            id: 3,
            title: 'Hogwarts Legacy',
            year: 2023,
            price: 250
        },
    ],

    users: [

        {
            id: 1,
            name: "Guilherme Libório Machado",
            email: "liborio.ofc@gmail.com",
            password: "nodejs<3"
        },

        {
            id: 2,
            name: "Victor",
            email: "victor.gg@gmail.com",
            password: "python<3"
        },
    ]
}

// Middleware
function adminAuth(req, res, next) { // Função middleware que faz a logica de autenticação entre a requisição e a resposta ao tentar acessar rotas que tem ela como parâmetro.

    const authToken = req.headers['authorization']; // Aqui definimos uma const que pega a chave token dentro do headers authorization.

    if (authToken != undefined) { // Fazemos uma condição em que se a chave token for indefinida, ele automaticamente vai direto par o else e retorna um erro 401, com uma mensagem "Token invalido"

        const bearer = authToken.split(' '); // Caso o token não seja invalido, nos pegamos todo o conteúdo e fazemos uma separação das strings, pois a chave vem acompanhada de uma palavra chave chamada bearer e usamos o split para separa o bearer do token.

        let token = bearer[1]; // Quando usamos o split logo acima, transformamos o que era só uma string, em um array com 2 string, com índice 0, 1, sendo o índice 0 (bearer) e o índice 1 o próprio token, então basicamente estamos armazenando nessa variável, o próprio token.

        jwt.verify(token, JWTSecret, (err, data) => { // Aqui estamos chamando o jwt com o método verify() para fazer a outra verificação de token, onde o jwt compara o token que foi enviado pelo usuário com o token que ele envio pro usuário, nessa função usamos 3 parâmetros, o 1 é o token que nos pegamos do usuário, aquele que usamos o split(), o 2 parâmetro é a chave secreta que definimos la no inicio que serve para gerar o token e o ultimo parâmetro é o callback onde fazemos as validações de erro.

            if (err) { // Se acontecer algum erro...
                res.status(401); // Retorne o statusCode 401 (Não autorizado!)
                res.json({ message: "Token inválido!" }) // E um json com uma mensagem de "Token inválido!"

            } else { // Caso não tenha nenhum erro...
                req.token = token;
                req.loggedUser = { id: data.id, email: data.email }; // Definimos uma variável que podemos usar nas rotas para retornar os dados de um usuário que foi autenticado com sucesso, no caso seu e-mail e seu ID.
                next();
            }

        });

    } else { // Chegamos nesse else somente se o token for indefinido.
        res.status(401); // Retornando o statusCode 401 (Não autorizado!)
        res.json({ error: "Token inválido" });
    }
}

// Rota que lista os games
app.get("/games", adminAuth, (req, res) => { // Rota get() para pegar o array de games e retornar para o usuário, caso ele passe pelas etapas de autenticação.

    res.statusCode = 200; // Caso ele passe na autenticação, retorna o statusCode 200 (Ok!)
    res.json({ user: req.loggedUser, games: DB.games }) // E retorna um JSON com os dados que armazenamos na variável req.loggedUser, email e ID, juntamente com os JSON dos games.

})

// Rota para pegar um game pelo id
app.get("/game/:id", adminAuth, (req, res) => { // Rota get() para pegar dentro do array de games, um JSON especifico, caso ele passe pelas etapas de autenticação.

    if (isNaN(req.params.id)) { // Fazemos uma verificação básica no ID, onde verificamos se ele não é um número.
        res.sendStatus(400); // Ele retorna um statusCode 400 (Requisição invalida!)

    } else { // Agora caso o ID seja um número...

        let id = parseInt(req.params.id); // Criamos uma variável para armazenar o valor do ID vindo da url convertido para número inteiro, caso venha desse jeito "2".
        let game = DB.games.find((gameItem) => gameItem.id == id); // Aqui criamos uma variável onde ela faz uma busca no banco de dados, onde verificamos se o ID recebido pelo cliente bate com o ID do nosso banco de dados. Ou seja, se ela enviou o ID 2 para ver um jogo em especifico, o jogo em especifico tem que ter o mesmo ID 2, caso não tenha, ele entra no ELSE que está logo abaixo.

        if (game != undefined) { // Aqui fazemos uma validação do ID recebido da variável game, se recebermos um ID de fato valido, entramos no IF.
            res.statusCode = 200;
            res.json(game);
        } else { // Caso seja invalido entramos no ELSE que basicamente só retorna um erro de Não encontrado.
            res.status(404);
            res.json({ message: "Nenhum game com esse ID foi encontrado no nosso banco de dados!" });
        }
    }
});

// Rota para criar um novo game
app.post("/game", adminAuth, (req, res) => { // Rota post() para criar um novo game, caso ele passe pelas etapas de autenticação.

    let { title, price, year } = req.body; // Primeiramente usamos o destructuring para pegar as variáveis que estão no JSON dos games.

    if (title == undefined || price == undefined || year == undefined) { // Aqui fazemos a primeira verificação onde se uma das 3 variáveis forem indefinidas vamos retornar um erro ao criar o game que o erro de:
        res.sendStatus(400); // Erro de Requisição inválida!
        return;
    }

    // Aqui basicamente definimos o preço do game e o ano de lançamento como tipo número, ou seja se colocarem na etapa de cadastro o número assim "2" ele automaticamente converte para 2, agora caso seja desse jeito "2a" ou "dois" ele vai entrar no if logo abaixo:
    price = Number(price);
    year = Number(year);

    if (!price || !year) { // Caso for passada uma string numérica invalida tipo "2a" ou "dois" ele vai entra nesse if e retornar uma bad request.
        res.sendStatus(400);
        return;
    }

    DB.games.push({ // Caso tudo seja valido, e passe pelas validações necessárias corretamente, você ira enviar para o array de games, o seu JSON corretamente, acrescentando um ID baseado na quantidade de indicies desse array + 1.

        id: DB.games.length + 1,
        title,
        price,
        year

    });

    res.sendStatus(201); // E juntamente com o envio do seu JSON, ele irá enviar ese statusCode 201 (Criado!)
});

// Rota para atualizar um game pelo id
app.put("/game/:id", adminAuth, (req, res) => { // Rota put() para editar games através do seu ID caso pesse pela autenticação corretamente.

    let id = Number(req.params.id); // Primeiro definimos o ID recebido como parâmetro como tipo Number().

    let game = DB.games.find(gameItem => gameItem.id == id); // Aqui criamos uma variável onde ela faz uma busca no banco de dados, onde verificamos se o ID recebido pelo cliente bate com o ID do nosso banco de dados. Ou seja, se ela enviou o ID 2 para ver um jogo em especifico, o jogo em especifico tem que ter o mesmo ID 2, caso não tenha, ele entra no ELSE que está logo abaixo.

    let { title, price, year } = req.body; // Aqui usamos o destructuring para pegar as variáveis que estão no JSON dos games.

    if (isNaN(req.params.id)) { // Fazemos uma verificação básica no ID, onde verificamos se ele não é um número.
        res.sendStatus(400); // Caso entro no if ele retorna o erro de sintaxe incorreta, pois não existe nenhum item no banco de dados com esse ID.
        return;
    }

    if (title == undefined && price == undefined && year == undefined) { // Aqui fazemos outra verificação onde se todos os itens forem indefinidos ao clicar no botão de editar será enviado um statusCode de requisição invalida.
        res.sendStatus(400)
    } else { // Caso um dos campos seja preenchido com o dado para ser editado ele entra no ELSE e realiza a edição do campo.

        game.title = title;
        game.price = price;
        game.year = year;

        res.sendStatus(201);
    }

});

// Rota para deletar um game pelo id
app.delete("/game/:id", adminAuth, (req, res) => { // Rota delete() para deletar um game pelo id, caso passe pela autenticação corretamente.

    if (isNaN(req.params.id)) { //Fazemos uma verificação básica no ID, onde verificamos se ele não é um número.
        res.sendStatus(400); // Caso entro no if ele retorna o erro de sintaxe incorreta, pois não existe nenhum item no banco de dados com esse ID.

    } else { // Caso seja um número ele entra no ELSE.

        let id = parseInt(req.params.id); // Onde fazemos a conversão do ID da url para número inteiro
        let index = DB.games.findIndex(g => g.id == id); // Aqui criamos uma variável que vai realizar uma busca no array de games baseada no ID que foi passado pelo usuário, e retornar o índice do array do elemento que satisfazer a função teste provida, ou seja se o ID enviado pelo usuário bater com o ID do item no banco de dados, ele vai retornar o índice desse elemento do array.

        if (index == -1) {  // Se o índice retornado for (-1) significa que nenhum elemento passou no teste, ou seja deu erro.
            res.sendStatus(404); // Caso seja (-1) ele enviara esse erro para o cliente.

        } else { // Agora caso encontremos o índice do elemento requisitado.

            DB.games.splice(index, 1); // Usamos o splice para deletar um item do array onde o primeiro parâmetro é o start onde ele começa, ou seja ele começa no próprio índice que foi pegamos da variável index e termina nele mesmo.
            res.sendStatus(200);
        }
    }

});

// Autenticação de Usuário com JWT
app.post("/auth", (req, res) => { // Rota post() onde criamos o token de autenticação, através de validações de credenciais do usuário.

    let = { email, password } = req.body; // Aqui pegamos as variáveis do JSON do array de usuários.
    let user = DB.users.find(u => u.email == email); // Aqui fazemos uma busca no banco de dados para autenticar se o e-email digitado na hora da criação do token é igual ao email cadastrado no banco de dados.

    if (user == undefined) { // E fazemos mais verificações onde se o e-mail for indefinido ele retornar os erros abaixo.

        res.status(404); // Envia o statusCode 404 (Não encontrado!)
        res.json({ err: "E-mail não existe na base de dados!" }); // E envia essa mensagem dizendo que não foi encontrado nenhum e-mail com essa sintaxe no banco de dados!
        return;
    }

    if (user.password == password) { // Fazemos mais verificação de senha onde se a senha passada for corretamente igual a senha cadastrada no banco de dados ele entra no if.

        jwt.sign({ id: user.id, email: user.email }, JWTSecret, { expiresIn: "48h" }, (err, token) => { // Aqui criamos um payload (informações dentro do token) que no primeiro parâmetro armazena informações do usuário que é dono desse token nesse caso é o ID dele e o e-mail, no segundo parâmetro passamos a chave secreta que serve para permitir que criemos esse token, no terceiro parâmetro passamos em quanto tempo queremos que esse token expire no caso defini 2 dias e o ultimo parâmetro passamos o callback porque a função é async, no callback passamos no parâmetro dele o erro e o token que vamos enviar ao usuário

            if (err) { // Caso ocorra algum erro, retornamos:
                res.status(400); // O statusCode 400 (Requisição invalida!)
                res.json({ error: "Falha interna" }); // E uma mensagem de erro passando "Falha interna"
                return;
            }
            res.status(201); // Caso não ocorra erro ele retorna o statusCode 201 ("Criado!")
            res.json({ token: token }); // E envia pro usuário em formato JSON o token para validação de entrada nas rotas que tem a middleware de autenticação.
        });

    } else { // Caso a senha senha invalida, ele retorna os erros abaixo

        res.status(401); // Envia o statusCode 401 (Não autorizado!)
        res.json({ err: "Credenciais inválidas!" }); // Juntamente com a mensagem de credenciais inválidas.
    }
});

app.listen(9090, (err) => {

    if (!err) {
        console.log('API RUNNING!');
    } else {
        err.sendStatus(500);
    }

});