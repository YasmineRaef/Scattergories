import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import express from "express";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const PORT = 3000;
const app = express();
app.use(express.json());

//--- Generating a random letters and topics ---
const getRandomLetter = () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

const getRandomTopic = () => {
  const topics = [
    "Object",
    "Plants",
    "Animals",
    "Country",
    "Programming Concept",
    "Colors",
    "Sports",
    "Food",
  ];
  return topics[Math.floor(Math.random() * topics.length)];
};

//---- To create a new game record in the games table ----
const insertGame = async (roomID: string) => {
  try {
    return await prisma.games.create({
      data: {
        roomCode: roomID,
        letter: getRandomLetter(),
        topic: getRandomTopic(),
      },
    });
  } catch (error) {
    console.error("Failed to insert game: ", error);
  }
};

//-------------------- ROUTES --------------------------
app.get("/", (req, res) => {
  res.send("Welcome to our Scattergories game...👋😊");
});

//----- POST GAMES ROUTE --> FOR CREATING A NEW GAME --------
app.post("/games", async (req, res) => {
  try {
    const { roomCode } = req.body;
    if (!roomCode || roomCode.trim() === "") {
      console.log("No roomCode provided...");
      return res.status(400).json({
        message: "Please enter a room code to start. (i.e. json body)",
      });
    }
    if (typeof roomCode !== "string") {
      console.log("provided roomCode is not a string...");
      return res.status(400).json({
        message:
          "Please enter a valid room code containing a combination of numbers and characters. (e.g. Test123)",
      });
    }
    if (roomCode.length < 4 || roomCode.length > 6) {
      console.log("roomCode length is <= 3...");
      return res.status(400).json({
        message: "roomCode must be between 4 and 6 characters.",
      });
    }

    const newGame = await insertGame(roomCode);

    return res.status(201).json({
      message: "New Game created successfully!",
      game: newGame,
    });
  } catch (error) {
    console.log("User did not provide a req json body...");
    return res.status(500).json({
      message: "Please provide a roomCode in a json body.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

//------------- TO DATA IN DATABASE FOR TESTING -----------------
// (async () => {
//   console.log("Prisma Client connected successfully...");
//   const games = await prisma.games.findMany();
//   console.log("Games:", games);
//   await prisma.$disconnect();
// })();
