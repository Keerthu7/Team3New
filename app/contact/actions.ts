"use server";

import nodemailer from "nodemailer";

export async function sendEmailAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "team3.siteinfo@gmail.com",
        pass: "gqagefnmvjqkwewk", 
      },
    });

    // 1. Owner-க்கு (உங்களுக்கு) வரும் மெயில்
    await transporter.sendMail({
      from: "team3.siteinfo@gmail.com",
      to: "team3.siteinfo@gmail.com",
      subject: `New Meeting Scheduled: ${date} at ${time}`,
      html: `
        <h3>New Consultation Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      `,
    });

    // 2. User-க்கு போகும் ஆட்டோ-ரிப்ளை
    await transporter.sendMail({
      from: "team3.siteinfo@gmail.com",
      to: email,
      subject: "Meeting Confirmed - Team 3 Associates",
      html: `
        <p>Hello ${name},</p>
        <p>Your consultation call with <strong>Team 3 Associates</strong> has been officially scheduled.</p>
        <p><strong>Date:</strong> ${date}<br/><strong>Time:</strong> ${time}</p>
        <p>We look forward to meeting with you!</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: "Failed to send email" };
  }
}