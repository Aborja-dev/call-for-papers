-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "typeEvent" TEXT NOT NULL,
    "startindDate" DATETIME NOT NULL,
    "endingDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);
