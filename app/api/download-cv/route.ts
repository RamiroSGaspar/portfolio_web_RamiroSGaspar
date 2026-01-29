import { readFile } from "fs/promises"
import { join } from "path"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "CV_RamiroSebastianGaspar_.pdf")
    const fileBuffer = await readFile(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="CV_RamiroSebastianGaspar.pdf"',
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("[v0] Error descargando CV:", error)
    return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 })
  }
}
