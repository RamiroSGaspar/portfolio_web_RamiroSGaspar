import { ImageResponse } from "next/og"

export const runtime = "edge"

const SIZE = { width: 1200, height: 630 }

/**
 * Dynamic OG image. Served as a route handler (instead of the
 * `opengraph-image.tsx` convention) because Turbopack in Next.js 16 has known
 * build issues with that file. See:
 *   https://github.com/vercel/next.js/issues/91676
 *   https://github.com/vercel/next.js/issues/87322
 *
 * Hit /api/og to preview. Linked from layout metadata so social previews stay
 * in sync with the live design without ever shipping a stale JPG.
 */
export async function GET() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#09090b",
        backgroundImage:
          "radial-gradient(circle at 12% 18%, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0) 45%), radial-gradient(circle at 88% 92%, rgba(249,115,22,0.10) 0%, rgba(249,115,22,0) 40%)",
        padding: "72px 80px",
        fontFamily:
          'Inter, "Helvetica Neue", "Segoe UI", system-ui, -apple-system, sans-serif',
        color: "#fafafa",
        position: "relative",
      }}
    >
      {/* subtle grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.6), transparent 70%)",
          display: "flex",
        }}
      />

      {/* TOP — brand mark + availability */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#a1a1aa",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0a",
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: 0,
            }}
          >
            R
          </div>
          <span>Portfolio</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 22px",
            borderRadius: 999,
            border: "1px solid rgba(34,197,94,0.35)",
            backgroundColor: "rgba(34,197,94,0.10)",
            color: "#86efac",
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: "#22c55e",
              display: "flex",
              boxShadow: "0 0 14px rgba(34,197,94,0.7)",
            }}
          />
          Abierto a oportunidades
        </div>
      </div>

      {/* MIDDLE — name + role + tagline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 1,
          maxWidth: 980,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#f97316",
            letterSpacing: "0.02em",
          }}
        >
          Data Scientist
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#fafafa",
          }}
        >
          Ramiro Sebastian
          <br />
          Gaspar
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#a1a1aa",
            lineHeight: 1.4,
            marginTop: 6,
          }}
        >
          Análisis de datos & pensamiento crítico.
        </div>
      </div>

      {/* BOTTOM — stack + URL */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          {["Python", "Power BI", "Jupyter", "SQL"].map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.10)",
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "#d4d4d8",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#71717a",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          ramirosgaspar.vercel.app
        </div>
      </div>
    </div>,
    SIZE,
  )
}
