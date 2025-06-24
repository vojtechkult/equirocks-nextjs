import clientPromise from "@/lib/mongodb";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    // 1. Zkontroluj cookie a token
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token || null;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - token missing" });
    }

    // 2. Ověř JWT token
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }

    // 3. Pokud je token validní, načti produkty z DB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const products = await db.collection("products").find({}).toArray();

    res.status(200).json(products);

  } catch (error) {
    console.error("Chyba při načítání produktů:", error);
    res.status(500).json({ error: "Chyba při načítání produktů" });
  }
}