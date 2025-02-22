// import { timeStamp } from "console";
import {
  integer,
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").default("#4F46E5"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").default(false),
  priority: integer("priority").default(2),
  dueDate: timestamp("due_date"),
  // Foreign key relationship to projects table - enforces referential integrity
  projectId: integer("project_id").references(() => projects.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// import { sql } from "drizzle-orm"; // ✅ Import sql from drizzle-orm
// import {
//   integer,
//   pgTable,
//   text,
//   boolean,
//   timestamp,
// } from "drizzle-orm/pg-core";

// export const projects = pgTable("projects", {
//   id: integer("id")
//     .primaryKey()
//     .default(sql`GENERATED ALWAYS AS IDENTITY`),
//   name: text("name").notNull(),
//   color: text("color").default("#4F46E5"),
//   createdAt: timestamp("created_at").defaultNow(),
// });

// export const tasks = pgTable("tasks", {
//   id: integer("id")
//     .primaryKey()
//     .default(sql`GENERATED ALWAYS AS IDENTITY`),
//   title: text("title").notNull(),
//   description: text("description"),
//   completed: boolean("completed").default(false),
//   priority: integer("priority").default(2),
//   dueDate: timestamp("due_date"),
//   projectId: integer("project_id").references(() => projects.id),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });
