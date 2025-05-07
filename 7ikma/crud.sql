-- CRUD SQL Statements for All Tables
-- Replace parameter placeholders ($1, $2, ...) with real values.

-- 1. users
-- Create
INSERT INTO users (id, email, /* other columns */, created_at, updated_at)
VALUES ($1, $2, /* ..., */ $3, $4);
-- Read (by PK)
SELECT u.*
FROM users u
WHERE u.id = $1;
-- Update
UPDATE users u
SET email      = $2,
    /* other columns = $3, ... */
    updated_at = $3
WHERE u.id = $1;
-- Delete
DELETE FROM users
WHERE id = $1;

-- 2. password_reset_tokens
-- Create
INSERT INTO password_reset_tokens (email, token, created_at)
VALUES ($1, $2, $3);
-- Read
SELECT prt.*
FROM password_reset_tokens prt
WHERE prt.email = $1;
-- Update
UPDATE password_reset_tokens prt
SET token      = $2,
    created_at = $3
WHERE prt.email = $1;
-- Delete
DELETE FROM password_reset_tokens
WHERE email = $1;

-- 3. sessions
-- Create
INSERT INTO sessions (id, user_id, payload, last_activity)
VALUES ($1, $2, $3, $4);
-- Read
SELECT s.*
FROM sessions s
WHERE s.id = $1;
-- Update
UPDATE sessions s
SET user_id       = $2,
    payload       = $3,
    last_activity = $4
WHERE s.id = $1;
-- Delete
DELETE FROM sessions
WHERE id = $1;

-- 4. cache
-- Create
INSERT INTO cache (key, value, expiration)
VALUES ($1, $2, $3);
-- Read
SELECT c.*
FROM cache c
WHERE c.key = $1;
-- Update
UPDATE cache c
SET value      = $2,
    expiration = $3
WHERE c.key = $1;
-- Delete
DELETE FROM cache
WHERE key = $1;

-- 5. cache_locks
-- Create
INSERT INTO cache_locks (key, owner, expiration)
VALUES ($1, $2, $3);
-- Read
SELECT cl.*
FROM cache_locks cl
WHERE cl.key = $1;
-- Update
UPDATE cache_locks cl
SET owner      = $2,
    expiration = $3
WHERE cl.key = $1;
-- Delete
DELETE FROM cache_locks
WHERE key = $1;

-- 6. jobs
-- Create
INSERT INTO jobs (id, queue, payload, attempts, reserved_at, available_at, created_at)
VALUES ($1, $2, $3, $4, $5, $6, $7);
-- Read
SELECT j.*
FROM jobs j
WHERE j.id = $1;
-- Update
UPDATE jobs j
SET queue        = $2,
    payload      = $3,
    attempts     = $4,
    reserved_at  = $5,
    available_at = $6,
    created_at   = $7
WHERE j.id = $1;
-- Delete
DELETE FROM jobs
WHERE id = $1;

