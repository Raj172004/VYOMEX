import nodemailer from "nodemailer";

import { env } from "../../config/env";

class MailerService {
  private readonly transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: env.MAIL_PORT === 465,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASSWORD,
      },
    });
  }

  async sendPasswordResetEmail(
    email: string,
    resetUrl: string
  ) {
    if (
      !env.MAIL_HOST ||
      !env.MAIL_USER ||
      !env.MAIL_PASSWORD ||
      !env.MAIL_FROM
    ) {
      throw new Error(
        "Mail service is not configured"
      );
    }

    return this.transporter.sendMail({
      from: env.MAIL_FROM,
      to: email,
      subject: "Reset your VYOMEX password",
      text: [
        "You requested a password reset for your VYOMEX account.",
        "",
        `Reset your password using this link: ${resetUrl}`,
        "",
        "This link will expire soon.",
        "",
        "If you did not request this, you can safely ignore this email.",
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Reset your VYOMEX password</h2>

          <p>
            You requested a password reset for your VYOMEX account.
          </p>

          <p>
            <a
              href="${resetUrl}"
              style="
                display:inline-block;
                padding:12px 20px;
                background:#111827;
                color:#ffffff;
                text-decoration:none;
                border-radius:6px;
              "
            >
              Reset Password
            </a>
          </p>

          <p>
            This link will expire soon.
          </p>

          <p>
            If you did not request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });
  }
}

export default new MailerService();
