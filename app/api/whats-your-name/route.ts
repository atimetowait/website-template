import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const trimmed = message.trim()

    const rootDir = process.cwd()
    const dataDir = path.join(rootDir, "data")
    const filePath = path.join(dataDir, "whats-your-name-responses.jsonl")

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    const entry = {
      message: trimmed,
      createdAt: new Date().toISOString(),
    }

    fs.appendFileSync(filePath, JSON.stringify(entry) + "\n", "utf8")

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const toAddress = process.env.SMTP_TO || "atimetowait@gmail.com"
    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@localhost"

    const safeHtml = trimmed
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "<br />")

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      subject: "New response: Who are you when no one is watching?",
      text: `${trimmed}\n\nSubmitted at: ${entry.createdAt}`,
      html: `<p>${safeHtml}</p><p><small>Submitted at: ${entry.createdAt}</small></p>`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error saving/sending what's your name response:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

