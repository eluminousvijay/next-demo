import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Check if the table already exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public' 
        AND table_name = 'Users'
      );
    `;
    if (tableExists.rows[0].exists) {
      // Drop the existing table if it exists
      await sql`DROP TABLE IF EXISTS Users;`;
    }

    // Create the new table
    const result = await sql`
      CREATE TABLE Users (
        user_id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        mobile_number VARCHAR(20),
        email VARCHAR(255),
        role varchar(255) NOT NULL,
        status varchar(50) DEFAULT 'active' NOT NULL,
        password varchar(255) NOT NULL,
        token varchar(255) NOT NULL
      );
    `;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

