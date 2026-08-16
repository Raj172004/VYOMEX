import nodemailer from "nodemailer";

import { env } from "../config/env";

class MailService {
  private transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: env.MAIL_PORT === 465,
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASSWORD,
    },
  });

  async sendPasswordResetEmail(
    email: string,
    resetToken: string
  ): Promise<void> {
    const resetUrl =
      `${env.CLIENT_URL}/reset-password?token=${encodeURIComponent(
        resetToken
      )}`;

    await this.transporter.sendMail({
      from: env.MAIL_FROM || env.MAIL_USER,
      to: email,
      subject: "Reset your VYOMEX password",
      text:
        `You requested a password reset for your VYOMEX account.\n\n` +
        `Reset your password using this link:\n${resetUrl}\n\n` +
        `This link will expire in ${env.PASSWORD_RESET_EXPIRES_IN}.\n\n` +
        `If you did not request this, you can safely ignore this email.`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>VYOMEX Password Reset</h2>
          <p>You requested a password reset for your VYOMEX account.</p>
          <p>
            <a href="${resetUrl}">
              Reset your password
            </a>
          </p>
          <p>
            This link will expire in
            ${env.PASSWORD_RESET_EXPIRES_IN}.
          </p>
          <p>
            If you did not request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });
  }
}

export default new MailService();
