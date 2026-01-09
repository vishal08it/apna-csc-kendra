import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PanApplication from "@/models/panapplication";

export async function GET(req: NextRequest) {
  await connectDB();
  const draftId = req.nextUrl.searchParams.get("draftId");
  const data = await PanApplication.findById(draftId);
  return NextResponse.json(data);
}
