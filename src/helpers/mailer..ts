import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, name?: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER_ID,
        pass: process.env.GMAIL_SMTP_PASSWORD,
      },
    });

    const recipientName = name || email; // Fallback if name is not provided

    const htmlContent = `
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Thanks for connecting with Yatharth Gill</title>
        </head>
        <body>
          <h2>Hello ${recipientName}</h2>
          <p>Thanks for contacting me. 😊</p>
          <p>I'll connect with you soon.</p>
        </body>
      </html>
    `;

    const mailOptions = {
      from: "yatharth.gill.dev@gmail.com" ,
      to: email,
      subject: "Thanks for connecting!",
      html: htmlContent,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully: %s", mailResponse.messageId);

    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("❌ Error Sending Verification Email:", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
