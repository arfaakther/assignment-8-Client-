import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export const getTokenFromServer = async () => {
  try {
    const jwtToken = await auth.api.getToken({
      headers: await headers(),
    });

    console.log("JWT Token exists:", !!jwtToken?.token);

    return jwtToken?.token;
  } catch (error) {
    console.error("JWT Token Error:", error);
    return null;
  }
};
