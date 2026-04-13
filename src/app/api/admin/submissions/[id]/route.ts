import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDatabase, ContactForm } from "@/lib/db";

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    const result = await ContactForm.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      {
        message: "Error deleting submission",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
