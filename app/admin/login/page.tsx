"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../../lib/firebase";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  /*
  =========================================================
  CLEAR LOGIN FORM WHEN PAGE OPENS
  =========================================================
  */

  useEffect(() => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setMessage("");
    setMessageType("");
  }, []);

  /*
  =========================================================
  CHECK AUTHENTICATION
  =========================================================
  */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          router.replace("/admin");
        } else {
          setCheckingAuth(false);
        }
      }
    );

    return () => unsubscribe();
  }, [router]);

  /*
  =========================================================
  LOGIN
  =========================================================
  */

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    if (!password) {
      setMessage("Please enter your password.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      setMessage(
        "Login successful. Redirecting..."
      );

      setMessageType("success");

      /*
      Clear password immediately
      */

      setPassword("");
      setShowPassword(false);

      router.replace("/admin");

    } catch (error: unknown) {
      console.error(
        "Admin login error:",
        error
      );

      const firebaseError = error as {
        code?: string;
      };

      switch (firebaseError.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setMessage(
            "Incorrect email or password."
          );
          break;

        case "auth/invalid-email":
          setMessage(
            "Please enter a valid email address."
          );
          break;

        case "auth/too-many-requests":
          setMessage(
            "Too many failed attempts. Please try again later."
          );
          break;

        case "auth/user-disabled":
          setMessage(
            "This admin account has been disabled."
          );
          break;

        default:
          setMessage(
            "Unable to sign in. Please check your details and try again."
          );
      }

      setMessageType("error");

      /*
      Clear password after failed login too
      */

      setPassword("");
      setShowPassword(false);

    } finally {
      setLoading(false);
    }
  };

  /*
  =========================================================
  FORGOT PASSWORD
  =========================================================
  */

  const handleForgotPassword = async () => {
    setMessage("");
    setMessageType("");

    if (!email.trim()) {
      setMessage(
        "Enter your admin email first, then click Forgot Password."
      );

      setMessageType("error");

      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(
        auth,
        email.trim()
      );

      setMessage(
        "Password reset email sent. Check your inbox and follow the instructions."
      );

      setMessageType("success");

      /*
      Clear password field
      */

      setPassword("");
      setShowPassword(false);

    } catch (error: unknown) {
      console.error(
        "Password reset error:",
        error
      );

      const firebaseError = error as {
        code?: string;
      };

      switch (firebaseError.code) {
        case "auth/invalid-email":
          setMessage(
            "Please enter a valid email address."
          );
          break;

        case "auth/user-not-found":
          setMessage(
            "No admin account was found with this email."
          );
          break;

        default:
          setMessage(
            "Unable to send password reset email. Please try again."
          );
      }

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  /*
  =========================================================
  AUTHENTICATION CHECK LOADING
  =========================================================
  */

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050807] text-white">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-lime-400/20 border-t-lime-400" />

          <p className="mt-4 text-sm text-gray-500">
            Checking authentication...
          </p>

        </div>

      </main>
    );
  }

  /*
  =========================================================
  LOGIN PAGE
  =========================================================
  */

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050807] px-5 text-white">

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/5 blur-3xl" />

      </div>


      {/* =====================================================
          LOGIN CONTAINER
      ===================================================== */}

      <div className="relative w-full max-w-md">


        {/* =====================================================
            LOGO
        ===================================================== */}

        <div className="mb-8 text-center">

          <div className="mx-auto h-20 w-20 overflow-hidden rounded-2xl">
  <img
    src="/images/logo.jpeg"
    alt="Kipsongoo Radio"
    className="h-full w-full object-contain"
  />
</div>

          <div className="mt-5 text-xl font-black tracking-[0.15em] text-lime-400">
            KIPSONGOO
          </div>

          <div className="mt-1 text-xs font-semibold tracking-[0.35em] text-gray-500">
            RADIO ADMIN
          </div>

        </div>


        {/* =====================================================
            LOGIN CARD
        ===================================================== */}

        <div className="rounded-3xl border border-white/10 bg-[#080d09] p-6 shadow-2xl sm:p-8">

          <div className="mb-7">

            <p className="text-xs font-black tracking-[0.25em] text-lime-400">
              ADMINISTRATOR
            </p>

            <h1 className="mt-2 text-3xl font-black">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in to manage Kipsongoo Radio.
            </p>

          </div>


          {/* =====================================================
              MESSAGE
          ===================================================== */}

          {message && (

            <div
              className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                messageType === "success"
                  ? "border-lime-400/20 bg-lime-400/10 text-lime-300"
                  : "border-red-400/20 bg-red-400/10 text-red-300"
              }`}
            >
              {message}
            </div>

          )}


          {/* =====================================================
              FORM
          ===================================================== */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
            autoComplete="off"
          >


            {/* =================================================
                EMAIL
            ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-bold text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="admin-email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your admin email"
                autoComplete="off"
                disabled={loading}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none placeholder:text-gray-700 transition focus:border-lime-400 disabled:cursor-not-allowed disabled:opacity-50"
              />

            </div>


            {/* =================================================
                PASSWORD
            ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-bold text-gray-300">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="admin-password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 pr-20 text-white outline-none placeholder:text-gray-700 transition focus:border-lime-400 disabled:cursor-not-allowed disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-bold text-gray-500 transition hover:text-lime-400 disabled:opacity-50"
                >
                  {showPassword
                    ? "HIDE"
                    : "SHOW"}
                </button>

              </div>

            </div>


            {/* =================================================
                FORGOT PASSWORD
            ================================================= */}

            <div className="text-right">

              <button
                type="button"
                onClick={
                  handleForgotPassword
                }
                disabled={loading}
                className="text-sm font-bold text-lime-400 transition hover:text-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Forgot Password?
              </button>

            </div>


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-lime-400 px-6 py-3.5 font-black text-black shadow-[0_0_25px_rgba(163,230,53,0.2)] transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "PLEASE WAIT..."
                : "LOGIN TO ADMIN PANEL"}
            </button>

          </form>

        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <p className="mt-6 text-center text-xs text-gray-600">
          Kipsongoo Radio • Admin Portal
        </p>

      </div>

    </main>
  );
}