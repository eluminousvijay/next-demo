import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // if (request.method === "POST") {
    const users = await sql`SELECT * FROM Users;`;
    //   alert(users);
    return NextResponse.json({ users: users.rows }, { status: 200 });
    // } else {
    //   return NextResponse.json(
    //     { error: "Method not allowed" },
    //     { status: 405 }
    //   );
    // }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
