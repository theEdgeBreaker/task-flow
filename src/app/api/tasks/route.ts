import { NextResponse } from "next/server";
import { db } from "@/db/drizzle"; // drizzle instance
import { tasks } from "@/db/schema"; // Tasks schema
import { eq } from "drizzle-orm";

// Fetch all tasks
export async function GET() {
  const allTasks = await db.select().from(tasks);
  return NextResponse.json(allTasks);
}

// Add a new task
// export async function POST(req: Request) {
//   const { title, description } = await req.json();
//   await db.insert(tasks).values({ title, description, completed: false });
//   return NextResponse.json({ success: true });
// }

export async function POST(req: Request) {
  // console.log("sanjana");
  try {
    const { title, description, id } = await req.json();

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

// Update task status
export async function PATCH(req: Request) {
  const { id, completed } = await req.json();
  await db.update(tasks).set({ completed }).where(eq(tasks.id, id));
  return NextResponse.json({ success: true });
}

// Delete a task
export async function DELETE({ params }: { params: { id: string } }) {
  console.log("Sanjana -------------------------");

  try {
    // const { id } = await req.json();
    const taskId = Number(params.id); // Convert id from string to number
    console.log(taskId);

    if (!taskId) NextResponse.json({ success: false, msg: "ID not found" });
    await db.delete(tasks).where(eq(tasks.id, taskId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Selna wants to delete task");

    console.log("DELETE ADitya", error);
  }
}
