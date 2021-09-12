-- Revert fullstack_project:draft from pg

BEGIN;

DROP FUNCTION new_draft(json);
DROP FUNCTION update_draft(json);

DROP TABLE draft_post;

COMMIT;
