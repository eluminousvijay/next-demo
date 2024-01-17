import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Retrieve query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const userName = searchParams.get("userName");
    const userRole = searchParams.get("userRole");
    const userStatus = searchParams.get("userStatus");
    const userPassword = searchParams.get("userPassword");
    const userToken = searchParams.get("userToken");
    const userEmail = searchParams.get("userEmail");
    const userMobile = searchParams.get("userMobile");

    // Check if required parameters are provided
    if (!userName || !userRole || !userStatus || !userPassword || !userToken) {
      throw new Error("All user details are required");
    }

    // Insert a new user into the Users table
    await sql`
      INSERT INTO Users (name, mobile_number, email, role, status, password, token)
      VALUES (${userName}, ${userMobile}, ${userEmail}, ${userRole}, ${userStatus}, ${userPassword}, ${userToken});
    `;

    // Retrieve all users from the Users table
    const users = await sql`SELECT * FROM Users;`;

    // Return the list of users as a JSON response
    return NextResponse.json({ users: users.rows }, { status: 200 });
  } catch (error) {
    // Handle errors and return a JSON response with an error message
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
