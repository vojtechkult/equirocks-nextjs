import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

import '../app/globals.css';
import { useEffect, useState, useRef } from "react";
import Head from 'next/head';

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token || null;

  if (!token) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return { props: {} };
  } catch {
    return { redirect: { destination: '/login', permanent: false } };
  }
}

export default function SecurePage() {

    const logoutButton = useRef(null);

    async function fetchProducts() {
        try {
        const res = await fetch("/api/products");
        if (res.status === 401) {
            console.log("Chyba - nepřihlášený uživatel.");
            return;
        }
        const data = await res.json();
        console.log("Načtené produkty:", data);
        } catch (err) {
        console.error("Chyba při načítání produktů:", err);
        }
    }

    async function logout() {
        try {
            const res = await fetch('/api/logout');
            if (res.ok) {
            console.log('Uživatel byl odhlášen.');
            // Pokud chceš, můžeš zde přidat callback nebo další logiku
            } else {
            console.error('Chyba při odhlašování.');
            }
        } catch (err) {
            console.error('Chyba při spojení s API:', err);
        }
    }

    useEffect(() => {
        fetchProducts();

        logoutButton.current.onclick = function() {
            logout();
            window.location.href = "/login";
        }
    }, []);

return (
    <div>
        <h1>Přihlášení proběhlo úspěšně.</h1>
        <button ref={logoutButton}>Odhlásit se</button>
    </div>
);
}