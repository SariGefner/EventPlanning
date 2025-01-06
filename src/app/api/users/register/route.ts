import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { AuthModel } from "@/app/lib/models/user";
import connectDb from "@/app/lib/db/connectDb";
import { generateToken, setAuthCookies } from "@/middlewares/authMiddleware";

export async function POST(req: Request) { 
  try {
    const { email, password, userName } = await req.json();
    console.log(email, password, userName);

    if (!email || !password || !userName) {
      return NextResponse.json(
        { error: "Email, username, and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    await connectDb();

    const user = await AuthModel.findOne({ email: normalizedEmail });
    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("password", password, "user.password ", user.password);

      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = generateToken({
      userName: user.userName,
      email: normalizedEmail,
    });
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 ,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
              ? 'https://event-planning-six.vercel.app'
              : 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
      }
    );

    setAuthCookies(response, user.userName, token);

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Error during login" }, { status: 500 });
  }

}