-- 7. job_batches
-- Create
INSERT INTO job_batches (id, name, queue, payload, attempts, reserved_at, created_at, finished_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
-- Read
SELECT jb.*
FROM job_batches jb
WHERE jb.id = $1;
-- Update
UPDATE job_batches jb
SET name         = $2,
    queue        = $3,
    payload      = $4,
    attempts     = $5,
    reserved_at  = $6,
    created_at   = $7,
    finished_at  = $8
WHERE jb.id = $1;
-- Delete
DELETE FROM job_batches
WHERE id = $1;

-- 8. failed_jobs
-- Create
INSERT INTO failed_jobs (id, uuid, connection, queue, payload, exception, failed_at)
VALUES ($1, $2, $3, $4, $5, $6, $7);
-- Read
SELECT fj.*
FROM failed_jobs fj
WHERE fj.id = $1;
-- Update
UPDATE failed_jobs fj
SET uuid       = $2,
    connection = $3,
    queue      = $4,
    payload    = $5,
    exception  = $6,
    failed_at  = $7
WHERE fj.id = $1;
-- Delete
DELETE FROM failed_jobs
WHERE id = $1;

-- 9. niveaux
-- Create
INSERT INTO niveaux (id, name, /* created_at, updated_at */)
VALUES ($1, $2, /* $3, $4 */);
-- Read
SELECT n.*
FROM niveaux n
WHERE n.id = $1;
-- Update
UPDATE niveaux n
SET name       = $2,
    updated_at = $3
WHERE n.id = $1;
-- Delete
DELETE FROM niveaux
WHERE id = $1;

-- 10. etudiants
-- Create
INSERT INTO etudiants (utilisateur_id, /* other columns */, grade, niveau_id, created_at, updated_at)
VALUES ($1, /* ... */, $2, $3, $4, $5);
-- Read
SELECT e.*, n.name AS niveau_name
FROM etudiants e
LEFT JOIN niveaux n ON e.niveau_id = n.id
WHERE e.utilisateur_id = $1;
-- Update
UPDATE etudiants e
SET grade      = $2,
    niveau_id  = $3,
    updated_at = $4
WHERE e.utilisateur_id = $1;
-- Delete
DELETE FROM etudiants
WHERE utilisateur_id = $1;

-- 11. cours
-- Create
INSERT INTO cours (cours_id, titre, description, /* created_at, updated_at */)
VALUES ($1, $2, $3, /* $4, $5 */);
-- Read
SELECT c.*
FROM cours c
WHERE c.cours_id = $1;
-- Update
UPDATE cours c
SET titre      = $2,
    description = $3,
    updated_at  = $4
WHERE c.cours_id = $1;
-- Delete
DELETE FROM cours
WHERE cours_id = $1;

-- 12. chapitres
-- Create
INSERT INTO chapitres (chapiter_id, cours_id, titre, /* created_at, updated_at */)
VALUES ($1, $2, $3, /* $4, $5 */);
-- Read
SELECT ch.*, c.titre AS cours_titre
FROM chapitres ch
LEFT JOIN cours c ON ch.cours_id = c.cours_id
WHERE ch.chapiter_id = $1;
-- Update
UPDATE chapitres ch
SET titre      = $2,
    updated_at = $3
WHERE ch.chapiter_id = $1;
-- Delete
DELETE FROM chapitres
WHERE chapiter_id = $1;

-- 13. matiers
-- Create
INSERT INTO matiers (matiere_id, nom, /* created_at, updated_at */)
VALUES ($1, $2, /* $3, $4 */);
-- Read
SELECT m.*
FROM matiers m
WHERE m.matiere_id = $1;
-- Update
UPDATE matiers m
SET nom        = $2,
    updated_at = $3
WHERE m.matiere_id = $1;
-- Delete
DELETE FROM matiers
WHERE matiere_id = $1;

-- 14. cours_matiere (junction)
-- Create
INSERT INTO cours_matiere (cours_id, matiere_id)
VALUES ($1, $2);
-- Read
SELECT cm.*, c.titre AS cours_titre, m.nom AS matiere_nom
FROM cours_matiere cm
LEFT JOIN cours c    ON cm.cours_id    = c.cours_id
LEFT JOIN matiers m  ON cm.matiere_id  = m.matiere_id
WHERE cm.cours_id = $1 AND cm.matiere_id = $2;
-- Update (no non-PK columns)
-- Delete
DELETE FROM cours_matiere
WHERE cours_id = $1 AND matiere_id = $2;

-- 15. lessons
-- Create
INSERT INTO lessons (lesson_id, chapiter_id, titre, /* created_at, updated_at */)
VALUES ($1, $2, $3, /* $4, $5 */);
-- Read
SELECT l.*, ch.titre AS chapitre_titre, c.titre AS cours_titre
FROM lessons l
LEFT JOIN chapitres ch ON l.chapiter_id = ch.chapiter_id
LEFT JOIN cours c      ON ch.cours_id     = c.cours_id
WHERE l.lesson_id = $1;
-- Update
UPDATE lessons l
SET titre      = $2,
    updated_at = $3
WHERE l.lesson_id = $1;
-- Delete
DELETE FROM lessons
WHERE lesson_id = $1;

-- 16. inscreption
-- Create
INSERT INTO inscreption (etudiant_id, cours_id, /* created_at, updated_at */)
VALUES ($1, $2, /* $3, $4 */);
-- Read
SELECT i.*, e.utilisateur_id, c.titre
FROM inscreption i
LEFT JOIN etudiants e ON i.etudiant_id = e.utilisateur_id
LEFT JOIN cours     c ON i.cours_id    = c.cours_id
WHERE i.etudiant_id = $1 AND i.cours_id = $2;
-- Update (none)
-- Delete
DELETE FROM inscreption
WHERE etudiant_id = $1 AND cours_id = $2;

-- 17. devoirs
-- Create
INSERT INTO devoirs (devoir_id, titre, /* created_at, updated_at */)
VALUES ($1, $2, /* $3, $4 */);
-- Read
SELECT d.*
FROM devoirs d
WHERE d.devoir_id = $1;
-- Update
UPDATE devoirs d
SET titre      = $2,
    updated_at = $3
WHERE d.devoir_id = $1;
-- Delete
DELETE FROM devoirs
WHERE devoir_id = $1;

-- 18. devoir_etudiant
-- Create
INSERT INTO devoir_etudiant (utilisateur_id, devoir_id, /* created_at, updated_at */)
VALUES ($1, $2, /* $3, $4 */);
-- Read
SELECT de.*, e.grade, d.titre
FROM devoir_etudiant de
LEFT JOIN etudiants e ON de.utilisateur_id = e.utilisateur_id
LEFT JOIN devoirs   d ON de.devoir_id      = d.devoir_id
WHERE de.utilisateur_id = $1 AND de.devoir_id = $2;
-- Update (none)
-- Delete
DELETE FROM devoir_etudiant
WHERE utilisateur_id = $1 AND devoir_id = $2;

-- 19. quizzes
-- Create
INSERT INTO quizzes (quiz_id, devoir_id, /* created_at, updated_at */)
VALUES ($1, $2, /* $3, $4 */);
-- Read
SELECT q.*, d.titre AS devoir_titre
FROM quizzes q
LEFT JOIN devoirs d ON q.devoir_id = d.devoir_id
WHERE q.quiz_id = $1;
-- Update
UPDATE quizzes q
SET updated_at = $2
WHERE q.quiz_id = $1;
-- Delete
DELETE FROM quizzes
WHERE quiz_id = $1;

-- 20. choix
-- Create
INSERT INTO choix (choix_id, quiz_id, /* other columns */, created_at, updated_at)
VALUES ($1, $2, /* ... */, $3, $4);
-- Read
SELECT chx.*, q.quiz_id
FROM choix chx
LEFT JOIN quizzes q ON chx.quiz_id = q.quiz_id
WHERE chx.choix_id = $1;
-- Update
UPDATE choix chx
SET /* other columns = $2, */ updated_at = $3
WHERE chx.choix_id = $1;
-- Delete
DELETE FROM choix
WHERE choix_id = $1;
