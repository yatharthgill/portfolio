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
      <h2>Hello ${recipientName}</h2>
      <p>Thanks for contacting me.</p>
      <p>I'll connect with you soon.</p>
    `;

    const info = await transporter.sendMail({
      from: "yatharth.gill.dev@gmail.com",
      to: email,
      subject: "Thanks for connecting!",
      html: htmlContent,
    });

    // Gmail accepted the email
    return {
      success: true,
      messageId: info.messageId,
      accepted: info.accepted
    };

  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
}
