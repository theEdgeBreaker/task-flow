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
  console.log("sanjana");
  try {
    const { title, description, priority, dueDate, projectId } =
      await req.json();

    console.log("Selena", title, description, priority, dueDate, projectId);

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // ✅ Insert task without manually providing 'id' (let DB handle it)

    const parsedDueDate = dueDate ? new Date(dueDate) : null;

    const newTask = await db
      .insert(tasks)
      .values({
        // id,
        title,
        description,
        priority: priority || 2,
        completed: false,
        // dueDate: dueDate || null,
        dueDate: parsedDueDate,
        projectId: projectId || null,
      })
      .returning();

    return NextResponse.json({ success: true, task: newTask[0] });
  } catch (error) {
    const err = error as Error;
    console.error("Error inserting task:", err.message);

    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
