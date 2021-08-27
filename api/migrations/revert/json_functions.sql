-- Revert fullstack_project:json_functions from pg

BEGIN;

DROP FUNCTION new_user(json);
DROP FUNCTION update_user(json);

COMMIT;
