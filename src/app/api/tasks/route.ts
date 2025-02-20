import { NextResponse } from "next/server";
import { db } from "@/db/drizzle"; // drizzle instance
import { tasks } from "@/db/schema"; // Tasks schema

// Fetch all tasks
export async function GET() {
  const allTasks = await db.select().from(tasks);
  return NextResponse.json(allTasks);
}

// Add a new task

export async function POST(req: Request) {
  // console.log("sanjana");
  try {
    const { title, description, id, priority } = await req.json();

    // console.log("Selena", title, description, id);

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // ✅ Insert task without manually providing 'id' (let DB handle it)
    const newTask = await db
      .insert(tasks)
      .values({
        id,
        title,
        description,
        priority: priority || 2,
        completed: false,
      })
      .returning();

    return NextResponse.json({ success: true, task: newTask[0] });
  } catch (error) {
    console.error("Error inserting task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
