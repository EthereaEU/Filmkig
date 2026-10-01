import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 - Filmkig",
  description: "Siden findes ikke.",
};

export default function GlobalNotFound() {
  return (
    <html lang="da">
      <body
        style={{
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafafa",
          color: "#18181b",
        }}
      >
        <div style={{ textAlign: "center", padding: "0 1rem" }}>
          <p
            style={{
              fontSize: "3.5rem",
              fontWeight: 700,
              color: "#18181b",
              margin: 0,
            }}
          >
            404
          </p>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 600, margin: "1rem 0 0.5rem" }}>
            Siden findes ikke
          </h1>
          <p style={{ color: "#71717a", margin: 0 }}>
            Det du leder efter, findes ikke - eller er flyttet.
          </p>
          <a
            href="/da"
            style={{
              display: "inline-block",
              marginTop: "1.75rem",
              background: "#18181b",
              color: "#fff",
              padding: "0.65rem 1.5rem",
              borderRadius: "999px",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Til forsiden
          </a>
        </div>
      </body>
    </html>
  );
}
