import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "My Favorite Sweet Shoppe: handmade caramel apples and chocolates in Carnegie, PA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const drips = [
  { x: 40, w: 22, h: 90 },
  { x: 160, w: 14, h: 60 },
  { x: 290, w: 30, h: 130 },
  { x: 470, w: 16, h: 80 },
  { x: 640, w: 26, h: 150 },
  { x: 820, w: 14, h: 70 },
  { x: 1000, w: 34, h: 180 },
  { x: 1130, w: 18, h: 90 },
];

export default async function Image() {
  const [fraunces, figtree, apple] = await Promise.all([
    readFile(join(process.cwd(), "assets/Fraunces-Bold.ttf")),
    readFile(join(process.cwd(), "assets/Figtree-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/og-apple.png")),
  ]);
  const appleSrc = `data:image/png;base64,${apple.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#fbf3e4", fontFamily: "Figtree" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 34, background: "#c77f2e", display: "flex" }} />
        {drips.map((d) => (
          <div
            key={d.x}
            style={{
              position: "absolute",
              top: 20,
              left: d.x,
              width: d.w,
              height: d.h,
              background: "#c77f2e",
              borderRadius: `0 0 ${d.w}px ${d.w}px`,
              display: "flex",
            }}
          />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 110, background: "#f3e5cb", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 760 }}>
          <div style={{ fontSize: 30, color: "#b3141c", fontFamily: "Fraunces", marginBottom: 6 }}>My Favorite Sweet Shoppe</div>
          <div style={{ fontSize: 104, lineHeight: 0.98, color: "#2a1711", fontFamily: "Fraunces", letterSpacing: -3 }}>Handmade in Carnegie.</div>
          <div style={{ fontSize: 30, color: "#4e2c20", marginTop: 26, lineHeight: 1.3 }}>
            Gourmet caramel apples & hand-dipped chocolates, just outside Pittsburgh.
          </div>
        </div>
        <img src={appleSrc} width={317} height={520} alt="" style={{ position: "absolute", right: 90, bottom: 40 }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 700, style: "normal" },
        { name: "Figtree", data: figtree, weight: 600, style: "normal" },
      ],
    },
  );
}
