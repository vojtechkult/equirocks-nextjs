// src/pages/api/products.js
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const products = await db.collection("products").find({}).toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Chyba při načítání produktů" });
  }
}
