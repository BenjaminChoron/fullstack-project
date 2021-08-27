-- Verify fullstack_project:init on pg

BEGIN;

SELECT "id" FROM "avatar" WHERE false;
SELECT "id" FROM "user" WHERE false;
SELECT "id" FROM "image" WHERE false;
SELECT "id" FROM "techno" WHERE false;
SELECT "id" FROM "post" WHERE false;
SELECT "id" FROM "project" WHERE false;
SELECT "id" FROM "message" WHERE false;

ROLLBACK;
