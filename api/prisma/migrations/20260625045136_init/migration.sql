-- CreateTable
CREATE TABLE "answers" (
    "roomCodeID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "entered_answer" TEXT NOT NULL,
    "id" INTEGER NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "roomCode" TEXT NOT NULL,
    "letter" CHAR NOT NULL,
    "topic" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("roomCode")
);

-- CreateTable
CREATE TABLE "active_rooms" (
    "roomCodeID" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "active_rooms_pkey" PRIMARY KEY ("roomCodeID")
);

-- CreateIndex
CREATE UNIQUE INDEX "answers_roomCodeID_entered_answer_key" ON "answers"("roomCodeID", "entered_answer");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "roomCodeID" FOREIGN KEY ("roomCodeID") REFERENCES "games"("roomCode") ON DELETE NO ACTION ON UPDATE NO ACTION;
