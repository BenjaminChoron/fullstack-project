-- Revert fullstack_project:json_functions from pg

BEGIN;

DROP FUNCTION new_user(json);
DROP FUNCTION update_user(json);

DROP FUNCTION new_post(json);
DROP FUNCTION update_post(json);

DROP FUNCTION new_project(json);
DROP FUNCTION update_project(json);

DROP FUNCTION new_message(json);

DROP FUNCTION new_avatar(json);

DROP FUNCTION new_image(json);

COMMIT;
