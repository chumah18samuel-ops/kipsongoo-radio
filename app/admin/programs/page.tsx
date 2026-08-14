"use client";

import { useState } from "react";

type Program = {
  id: number;
  time: string;
  title: string;
  presenter: string;
  day: string;
  description: string;
  live: boolean;
};

const initialPrograms: Program[] = [
  {
    id: 1,
    time: "06:00 AM",
    title: "Morning Glory",
    presenter: "SAMCHU",
    day: "Monday - Friday",
    description:
      "Start your day with inspiration, worship, powerful conversations and community updates.",
    live: true,
  },
  {
    id: 2,
    time: "10:00 AM",
    title: "Kipsongoo Mid-Morning",
    presenter: "CHRISPUS #PAPA SEBEN",
    day: "Monday - Friday",
    description:
      "Music, entertainment, community stories and interaction with listeners.",
    live: false,
  },
  {
    id: 3,
    time: "02:00 PM",
    title: "Afternoon Drive",
    presenter: "PAPA DALIS",
    day: "Monday - Friday",
    description:
      "Your afternoon companion with music, news, entertainment and discussions.",
    live: false,
  },
];

export default function ProgramsAdmin() {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    time: "",
    title: "",
    presenter: "",
    day: "",
    description: "",
    live: false,
  });

  const resetForm = () => {
    setForm({
      time: "",
      title: "",
      presenter: "",
      day: "",
      description: "",
      live: false,
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.time || !form.presenter) {
      alert("Please fill in the program title, time and presenter.");
      return;
    }

    if (editingId !== null) {
      setPrograms((current) =>
        current.map((program) =>
          program.id === editingId
            ? {
                ...program,
                ...form,
              }
            : program
        )
      );
    } else {
      const newProgram: Program = {
        id: Date.now(),
        ...form,
      };

      setPrograms((current) => [...current, newProgram]);
    }

    resetForm();
  };

  const editProgram = (program: Program) => {
    setEditingId(program.id);

    setForm({
      time: program.time,
      title: program.title,
      presenter: program.presenter,
      day: program.day,
      description: program.description,
      live: program.live,
    });

    setShowForm(true);
  };

  const deleteProgram = (id: number) => {
    const confirmed = confirm(
      "Are you sure you want to delete this program?"
    );

    if (!confirmed) return;

    setPrograms((current) =>
      current.filter((program) => program.id !== id)
    );
  };

  const toggleLive = (id: number) => {
    setPrograms((current) =>
      current.map((program) =>
        program.id === id
          ? {
              ...program,
              live: !program.live,
            }
          : program
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#050807] text-white">
      {/* HEADER */}

      <div className="border-b border-white/10 bg-[#080d09]">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-black tracking-[0.3em] text-lime-400">
                KIPSONGOO RADIO ADMIN
              </p>

              <h1 className="mt-2 text-4xl font-black">
                Programs
              </h1>

              <p className="mt-2 text-gray-500">
                Manage your radio programs and schedules.
              </p>
            </div>

            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="rounded-full bg-lime-400 px-6 py-3 font-black text-black transition hover:scale-105 hover:bg-lime-300"
            >
              + ADD PROGRAM
            </button>
          </div>
        </div>
      </div>

      {/* FORM */}

      {showForm && (
        <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <div className="rounded-3xl border border-lime-400/20 bg-white/[0.03] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-black tracking-widest text-lime-400">
                  {editingId !== null
                    ? "EDIT PROGRAM"
                    : "NEW PROGRAM"}
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  {editingId !== null
                    ? "Update Program"
                    : "Add Radio Program"}
                </h2>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-gray-400 transition hover:border-red-400 hover:text-red-400"
              >
                CANCEL
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-5 md:grid-cols-2"
            >
              {/* TIME */}

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Program Time
                </label>

                <input
                  type="text"
                  placeholder="06:00 AM"
                  value={form.time}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      time: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                />
              </div>

              {/* TITLE */}

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Program Name
                </label>

                <input
                  type="text"
                  placeholder="Morning Glory"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                />
              </div>

              {/* PRESENTER */}

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Presenter
                </label>

                <input
                  type="text"
                  placeholder="SAMCHU"
                  value={form.presenter}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      presenter: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                />
              </div>

              {/* DAY */}

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Broadcasting Days
                </label>

                <input
                  type="text"
                  placeholder="Monday - Friday"
                  value={form.day}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      day: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                />
              </div>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Description
                </label>

                <textarea
                  rows={4}
                  placeholder="Describe the program..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-lime-400"
                />
              </div>

              {/* LIVE */}

              <div className="flex items-center gap-3">
                <input
                  id="live"
                  type="checkbox"
                  checked={form.live}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      live: e.target.checked,
                    })
                  }
                  className="h-5 w-5 accent-lime-400"
                />

                <label
                  htmlFor="live"
                  className="text-sm font-bold"
                >
                  Currently Live
                </label>
              </div>

              {/* SAVE */}

              <div className="flex justify-end md:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-lime-400 px-8 py-3 font-black text-black transition hover:scale-105 hover:bg-lime-300"
                >
                  {editingId !== null
                    ? "SAVE CHANGES"
                    : "ADD PROGRAM"}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* PROGRAM LIST */}

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-black tracking-widest text-lime-400">
              RADIO SCHEDULE
            </p>

            <h2 className="mt-2 text-2xl font-black">
              All Programs
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-400">
            {programs.length} Programs
          </div>
        </div>

        <div className="grid gap-5">
          {programs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 py-20 text-center">
              <div className="text-5xl">📻</div>

              <h3 className="mt-4 text-xl font-black">
                No programs yet
              </h3>

              <p className="mt-2 text-gray-500">
                Add your first Kipsongoo Radio program.
              </p>
            </div>
          ) : (
            programs.map((program, index) => (
              <div
                key={program.id}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-lime-400/30"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  {/* NUMBER */}

                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lg font-black text-lime-400 lg:flex">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* TIME */}

                  <div className="lg:w-40">
                    <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-black text-lime-400">
                      {program.time}
                    </span>

                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-gray-600">
                      {program.day}
                    </p>
                  </div>

                  {/* DETAILS */}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-black">
                        {program.title}
                      </h3>

                      {program.live && (
                        <span className="flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-[10px] font-black tracking-wider text-red-400">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                          LIVE
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm font-bold text-lime-400">
                      🎙️ {program.presenter}
                    </p>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                      {program.description}
                    </p>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => toggleLive(program.id)}
                      className={`rounded-xl border px-4 py-2 text-xs font-black transition ${
                        program.live
                          ? "border-red-400/20 text-red-400 hover:bg-red-400/10"
                          : "border-white/10 text-gray-400 hover:border-lime-400 hover:text-lime-400"
                      }`}
                    >
                      {program.live
                        ? "END LIVE"
                        : "SET LIVE"}
                    </button>

                    <button
                      type="button"
                      onClick={() => editProgram(program)}
                      className="rounded-xl border border-white/10 px-4 py-2 text-xs font-black text-gray-300 transition hover:border-lime-400 hover:text-lime-400"
                    >
                      EDIT
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteProgram(program.id)}
                      className="rounded-xl border border-red-400/10 px-4 py-2 text-xs font-black text-red-400 transition hover:bg-red-400/10"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}