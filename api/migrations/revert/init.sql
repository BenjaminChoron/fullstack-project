-- Revert fullstack_project:init from pg

BEGIN;

DROP TABLE "user", "post", "project_techno", "project", "avatar", "image", "techno", "message";

COMMIT;
