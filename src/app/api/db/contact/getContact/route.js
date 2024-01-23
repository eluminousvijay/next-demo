import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const contacts = await sql`SELECT * FROM Contacts;`;
    return NextResponse.json({ contacts: contacts.rows }, { status: 200 });
   
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
