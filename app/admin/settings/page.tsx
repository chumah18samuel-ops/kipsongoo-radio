"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    stationName: "Kipsongoo Radio",
    tagline: "Your Voice. Your Community. Your Radio.",
    description:
      "A community-focused digital radio platform created to inform, inspire, entertain and connect people.",
    email: "Chumah18samuel@gmail.com",
    whatsapp: "0723393968",
    timezone: "Africa/Nairobi",
    maintenance: false,
    showListenerCount: true,
    autoplay: false,
  });

  const [saved, setSaved] = useState(false);

  const update = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "kipsongoo-settings",
      JSON.stringify(settings)
    );

    setSaved(true);
  };

  return (
    <main className="min-h-screen bg-[#050807] text-white">
      {/* HEADER */}
      <header className="border-b border-lime-400/10 bg-[#080d09]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <Link
              href="/admin"
              className="text-sm font-bold text-gray-500 hover:text-lime-400"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-2 text-3xl font-black">
              Settings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your Kipsongoo Radio website settings.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 font-black text-black">
            KR
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        {/* STATION SETTINGS */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-black tracking-[0.25em] text-lime-400">
            STATION
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Station Information
          </h2>

          <div className="mt-7 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-300">
                Station Name
              </label>

              <input
                value={settings.stationName}
                onChange={(e) =>
                  update("stationName", e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-300">
                Tagline
              </label>

              <input
                value={settings.tagline}
                onChange={(e) =>
                  update("tagline", e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-300">
                Station Description
              </label>

              <textarea
                rows={5}
                value={settings.description}
                onChange={(e) =>
                  update("description", e.target.value)
                }
                className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
              />
            </div>
          </div>
        </div>

        {/* CONTACT SETTINGS */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-black tracking-[0.25em] text-lime-400">
            CONTACT
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Main Contact
          </h2>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-300">
                Email
              </label>

              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  update("email", e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-300">
                WhatsApp
              </label>

              <input
                value={settings.whatsapp}
                onChange={(e) =>
                  update("whatsapp", e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-gray-300">
                Timezone
              </label>

              <select
                value={settings.timezone}
                onChange={(e) =>
                  update("timezone", e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
              >
                <option value="Africa/Nairobi">
                  Africa/Nairobi — Kenya
                </option>

                <option value="UTC">
                  UTC
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* WEBSITE OPTIONS */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-black tracking-[0.25em] text-lime-400">
            WEBSITE
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Website Options
          </h2>

          <div className="mt-7 space-y-4">
            {/* MAINTENANCE */}
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5">
              <div>
                <p className="font-black">
                  Maintenance Mode
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Temporarily hide the public website.
                </p>
              </div>

              <input
                type="checkbox"
                checked={settings.maintenance}
                onChange={(e) =>
                  update("maintenance", e.target.checked)
                }
                className="h-5 w-5 accent-lime-400"
              />
            </label>

            {/* LISTENER COUNT */}
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5">
              <div>
                <p className="font-black">
                  Show Listener Count
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Display listener statistics on the website.
                </p>
              </div>

              <input
                type="checkbox"
                checked={settings.showListenerCount}
                onChange={(e) =>
                  update(
                    "showListenerCount",
                    e.target.checked
                  )
                }
                className="h-5 w-5 accent-lime-400"
              />
            </label>

            {/* AUTOPLAY */}
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5">
              <div>
                <p className="font-black">
                  Radio Autoplay
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Attempt to start the radio automatically.
                </p>
              </div>

              <input
                type="checkbox"
                checked={settings.autoplay}
                onChange={(e) =>
                  update("autoplay", e.target.checked)
                }
                className="h-5 w-5 accent-lime-400"
              />
            </label>
          </div>
        </div>

        {/* SAVE */}
        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#080d09] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {saved ? (
              <p className="font-bold text-lime-400">
                ✓ Settings saved successfully
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Save your changes before leaving this page.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={saveSettings}
            className="rounded-xl bg-lime-400 px-8 py-3 font-black text-black transition hover:scale-105 hover:bg-lime-300"
          >
            SAVE SETTINGS
          </button>
        </div>
      </section>
    </main>
  );
}