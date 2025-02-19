import { NextResponse } from "next/server";
import { db } from "@/db/drizzle"; // drizzle instance
import { tasks } from "@/db/schema"; // Tasks schema
import { eq } from "drizzle-orm";
// Delete a task

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("Hello from routes..........");

  try {
    // const { id } = await req.json();
    const taskId = Number(params.id); // Convert id from string to number
    console.log(taskId);

    if (!taskId) NextResponse.json({ success: false, msg: "ID not found" });
    await db.delete(tasks).where(eq(tasks.id, taskId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Selna wants to delete task");

    console.log("error in DELETE function", error);
  }
}

// Update task status

export async function PATCH(req: Request) {
  try {
    const { id, completed } = await req.json();
    console.log("Updation", id, completed);

    await db.update(tasks).set({ completed }).where(eq(tasks.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error while updating", error);
  }
}

// Edit task status

export async function POST(req: Request) {
  console.log("Editing Task");

  try {
    const { id, title, description, priority } = await req.json();
    console.log("Editing Task", id, title, description, priority);

    await db
      .update(tasks)
      .set({ title, description, priority })
      .where(eq(tasks.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error while editing task", error);
  }
}
