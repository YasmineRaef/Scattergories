# Scattergories
#### General notes as a starting point: [Scattergories_notes.pdf](https://github.com/user-attachments/files/29338468/Scattergories_notes.pdf)

### Collaborators:

1. **Isaiah** [ikingdlc](https://github.com/ikingdlc)
2. **Ramanpreet** [Ramanpreet8 (Ramanpreet)](https://github.com/Ramanpreet8)
3. **Yasmine** [YasmineRaef (Yasmine_Raef_M.) · GitHub](https://github.com/YasmineRaef)

### Project:

Create an Express API Server (Prisma + PostgreSQL) with at least _three_ routes:

- **_POST_** `"/games"` : Create an ew `roomCode` game with a `letter` and a `topic`.
  -> The user creates a new game, the server validates the new `roomCode`, checks the database to make sure there are no duplicates, then creates a new game and saves it to the PostgreSQL database server.
- **_GET_** `"/games"` : Retrieves all the current games in the database and displays it to the user in a JSON format.
  -> The user asks for all the current games in the database, all the games records should be echoed in the localhost:3000 server including the `roomCode`, `letter`, and the `topic` of the game.
- **_GET_** `"/answer/"` : User types in the answer they have for the game, user should provide the `roomCode`, their `username`, and the answer they want to submit.
  -> The user tries to submit an answer to that specific game associated with the provided `gameCode`, the server should verify th following:
  a. The `roomCode` actually exists. Otherwise prompt the user to create the game first.
  b. The answer entered by the user should start with the `letter` associated with that specifc `roomCode`.

```js
//In the database we have:
{roomCode: "ABC123", letter: "S", topic: "sports"}
{roomCode: "AN123", letter: "D", topic: "animals"}
//The user entered the following as a probable answer:
{roomCode: "ABC123", username: "Username", answer: "soccer"} //--> Here the server should accept it as the answer starts with an 'S', and in the database, that game has the `letter` given S too.

//Example of rejected cases:
{roomCode: "ABC123", username: "Username", answer: "basketball"} //doesn't start with S
{roomCode: "ABCI23", username: "Username", answer: "soccer"} //Game Code doesn't exist in the db
```

---

### Built:

1. Created a prisma _boilerplate_ with the following commands:
   -> This setup is completely documented here: [citytech-ttpr-2026-summer/slides/2026-06-24.pdf at main · jonathan-chin/citytech-ttpr-2026-summer](https://github.com/jonathan-chin/citytech-ttpr-2026-summer/blob/main/slides/2026-06-24.pdf)

```bash
- yarn set version berry
- yarn init -y
- echo "nodeLinker: node-modules" >> .yarnrc.yml
- yarn add prisma @prisma/client @prisma/adapter-pg dotenv
- yarn add -D typescript ts-node-dev @types/node
- yarn tsc --init

```

2. Created a database with **PostgreSQL** having the following ERD:
   ![Database ERD](data/images/scattergories_game_erd.png)

3. Exported the database _scheme and data_ and uploaded the dumfile in the `/data` folder.

---

### Current work in progress:

1. Fix some Github sync issues with all teammates.
2. Connect the database server with our current prisma project and loading/generating the prisma models.
3. Add/load three records at least in the games table for testing routes.
4. Create the three routes to be visited using _express_. (i.e. **POST**`/games`, **GET**`"/games"`, **GET**`"/answer"`).
5. Add server checking and validating user inputs.

---

### Cloning:

###### Disclaimer: These steps where guided by copilot when prompted:

_Provide the cleanest step-by-step tutorial for easier cloning and collaboration in current Prisma project connected to PostreSQL server._

To get the project and database running on your end:

1. Clone the repo with `git clone` in a local folder after `cd`-ing inside the folder.
2. Copy the **.env.example** file in your **.env** file, and change the password (and port number if needed).
3. Run the following commands:

```bash
- yarn prisma migrate deploy
- yarn prisma generate
- yarn dev
```

---
