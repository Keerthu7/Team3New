"use server";

import nodemailer from "nodemailer";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function sendEmailAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;

    console.log("Starting Lead submission for:", name);

    // Save to Database
    try {
      console.log("Attempting database connection...");
      await dbConnect();
      console.log("Database connected. Saving lead...");
      await Lead.create({
        name,
        email,
        phone,
        date,
        preferredTime: time,
        category: "Consultation",
        status: "New"
      });
      console.log("Lead saved to database successfully.");
    } catch (dbError) {
      console.error("Database save error:", dbError);
      // We continue even if DB fails to try sending email, or you can choose to fail here.
      // For now, I'll log and continue to see if it's the DB or Email failing.
    }

    console.log("Preparing email transporter...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, 
      },
    });

    // 1. Owner-க்கு (உங்களுக்கு) வரும் மெயில்
    console.log("Sending email to owner...");
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
    console.log("Sending confirmation email to user...");
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

    console.log("All steps completed successfully.");
    return { success: true };
  } catch (error: any) {
    console.error("General error in sendEmailAction:", error);
    return { success: false, error: error.message || "Failed to submit" };
  }
}