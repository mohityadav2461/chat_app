import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { name, email, image } = await req.json();

    const client = await clientPromise;
    const db = client.db("chatapp");

    let user = await db.collection("users").findOne({
      email,
    });

    if (!user) {
      const result = await db.collection("users").insertOne({
        name,
        email,
        image,
        createdAt: new Date(),
      });

      user = await db.collection("users").findOne({
        _id: result.insertedId,
      });
    }

    return NextResponse.json(user);

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


export async function GET() {
    const client = await clientPromise;
    const db = client.db("chatapp");

    const users = await db
        .collection("users")
        .find({})
        .toArray();

    return NextResponse.json(users);
}