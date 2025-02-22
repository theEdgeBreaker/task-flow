import { NextResponse } from "next/server";
import { db } from "@/db/drizzle"; // drizzle instance
import { tasks } from "@/db/schema"; // Tasks schema
import { eq } from "drizzle-orm";
// Delete a task

// export async function DELETE(context: { params: { id: string } }) {
//   console.log("Hello from routes..........", context);

//   try {
//     const { params } = context;
//     console.log(params);

//     const taskId = Number(params.id); // Convert id from string to number
//     console.log(taskId);

//     if (!taskId) {
//       return NextResponse.json({ success: false, msg: "ID not found" });
//     }

//     await db.delete(tasks).where(eq(tasks.id, taskId));
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.log("Selena wants to delete task");

//     console.log("error in DELETE function", error);
//     return NextResponse.json({ success: false, msg: "Server Error" });
//   }
// }

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    console.log("Task ID:", id);

    if (isNaN(id)) {
      return NextResponse.json({ success: false, msg: "Invalid ID" });
    }

    await db.delete(tasks).where(eq(tasks.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("error", error);
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
