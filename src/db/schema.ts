// import {
//   integer,
//   text,
//   pgTable,
//   timestamp,
//   boolean,
// } from "drizzle-orm/pg-core";

// export const tasks = pgTable("tasks", {
//   id: integer("id").primaryKey(),
//   title: text("title").notNull(),
//   description: text("description"),
//   completed: boolean("completed").default(false),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });

import {
  // integer,
  serial, // Use serial instead of integer
  text,
  pgTable,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(), // Auto-incrementing ID
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
