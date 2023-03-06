
## Documentação da API

#### Retorna todos games

```http
  GET /games
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_token` | `string` | **Obrigatório**.  O token da API para autenticação |

- Exemplo de resposta: 

      [
          {
              "id": 1,
              "title": "Game 1",
              "year": 2018,
              "price": 100
          },
          {
              "id": 2,
              "title": "Game 2",
              "year": 2018,
              "price": 300
          },
          {
              "id": 3,
              "title": "Game 3",
              "year": 2012,
              "price": 50
          }
      ]


#### Retorna somente um game

```http
  GET /game/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |
| `api_token` | `string` | **Obrigatório**.  O token da API para autenticação |

- Exemplo de resposta:


      {
          "id": 1,
          "title": "Game 1 ",
          "year": 2018,
          "price": 100
      }


#### Rota para criação de um novo game

```http
  POST /game
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_token` | `string` | **Obrigatório**.  O token da API para autenticação |

- Para criar um novo game, terá que ser preenchido em um JSON os campos de title, price e year, se todos forem preenchidos o game é criado.

#### Rota para edição dos dados do game

```http
  PUT /game
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer editar |
| `api_token` | `string` | **Obrigatório**.  O token da API para autenticação |

- Para editar um game já existente, você escolhe se prefere editar todos os campos, ou somente um campo, após feita a edição as alterações são empurradas diretamente para a rota GET /games onde são retornados todos os games.

#### Rota para criação de um novo game

```http
  DELETE /game
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer deletar|
| `api_token` | `string` | **Obrigatório**.  O token da API para autenticação |

- Para deletar um game, basicamente é preciso que seja passado como parâmetro o ID dele, onde depois disso será realizada uma verificação que consiste em fazer uma busca no array de games e se o índice retornado for (-1) será enviado um status code de erro (404), agora caso não seja, e o índice do game for encontrado, será usado o splice() para deletar o game em especifico.

#### Rota onde é passada as credenciais para que o TOKEN de autenticação (JWT) seja criado.

```http
  POST /auth
```

- Para criar o TOKEN de autenticação (JWT) é preciso passar um e-mail e senha validos para essa rota. Se os dados estiverem validados corretamente ele irá te retornar o TOKEN e você poderá se autenticar com ele.




