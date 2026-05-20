-- CreateTable (username NOT NULL — backfill: UPDATE "User" SET username = email WHERE username IS NULL)
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "targetDays" INTEGER NOT NULL DEFAULT 180,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "estimatedHours" REAL NOT NULL,
    "dependsOn" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "NodeProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'locked',
    "startedAt" DATETIME,
    "masteredAt" DATETIME,
    CONSTRAINT "NodeProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NodeProgress_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topicId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "durationMin" INTEGER,
    "quality" INTEGER NOT NULL DEFAULT 5,
    CONSTRAINT "Resource_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topicId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    CONSTRAINT "Pill_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PillReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "pillId" TEXT NOT NULL,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "nextReview" DATETIME NOT NULL,
    "lastScore" INTEGER,
    CONSTRAINT "PillReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PillReview_pillId_fkey" FOREIGN KEY ("pillId") REFERENCES "Pill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Validation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "score" INTEGER,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "attemptedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Validation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Validation_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");

-- CreateIndex
CREATE INDEX "NodeProgress_userId_state_idx" ON "NodeProgress"("userId", "state");

-- CreateIndex
CREATE UNIQUE INDEX "NodeProgress_userId_topicId_key" ON "NodeProgress"("userId", "topicId");

-- CreateIndex
CREATE UNIQUE INDEX "PillReview_userId_pillId_key" ON "PillReview"("userId", "pillId");
