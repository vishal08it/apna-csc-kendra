import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userId, password } = await req.json();

    const user = await User.findOne({ userId });

    if (!user) {
      return Response.json(
        { message: "User not found" },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return Response.json({ message: "Login successful" });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
