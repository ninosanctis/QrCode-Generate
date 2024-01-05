"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import Image from "next/image"

export default function Home() {
  const [url, setUrl] = useState("")
  const [qrcode, setQrcode] = useState("")
  const [err, setErr] = useState("")
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!url) return setErr("Insira uma Url")
    const formData = new FormData()
    formData.append("url", url)
    const response = await fetch("/generate", {
      method: "POST",
      body: formData,
    })
    const data = await response.json()
    setQrcode(data.data)
    console.log(data.data)
  }

  return (
    <main className="bg-slate-500 min-h-screen">
      <form>
        <Input
          type="text"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {err.length > 0 && <p className="text-red-500">{err}</p>}
      </form>
      {qrcode.length > 0 && (
        <Image src={qrcode} alt="qrcode" width={400} height={400} />
      )}
      <Button onClick={(e) => handleSubmit(e)}>Generate</Button>
    </main>
  )
}
