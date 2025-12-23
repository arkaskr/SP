// import { db } from "./db";
// import { Ratelimit } from '@upstash/ratelimit'
// import { Redis } from '@upstash/redis'
export async function sendOTP(email: string, type: string): Promise<boolean> {
  try {
    console.log(email);
    const response = await fetch("/api/generateOTP", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        type: type,
      }),
    });
    console.log(response);
    if (response.ok) {
      return true;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function verifyOTP(
  email: string,
  otp: string,
  type: string
): Promise<boolean> {
  try {
    console.log(email);
    const response = await fetch("/api/verifyOTP", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        otp: otp,
        type: type,
      }),
    });
    console.log(response);
    if (response.ok) {
      return true;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
