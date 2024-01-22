import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { user_id } = await request.json();

    if (!user_id) {
      throw new Error("User ID is required for deletion");
    }

    await sql`
      DELETE FROM Users
      WHERE user_id = ${user_id};
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
