// In api/projects/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";

// Fetch all projects
export async function GET() {
  const allProjects = await db.select().from(projects);
  return NextResponse.json(allProjects);
}

// Add a new project
export async function POST(req: Request) {
  try {
    const { name, color } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newProject = await db
      .insert(projects)
      .values({
        name,
        color: color || "#4F46E5",
      })
      .returning();

    return NextResponse.json({ success: true, project: newProject[0] });
  } catch (error) {
    console.error("Error inserting project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
