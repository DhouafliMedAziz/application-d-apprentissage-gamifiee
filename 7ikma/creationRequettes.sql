
   INFO  Running migrations.  

  0001_01_01_000000_create_users_table .......................................  
  ⇂ create table "users" ("id" bigserial not null primary key, "name" varchar(255) not null, "email" varchar(255) not null, "email_verified_at" timestamp(0) without time zone null, "password" varchar(255) not null, "remember_token" varchar(100) null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "users" add constraint "users_email_unique" unique ("email")  
  ⇂ create table "password_reset_tokens" ("email" varchar(255) not null, "token" varchar(255) not null, "created_at" timestamp(0) without time zone null)  
  ⇂ alter table "password_reset_tokens" add primary key ("email")  
  ⇂ create table "sessions" ("id" varchar(255) not null, "user_id" bigint null, "ip_address" varchar(45) null, "user_agent" text null, "payload" text not null, "last_activity" integer not null)  
  ⇂ alter table "sessions" add primary key ("id")  
  ⇂ create index "sessions_user_id_index" on "sessions" ("user_id")  
  ⇂ create index "sessions_last_activity_index" on "sessions" ("last_activity")  
  0001_01_01_000001_create_cache_table .......................................  
  ⇂ create table "cache" ("key" varchar(255) not null, "value" text not null, "expiration" integer not null)  
  ⇂ alter table "cache" add primary key ("key")  
  ⇂ create table "cache_locks" ("key" varchar(255) not null, "owner" varchar(255) not null, "expiration" integer not null)  
  ⇂ alter table "cache_locks" add primary key ("key")  
  0001_01_01_000002_create_jobs_table ........................................  
  ⇂ create table "jobs" ("id" bigserial not null primary key, "queue" varchar(255) not null, "payload" text not null, "attempts" smallint not null, "reserved_at" integer null, "available_at" integer not null, "created_at" integer not null)  
  ⇂ create index "jobs_queue_index" on "jobs" ("queue")  
  ⇂ create table "job_batches" ("id" varchar(255) not null, "name" varchar(255) not null, "total_jobs" integer not null, "pending_jobs" integer not null, "failed_jobs" integer not null, "failed_job_ids" text not null, "options" text null, "cancelled_at" integer null, "created_at" integer not null, "finished_at" integer null)  
  ⇂ alter table "job_batches" add primary key ("id")  
  ⇂ create table "failed_jobs" ("id" bigserial not null primary key, "uuid" varchar(255) not null, "connection" text not null, "queue" text not null, "payload" text not null, "exception" text not null, "failed_at" timestamp(0) without time zone not null default CURRENT_TIMESTAMP)  
  ⇂ alter table "failed_jobs" add constraint "failed_jobs_uuid_unique" unique ("uuid")  
  2025_04_20_171509_create_personal_access_tokens_table ......................  
  ⇂ create table "personal_access_tokens" ("id" bigserial not null primary key, "tokenable_type" varchar(255) not null, "tokenable_id" bigint not null, "name" varchar(255) not null, "token" varchar(64) not null, "abilities" text null, "last_used_at" timestamp(0) without time zone null, "expires_at" timestamp(0) without time zone null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ create index "personal_access_tokens_tokenable_type_tokenable_id_index" on "personal_access_tokens" ("tokenable_type", "tokenable_id")  
  ⇂ alter table "personal_access_tokens" add constraint "personal_access_tokens_token_unique" unique ("token")  
  CreateUtilisateursTable ....................................................  
  ⇂ create table "utilisateurs" ("utilisateur_id" uuid not null, "nom_d_utilisateur" varchar(32) not null, "email" varchar(255) not null, "mot_passe" varchar(128) not null, "profile_picture_URL" varchar(64) null, "points_totales" integer not null default '0', "coins" integer not null default '0', "email_verified_at" timestamp(0) without time zone null, "remember_token" varchar(100) null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null, "institut_education" varchar(255) not null, "pays" varchar(255) not null)  
  ⇂ alter table "utilisateurs" add primary key ("utilisateur_id")  
  ⇂ alter table "utilisateurs" add constraint "utilisateurs_nom_d_utilisateur_unique" unique ("nom_d_utilisateur")  
  ⇂ alter table "utilisateurs" add constraint "utilisateurs_email_unique" unique ("email")  
  CreateProfsTable ...........................................................  
  ⇂ create table "profs" ("utilisateur_id" uuid not null, "note_moyenne" float(53) not null default '0', "description" text null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "profs" add constraint "profs_utilisateur_id_foreign" foreign key ("utilisateur_id") references "utilisateurs" ("utilisateur_id") on delete cascade  
  ⇂ alter table "profs" add primary key ("utilisateur_id")  
  2025_04_20_194421_create_niveauxes_table ...................................  
  ⇂ create table "niveaux" ("id" serial not null, "name" varchar(255) not null, "points_required" integer not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "niveaux" add primary key ("id")  
  CreateEtudiantsTable .......................................................  
  ⇂ create table "etudiants" ("utilisateur_id" uuid not null, "description" text null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null, "grade" varchar(255) not null, "niveau_id" bigint not null)  
  ⇂ alter table "etudiants" add constraint "etudiants_utilisateur_id_foreign" foreign key ("utilisateur_id") references "utilisateurs" ("utilisateur_id") on delete cascade  
  ⇂ alter table "etudiants" add constraint "etudiants_niveau_id_foreign" foreign key ("niveau_id") references "niveaux" ("id") on delete cascade  
  ⇂ alter table "etudiants" add primary key ("utilisateur_id")  
  2025_04_20_213817_create_avatar_tabels .....................................  
  ⇂ create table "eye_options" ("id" bigserial not null, "value" varchar(255) not null, "image_kit_url" varchar(255) not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "eye_options" add primary key ("id")  
  ⇂ create table "hat_options" ("id" bigserial not null, "value" varchar(255) not null, "image_kit_url" varchar(255) not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "hat_options" add primary key ("id")  
  ⇂ create table "mouth_options" ("id" bigserial not null, "value" varchar(255) not null, "image_kit_url" varchar(255) not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "mouth_options" add primary key ("id")  
  ⇂ create table "color_options" ("id" bigserial not null, "value" varchar(255) not null, "image_kit_url" varchar(255) not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "color_options" add primary key ("id")  
  ⇂ create table "etudiant_eye_option" ("etudiant_id" uuid not null, "eye_option_id" bigint not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "etudiant_eye_option" add primary key ("etudiant_id", "eye_option_id")  
  ⇂ alter table "etudiant_eye_option" add constraint "etudiant_eye_option_etudiant_id_foreign" foreign key ("etudiant_id") references "etudiants" ("utilisateur_id") on delete cascade  
  ⇂ alter table "etudiant_eye_option" add constraint "etudiant_eye_option_eye_option_id_foreign" foreign key ("eye_option_id") references "eye_options" ("id") on delete cascade  
  ⇂ create table "etudiant_hat_option" ("etudiant_id" uuid not null, "hat_option_id" bigint not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "etudiant_hat_option" add primary key ("etudiant_id", "hat_option_id")  
  ⇂ alter table "etudiant_hat_option" add constraint "etudiant_hat_option_etudiant_id_foreign" foreign key ("etudiant_id") references "etudiants" ("utilisateur_id") on delete cascade  
  ⇂ alter table "etudiant_hat_option" add constraint "etudiant_hat_option_hat_option_id_foreign" foreign key ("hat_option_id") references "hat_options" ("id") on delete cascade  
  ⇂ create table "etudiant_mouth_option" ("etudiant_id" uuid not null, "mouth_option_id" bigint not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "etudiant_mouth_option" add primary key ("etudiant_id", "mouth_option_id")  
  ⇂ alter table "etudiant_mouth_option" add constraint "etudiant_mouth_option_etudiant_id_foreign" foreign key ("etudiant_id") references "etudiants" ("utilisateur_id") on delete cascade  
  ⇂ alter table "etudiant_mouth_option" add constraint "etudiant_mouth_option_mouth_option_id_foreign" foreign key ("mouth_option_id") references "mouth_options" ("id") on delete cascade  
  ⇂ create table "etudiant_color_option" ("etudiant_id" uuid not null, "color_option_id" bigint not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "etudiant_color_option" add primary key ("etudiant_id", "color_option_id")  
  ⇂ alter table "etudiant_color_option" add constraint "etudiant_color_option_etudiant_id_foreign" foreign key ("etudiant_id") references "etudiants" ("utilisateur_id") on delete cascade  
  ⇂ alter table "etudiant_color_option" add constraint "etudiant_color_option_color_option_id_foreign" foreign key ("color_option_id") references "color_options" ("id") on delete cascade  
  2025_04_20_223301_create_classes_table .....................................  
  ⇂ create table "classes" ("id_classe" serial not null primary key, "nom_de_classe" varchar(255) not null, "date_de_creation" date not null, "section" varchar(255) not null, "prof_id" uuid not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "classes" add constraint "classes_prof_id_foreign" foreign key ("prof_id") references "profs" ("utilisateur_id") on delete cascade  
  2025_04_20_224748_classe_etudiant ..........................................  
  ⇂ create table "classe_etudiant" ("id_classe" integer not null, "utilisateur_id" uuid not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "classe_etudiant" add constraint "classe_etudiant_utilisateur_id_foreign" foreign key ("utilisateur_id") references "etudiants" ("utilisateur_id") on delete cascade  
  ⇂ alter table "classe_etudiant" add constraint "classe_etudiant_id_classe_foreign" foreign key ("id_classe") references "classes" ("id_classe") on delete cascade  
  ⇂ alter table "classe_etudiant" add primary key ("id_classe", "utilisateur_id")  
  2025_04_20_233020_create_devoirs_table .....................................  
  ⇂ create table "devoirs" ("devoir_id" serial not null, "titre" varchar(255) not null, "points" integer not null, "max_score" integer not null, "date_final" date not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "devoirs" add primary key ("devoir_id")  
  2025_04_20_233026_create_devoir_etudiant_table .............................  
  ⇂ create table "devoir_etudiant" ("utilisateur_id" uuid not null, "devoir_id" integer not null, "score" integer null, "date_submission" timestamp(0) without time zone null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "devoir_etudiant" add constraint "devoir_etudiant_utilisateur_id_foreign" foreign key ("utilisateur_id") references "etudiants" ("utilisateur_id") on delete cascade  
  ⇂ alter table "devoir_etudiant" add constraint "devoir_etudiant_devoir_id_foreign" foreign key ("devoir_id") references "devoirs" ("devoir_id") on delete cascade  
  ⇂ alter table "devoir_etudiant" add primary key ("utilisateur_id", "devoir_id")  
  2025_04_20_234038_create_quizzes_table .....................................  
  ⇂ create table "quizzes" ("quiz_id" serial not null, "devoir_id" integer not null, "question" varchar(255) not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "quizzes" add constraint "quizzes_devoir_id_foreign" foreign key ("devoir_id") references "devoirs" ("devoir_id") on delete cascade  
  ⇂ alter table "quizzes" add primary key ("quiz_id")  
  2025_04_20_234437_create_choixes_table .....................................  
  ⇂ create table "choix" ("choix_id" serial not null, "quiz_id" integer not null, "contenu" text not null, "status" boolean not null default '0', "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "choix" add constraint "choix_quiz_id_foreign" foreign key ("quiz_id") references "quizzes" ("quiz_id") on delete cascade  
  ⇂ alter table "choix" add primary key ("choix_id")  
  2025_04_21_113448_create_cours_table .......................................  
  ⇂ create table "cours" ("cours_id" bigserial not null, "titre" varchar(100) not null, "description" text not null, "prix" decimal(8, 2) not null default '0', "status" varchar(255) check ("status" in ('free', 'public', 'private')) not null, "points" integer not null default '0', "note_moyenne_de_cours" decimal(3, 2) not null default '0', "utilisateur_id" uuid not null, "niveau_cours" varchar(255) check ("niveau_cours" in ('easy', 'medium', 'hard')) not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "cours" add constraint "cours_utilisateur_id_foreign" foreign key ("utilisateur_id") references "profs" ("utilisateur_id") on delete cascade  
  ⇂ alter table "cours" add primary key ("cours_id")  
  2025_04_21_135733_create_chapitres_table ...................................  
  ⇂ create table "chapitres" ("chapiter_id" serial not null, "cours_id" integer not null, "titre" varchar(255) not null, "chapiter_order" integer not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "chapitres" add constraint "chapitres_cours_id_foreign" foreign key ("cours_id") references "cours" ("cours_id") on delete cascade  
  ⇂ alter table "chapitres" add primary key ("chapiter_id")  
  2025_04_21_141135_cours_chapitre_table .....................................  

  2025_04_21_142303_create_matieres_table ....................................  
  ⇂ create table "matiers" ("matiere_id" serial not null, "nom" varchar(255) not null, "description" text null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "matiers" add primary key ("matiere_id")  
  2025_04_21_143831_cours_matiere ............................................  
  ⇂ create table "cours_matiere" ("cours_id" integer not null, "matiere_id" integer not null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "cours_matiere" add constraint "cours_matiere_cours_id_foreign" foreign key ("cours_id") references "cours" ("cours_id") on delete cascade  
  ⇂ alter table "cours_matiere" add constraint "cours_matiere_matiere_id_foreign" foreign key ("matiere_id") references "matiers" ("matiere_id") on delete cascade  
  ⇂ alter table "cours_matiere" add primary key ("cours_id", "matiere_id")  
  2025_04_22_131057_create_lessons_table .....................................  
  ⇂ create table "lessons" ("lesson_id" serial not null, "chapiter_id" integer not null, "titre" varchar(255) not null, "content_type" varchar(255) not null, "url" varchar(255) null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "lessons" add constraint "lessons_chapiter_id_foreign" foreign key ("chapiter_id") references "chapitres" ("chapiter_id") on delete cascade  
  ⇂ alter table "lessons" add primary key ("lesson_id")  
  2025_04_22_134908_inscreption ..............................................  
  ⇂ create table "inscreption" ("etudiant_id" uuid not null, "cours_id" integer not null, "date" timestamp(0) without time zone not null, "notation" decimal(1, 2) not null default '0', "taux_de_progression" decimal(3, 2) null default '0', "commentaire" text null, "created_at" timestamp(0) without time zone null, "updated_at" timestamp(0) without time zone null)  
  ⇂ alter table "inscreption" add constraint "inscreption_etudiant_id_foreign" foreign key ("etudiant_id") references "etudiants" ("utilisateur_id") on delete cascade  
  ⇂ alter table "inscreption" add constraint "inscreption_cours_id_foreign" foreign key ("cours_id") references "cours" ("cours_id") on delete cascade  
  ⇂ alter table "inscreption" add primary key ("etudiant_id", "cours_id")  

