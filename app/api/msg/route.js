import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const body = await req.json();

  const db = (await clientPromise).db("chatapp");

  const message = {
    sender: body.sender,
    receiver: body.receiver,
    text: body.text,
    createdAt: new Date(),
    seen: false,
    delivered: true,
    deleted: false,
};
  const result = await db.collection("messages").insertOne(message);
  return NextResponse.json({
    _id: result.insertedId,
    ...message,
  });
}

export async function GET(req){
    const { searchParams } = new URL(req.url);

    const curruser = searchParams.get("curruser");

    const db = (await clientPromise).db("chatapp");
    const messages = await db
    .collection("messages")
    .find({
      $or: [
        {
          sender: curruser,
        },
        {
          receiver: curruser,
        },
      ],
    })
    .sort({ createdAt: 1 })
    .toArray();

  return NextResponse.json(messages);

}