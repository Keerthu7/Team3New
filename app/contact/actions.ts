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

    // 1. Save to Database (CRITICAL)
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
      // Return success: false only if the primary goal (saving to DB) fails
      return { success: false, error: "Required: Database storage failed." };
    }

    // 2. Send Emails (NON-CRITICAL for UI success)
    // We wrap this in a separate try-catch so that configuration errors (e.g. missing MAIL_USER) 
    // do not break the user's experience if the data is already stored.
    try {
      if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
        console.warn("Email credentials missing. Skipping email notification.");
      } else {
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
          to: "prabhakar@t3associates.in, admin@t3associates.in",
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
        console.log("Emails sent successfully.");
      }
    } catch (emailError) {
      // Log the error but do NOT return success: false
      // This is because the lead is already saved in the DB (User's primary requirement)
      console.error("Email notification failed (Data was saved):", emailError);
    }

    console.log("Submission process completed.");
    return { success: true };
  } catch (error: any) {
    console.error("General error in sendEmailAction:", error);
    return { success: false, error: error.message || "Failed to submit" };
  }
}