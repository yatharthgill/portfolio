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

    const recipientName = name || email;

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
      from: "yatharth.gill.dev@gmail.com",
      to: email,
      subject: "Thanks for connecting!",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "Verification email sent successfully" };
  } catch {
    return { success: false, message: "Failed to send verification email" };
  }
}
