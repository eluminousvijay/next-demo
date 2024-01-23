import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      throw new Error("All user details are required");
    }

    await sql`
      INSERT INTO Users (name, email, message)
      VALUES (${name}, ${email}, ${message});
    `;

    // const users = await sql`SELECT * FROM Users;`;
    const data = {
      //   userData: users,
      status: 200,
    };
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
