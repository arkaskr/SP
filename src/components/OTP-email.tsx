import * as React from "react";

interface EmailTemplateProps {
  otp: string;
  email: string;
}

export const VerificationEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ otp, email }) => (
  <div>
    <h3>
      Dear {email} , <br />
      Thank you for signing up with SynergiaPrep Pvt. Ltd.! To complete your
      registration and verify your email address, <br />
      Please use the following One-Time Password (OTP): <br />
      <strong>{otp}</strong>
      <br />
      This OTP is valid for 5 minutes. Please enter this code on the
      verification page to proceed. If you did not request this OTP, please
      ignore this email. We look forward to helping you achieve your academic
      goals! <br />
      Sincerely,
      <br />
      The SynergiaPrep Team
    </h3>
  </div>
);

export const ForgotPasswordEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ otp, email }) => (
  <div>
    <h3>
      Dear {email}, <br />
      We received a request to reset the password for your SynergiaPrep account.
      <br />
      Please use the following One-Time Password (OTP) to proceed with resetting
      your password:
      <br />
      <strong>{otp}</strong>
      <br />
      This OTP is valid for 5 minutes. Enter this code on the password reset
      page to continue.
      <br />
      If you did not request a password reset, please ignore this email or
      contact support if you have any concerns.
      <br />
      <br />
      Stay safe, <br />
      The SynergiaPrep Team
    </h3>
  </div>
);
