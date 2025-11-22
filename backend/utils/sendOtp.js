import Brevo from "@getbrevo/brevo";

export async function sendOtpEmail(email, otp) {
  try {
    const client = new Brevo.TransactionalEmailsApi();
    client.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const emailData = {
      sender: { name: "Your App Name", email: "noreply@yourapp.com" },
      to: [{ email }],
      subject: "Your OTP Code",
      htmlContent: `
        <h2>Your OTP Code</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="letter-spacing: 5px;">${otp}</h1>
        <p>This OTP expires in <strong>5 minutes</strong>.</p>
      `,
    };

    await client.sendTransacEmail(emailData);

    return { success: true, message: "OTP sent successfully!" };
  } catch (error) {
    console.log("Brevo Error:", error.message);
    return { success: false, error: error.message };
  }
}
