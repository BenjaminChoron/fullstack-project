-- Deploy fullstack_project:init to pg

BEGIN;

CREATE TABLE "avatar" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "url" TEXT NOT NULL UNIQUE
);

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "avatar_id" INTEGER NOT NULL REFERENCES "avatar"("id")
);

CREATE TABLE "image" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "url" TEXT NOT NULL UNIQUE
);

CREATE TABLE "techno" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "image" TEXT NOT NULL UNIQUE
);

CREATE TABLE "post" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "image_id" INTEGER NOT NULL REFERENCES "image"("id")
);

CREATE TABLE "project" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "github_link" TEXT,
    "web_link" TEXT,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "image_id" INTEGER NOT NULL REFERENCES "image"("id")
);

CREATE TABLE "project_techno" (
    "project_id" INTEGER NOT NULL REFERENCES "project"("id"),
    "techno_id" INTEGER NOT NULL REFERENCES "techno"("id")
);

CREATE TABLE "message" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "from" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL
);

COMMIT;
