import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const {
      userId,
      userName,
      userRole,
      userStatus,
      userPassword,
      userToken,
      userEmail,
      userMobile,
    } = await request.json();

    if (!userId || !userName || !userRole || !userStatus || !userPassword) {
      throw new Error("All user details are required");
    }

    // Check if the user with the specified ID exists
    const existingUser = await sql`
      SELECT * FROM Users WHERE user_id = ${userId};
    `;

    if (existingUser.rows.length === 0) {
      throw new Error("User not found");
    }

    // Update the user details
    await sql`
      UPDATE Users
      SET 
        name = ${userName},
        mobile_number = ${userMobile},
        email = ${userEmail},
        role = ${userRole},
        status = ${userStatus},
        password = ${userPassword},
        token = ${userToken}
      WHERE user_id = ${userId};
    `;

    // Fetch updated user data
    // const updatedUsers = await sql`SELECT * FROM Users;`;

    const data = {
    //   userData: updatedUsers,
      status: 200,
    };

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
