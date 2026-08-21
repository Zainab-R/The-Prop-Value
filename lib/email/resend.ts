const RESEND_API_URL = "https://api.resend.com/emails";

// Resend's shared test sender — works without a verified domain.
// Swap for a verified address on your own domain once one is set up.
const FROM_ADDRESS = "Prop Value <onboarding@resend.dev>";

export async function sendOtpEmail(to: string, name: string, code: string) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to,
      subject: `${code} is your Prop Value verification code`,
      html: otpEmailHtml(name, code),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend request failed (${res.status}): ${body}`);
  }
}

function otpEmailHtml(name: string, code: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
      <h2 style="color: #102a43; margin-bottom: 4px;">The Prop <span style="color: #f97316;">Value</span></h2>
      <p style="color: #334155; font-size: 15px;">Hi ${escapeHtml(name)},</p>
      <p style="color: #334155; font-size: 15px;">
        Use the code below to verify your email and finish creating your Prop Value account.
        This code expires in 10 minutes.
      </p>
      <div style="margin: 24px 0; text-align: center;">
        <span style="display: inline-block; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #102a43; background: #f1f5f9; padding: 16px 24px; border-radius: 12px;">
          ${code}
        </span>
      </div>
      <p style="color: #64748b; font-size: 13px;">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
