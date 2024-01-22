import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      userName,
      userRole,
      userStatus,
      userPassword,
      userToken,
      userEmail,
      userMobile,
    } = await request.json();

    if (!userName || !userRole || !userStatus || !userPassword || !userToken) {
      throw new Error("All user details are required");
    }

    await sql`
      INSERT INTO Users (name, mobile_number, email, role, status, password, token)
      VALUES (${userName}, ${userMobile}, ${userEmail}, ${userRole}, ${userStatus}, ${userPassword}, ${userToken});
    `;

    const users = await sql`SELECT * FROM Users;`;
    const data = {
      userData: users,
      status: 200,
    };
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
