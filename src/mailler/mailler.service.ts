import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MaillerService {
  private async transporter() {
    const testAccount = await nodemailer.createTestAccount();
    const transaport = nodemailer.createTransport({
      host: "localhost",
      port: 1025,
      ignoreTLS: true,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    return transaport;
  }

  async sendSignupConfirmation(userEmail: string) {
    (await this.transporter()).sendMail({
      from: "app@localhost.com",
      to: userEmail,
      subject: "Inscription",
      html: `<h3>Confirmation de l'inscription</h3>`,
    });
  }

  async sendResetPassword(userEmail: string, url: string, code: string) {
    (await this.transporter()).sendMail({
      from: "app@localhost.com",
      to: userEmail,
      subject: "reset password",
      html: `<p> 
                        <a href="${url}" target="_blank" rel="noopener noreferrer">
                            Réinitialiser mon mot de passe avec le code <strong>${code}</strong>
                        </a>
                    </p>
                    
                    <p> 
                        Le code expire dans 15MIN
                    </p>
                    `,
    });
  }
}
