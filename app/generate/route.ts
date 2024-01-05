import { toDataURL } from "qrcode"

export const dynamic = "force-dynamic" // defaults to auto
export async function POST(request: Request) {
  const formData = await request.formData()
  const url = String(formData.get("url"))
  if (!url) return Response.json({ message: "passe uma url" })
  const generateQrcode = await toDataURL(url)
  return Response.json({
    data: generateQrcode,
  })
}
