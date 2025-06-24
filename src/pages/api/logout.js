import { serialize } from "cookie";

export default function handler(req, res) {
  // Nastaví cookie "token" s prázdnou hodnotou a okamžitou expirací
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), // okamžitá expirace = odstranění
    })
  );

  return res.status(200).json({ message: "Odhlášení proběhlo úspěšně" });
}
