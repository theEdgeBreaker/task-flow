CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"completed" boolean DEFAULT false,
	"priority" integer DEFAULT 2,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
