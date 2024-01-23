import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const result = await sql`
      CREATE TABLE Contacts (
        contact_id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email VARCHAR(255),
        message varchar(255) NOT NULL,
        created_date timestamp DEFAULT current_timestamp
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
