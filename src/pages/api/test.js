// src/pages/api/test.js
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const test = db.collection("test");

    await test.insertOne({ message: "Hello from MongoDB!" });
    const all = await test.find({}).toArray();

    res.status(200).json(all);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
