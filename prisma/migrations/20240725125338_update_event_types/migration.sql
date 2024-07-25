/*
  Warnings:

  - You are about to drop the column `type` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "type",
ADD COLUMN     "eventLink" TEXT;

-- CreateTable
CREATE TABLE "EventType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EventType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EventType_name_key" ON "EventType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTypes_AB_unique" ON "_EventTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTypes_B_index" ON "_EventTypes"("B");

-- AddForeignKey
ALTER TABLE "_EventTypes" ADD CONSTRAINT "_EventTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTypes" ADD CONSTRAINT "_EventTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "EventType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
