import { NextResponse } from "next/server";
import { contact } from "@/data/portfolio";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailAppPassword) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      });

      await transporter.sendMail({
        from: gmailUser,
        to: contact.email,
        replyTo: email,
        subject: `Portfolio contact from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, "<br>")}</p>`,
      });
    } else {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY ?? "",
          name,
          email,
          message,
          subject: `Portfolio — ${name}`,
          to: contact.email,
        }),
      });

      if (!process.env.WEB3FORMS_ACCESS_KEY) {
        const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(`Portfolio — ${name}`)}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;
        return NextResponse.json({
          ok: true,
          fallback: true,
          mailto,
          message: "Configure GMAIL_USER + GMAIL_APP_PASSWORD or WEB3FORMS_ACCESS_KEY for server delivery.",
        });
      }

      const data = await res.json();
      if (!data.success) {
        throw new Error("Web3Forms delivery failed");
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send message. Please email directly." },
      { status: 500 }
    );
  }
}
