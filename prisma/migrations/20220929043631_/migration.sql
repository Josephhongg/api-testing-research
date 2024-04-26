/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `institutionId` on the `Department` table. All the data in the column will be lost.
  - Added the required column `departmentName` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institutionName` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "departmentName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Course_departmentName_fkey" FOREIGN KEY ("departmentName") REFERENCES "Department" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");
CREATE TABLE "new_Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "location" TEXT,
    "institutionName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Department_institutionName_fkey" FOREIGN KEY ("institutionName") REFERENCES "Institution" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Department" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
