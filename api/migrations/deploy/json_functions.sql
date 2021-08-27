-- Deploy fullstack_project:json_functions to pg

BEGIN;

CREATE FUNCTION new_user(myRecord json) RETURNS int AS $$
	INSERT INTO "user" ("first_name", "last_name", "email", "password", "avatar_id")
	VALUES (
		myRecord->>'first_name',
		myRecord->>'last_name',
		myRecord->>'email',
		myRecord->>'password',
		(myRecord->>'avatar_id')::int
	) RETURNING id
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_user(json) RETURNS void AS $$
	UPDATE "user" SET
		first_name=$1->>'first_name',
		last_name=$1->>'last_name',
		email=$1->>'email',
		password=$1->>'password',
		avatar_id=($1->>'avatar_id')::int
	WHERE id=($1->>'id')::int;
$$ LANGUAGE SQL STRICT;

COMMIT;
