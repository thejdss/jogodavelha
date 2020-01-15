# Jogo da Velha

Rode `npm install` na pasta raiz para baixar todos os módulos necessários.

## Rodar a API

Rode `npm start` para começar a rodar a API.

## "Front End"

Dentro do projeto tem uma pasta chamada `POSTMAN` nela tem um arquivo json para ser importado pelo Postman, nesse arquivo tem todas as rotas criadas na API para serem consumidas.

Existem três rotas:
 `POST /game - Começa o jogo e retorna a id necessária para jogar.`

 `POST /game/{id}/movement - Faz a jogada desejada usando um json e recebe a id do jogo como parametro.`
 
 `GET /game/show - Mostra a situação atual do jogo.`

O body para a jogada é:
```
    {
        "id" : "",
        "player": "",
        "position": {
            "x": 0,
            "y": 0
        }
    }
```

## Credits

Created with :heart: by Jaelcio Dutra.
