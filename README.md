# Jogo da Velha (TikTakToe)

A basic project for learning.

## Running the Back-End

1 - Run `npm install` in the root folder to download all necessary modules.
2 - Run `npm start` to start running the API. (You can use `nodemon start` if you want to make changes without restarting the API)

## Back-End Features

Inside the project there is a folder called `POSTMAN` in it there is a json file to be imported by Postman, this file has all the routes created in the API to be consumed.

There are four routes:

 `POST /game` - The game starts and returns the id and the first player.

 `POST /game/{id}/movement` - Make the desired move using the json below and use the id as a parameter for choosing the game.
 
 `POST /game/show` - Shows the current status of the game (use to see on the back end).

 `POST /game/get/{id}` - Returns the game array using the id (use for the front to update the information).

The body for the move is:
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

To send a movement in a position just follow the pattern below:
```
(x=0 y=2) | (x=1 y=2) | (x=2 y=2)
----------|-----------|----------
(x=0 y=1) | (x=1 y=1) | (x=2 y=1)
----------|-----------|----------
(x=0 y=0) | (x=1 y=0) | (x=2 y=0)
```

## Credits

Created with :heart: by Jaelcio Dutra.
