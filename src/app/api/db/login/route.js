import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {console.log("request>>", request);
    const { username, password } = await request.json();
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    const result = await sql`
      SELECT * FROM Users
      WHERE name = ${username} AND password = ${password};
    `;

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const token = generateToken(16);

      await sql`
        UPDATE Users
        SET token = ${token}
        WHERE user_id = ${user.user_id};
      `;
     
      const data = {
        userData: user,
        token: token,
        status: 200,
      };
      return NextResponse.json({ data }, { status: 200 });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

function generateToken(length) {
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}
