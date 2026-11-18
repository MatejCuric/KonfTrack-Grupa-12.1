const { BrevoClient } = require("@getbrevo/brevo");

// Šalje e-mail preko Brevo API-ja
async function sendEmail({ to, subject, text, html }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "KonfTrack";
  const replyTo = process.env.BREVO_REPLY_TO;

  // Provjera postoje li potrebni podaci
  if (!apiKey) {
    throw new Error("Nedostaje BREVO_API_KEY u .env datoteci.");
  }

  if (!senderEmail) {
    throw new Error("Nedostaje BREVO_SENDER_EMAIL u .env datoteci.");
  }

  // Kreira Brevo klijent
  const brevo = new BrevoClient({
    apiKey: apiKey,
  });

  // Priprema podataka e-maila
  const emailData = {
    sender: {
      name: senderName,
      email: senderEmail,
    },

    to: [
      {
        email: to,
      },
    ],

    subject: subject,
    textContent: text,
    htmlContent: html,
  };

  // Ako je postavljena Reply-To adresa, dodaje se
  if (replyTo) {
    emailData.replyTo = {
      email: replyTo,
    };
  }

  // Šalje e-mail preko Brevo API-ja
  const response = await brevo.transactionalEmails.sendTransacEmail(emailData);

  console.log("E-mail uspješno poslan:", response.messageId);

  return response;
}

// Šalje verifikacijski e-mail korisniku
async function sendVerificationEmail(email, verificationUrl) {
  const mailOptions = {
    to: email,

    subject: "Potvrda e-mail adrese - KonfTrack",

    text: `Pozdrav,

za potvrdu svoje e-mail adrese otvorite sljedeću poveznicu:

${verificationUrl}

Poveznica vrijedi 24 sata.

Ako se niste registrirali na KonfTrack, zanemarite ovu poruku.`,

    html: `
      <h2>Dobrodošli na KonfTrack!</h2>

      <p>
        Za potvrdu svoje e-mail adrese kliknite na poveznicu:
      </p>

      <p>
        <a href="${verificationUrl}">
          Potvrdi e-mail adresu
        </a>
      </p>

      <p>Poveznica vrijedi 24 sata.</p>

      <p>
        Ako se niste registrirali na KonfTrack,
        zanemarite ovu poruku.
      </p>
    `,
  };

  return await sendEmail(mailOptions);
}

module.exports = {
  sendVerificationEmail,
  sendEmail,
};
