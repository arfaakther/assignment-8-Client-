
"use client";

import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";

const GoogleAuthButton = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google authentication error:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="btn btn-outline w-full border-gray-300"
    >
      {loading ? (
        "Connecting to Google..."
      ) : (
        <>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </>
      )}
    </button>
  );
};

export default GoogleAuthButton;
