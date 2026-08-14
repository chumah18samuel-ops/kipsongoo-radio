"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

type Presenter = {
  id: string;
  name: string;
  nickname: string;
  role: string;
  program: string;
  bio: string;
  active: boolean;
};

export default function AdminPresentersPage() {
  const [presenters, setPresenters] = useState<Presenter[]>([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    nickname: "",
    role: "Radio Presenter",
    program: "",
    bio: "",
    active: true,
  });

  /*
   * =========================================================
   * LOAD PRESENTERS FROM FIREBASE
   * =========================================================
   */

  useEffect(() => {
    const presentersQuery = query(
      collection(db, "presenters"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      presentersQuery,
      (snapshot) => {
        const presenterData: Presenter[] = snapshot.docs.map((item) => {
          const data = item.data();

          return {
            id: item.id,
            name: data.name || "",
            nickname: data.nickname || "",
            role: data.role || "Radio Presenter",
            program: data.program || "",
            bio: data.bio || "",
            active: data.active ?? true,
          };
        });

        setPresenters(presenterData);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading presenters:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  /*
   * =========================================================
   * RESET FORM
   * =========================================================
   */

  const resetForm = () => {
    setForm({
      name: "",
      nickname: "",
      role: "Radio Presenter",
      program: "",
      bio: "",
      active: true,
    });

    setEditingId(null);
  };

  /*
   * =========================================================
   * OPEN ADD FORM
   * =========================================================
   */

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  /*
   * =========================================================
   * OPEN EDIT FORM
   * =========================================================
   */

  const openEditForm = (presenter: Presenter) => {
    setForm({
      name: presenter.name,
      nickname: presenter.nickname,
      role: presenter.role,
      program: presenter.program,
      bio: presenter.bio,
      active: presenter.active,
    });

    setEditingId(presenter.id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * =========================================================
   * ADD / UPDATE PRESENTER
   * =========================================================
   */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter the presenter name.");
      return;
    }

    if (!form.role.trim()) {
      alert("Please select the presenter role.");
      return;
    }

    try {
      setSaving(true);

      /*
       * UPDATE
       */

      if (editingId !== null) {
        const presenterRef = doc(
          db,
          "presenters",
          editingId
        );

        await updateDoc(presenterRef, {
          name: form.name.trim(),
          nickname: form.nickname.trim(),
          role: form.role,
          program: form.program.trim(),
          bio: form.bio.trim(),
          active: form.active,
          updatedAt: serverTimestamp(),
        });

        alert("Presenter updated successfully.");
      }

      /*
       * ADD
       */

      else {
        await addDoc(collection(db, "presenters"), {
          name: form.name.trim(),
          nickname: form.nickname.trim(),
          role: form.role,
          program: form.program.trim(),
          bio: form.bio.trim(),
          active: form.active,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        alert("Presenter added successfully.");
      }

      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving presenter:", error);

      alert(
        "Unable to save presenter. Check your Firebase connection and Firestore rules."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * =========================================================
   * DELETE PRESENTER
   * =========================================================
   */

  const deletePresenter = async (id: string) => {
    const presenter = presenters.find(
      (item) => item.id === id
    );

    if (!presenter) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${presenter.name}?`
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "presenters", id));

      alert("Presenter deleted successfully.");
    } catch (error) {
      console.error("Error deleting presenter:", error);

      alert(
        "Unable to delete presenter. Check your Firebase permissions."
      );
    }
  };

  /*
   * =========================================================
   * TOGGLE ACTIVE STATUS
   * =========================================================
   */

  const toggleStatus = async (presenter: Presenter) => {
    try {
      await updateDoc(
        doc(db, "presenters", presenter.id),
        {
          active: !presenter.active,
          updatedAt: serverTimestamp(),
        }
      );
    } catch (error) {
      console.error("Error updating presenter status:", error);

      alert("Unable to update presenter status.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050807] text-white">

      {/* HEADER */}

      <header className="border-b border-lime-400/10 bg-[#080d09]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 font-black text-black shadow-[0_0_25px_rgba(163,230,53,0.4)]">
              KR
            </div>

            <div>

              <div className="text-lg font-black tracking-wider text-lime-400">
                KIPSONGOO
              </div>

              <div className="text-[10px] tracking-[0.3em] text-gray-500">
                RADIO ADMIN
              </div>

            </div>

          </div>

          <Link
            href="/admin"
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold transition hover:border-lime-400 hover:text-lime-400"
          >
            ← DASHBOARD
          </Link>

        </div>

      </header>


      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* TITLE */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-xs font-black tracking-[0.25em] text-lime-400">
              CONTENT MANAGEMENT
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              PRESENTERS
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-gray-500">
              Add, edit and manage the people behind
              Kipsongoo Radio.
            </p>

          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="rounded-full bg-lime-400 px-6 py-3 font-black text-black shadow-[0_0_25px_rgba(163,230,53,0.25)] transition hover:scale-105 hover:bg-lime-300"
          >
            + ADD PRESENTER
          </button>

        </div>


        {/* FORM */}

        {showForm && (

          <div className="mt-10 rounded-3xl border border-lime-400/20 bg-[#080d09] p-6 shadow-2xl sm:p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-black tracking-[0.2em] text-lime-400">

                  {editingId !== null
                    ? "EDIT PRESENTER"
                    : "NEW PRESENTER"}

                </p>

                <h2 className="mt-2 text-2xl font-black">

                  {editingId !== null
                    ? "Update Presenter"
                    : "Add New Presenter"}

                </h2>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-red-400 hover:text-red-400"
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="mt-8 grid gap-5 md:grid-cols-2"
            >

              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Full / Display Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. SAMCHU"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-lime-400"
                />

              </div>


              {/* NICKNAME */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Stage Name / Nickname
                </label>

                <input
                  type="text"
                  value={form.nickname}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nickname: e.target.value,
                    })
                  }
                  placeholder="e.g. PAPA SEBEN"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-lime-400"
                />

              </div>


              {/* ROLE */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Role
                </label>

                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
                >

                  <option value="Radio Presenter">
                    Radio Presenter
                  </option>

                  <option value="Host">
                    Host
                  </option>

                  <option value="DJ">
                    DJ
                  </option>

                  <option value="News Presenter">
                    News Presenter
                  </option>

                  <option value="Technical Team">
                    Technical Team
                  </option>

                  <option value="Producer">
                    Producer
                  </option>

                </select>

              </div>


              {/* PROGRAM */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Program
                </label>

                <input
                  type="text"
                  value={form.program}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      program: e.target.value,
                    })
                  }
                  placeholder="e.g. Morning Glory"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-lime-400"
                />

              </div>


              {/* BIO */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Biography
                </label>

                <textarea
                  rows={4}
                  value={form.bio}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      bio: e.target.value,
                    })
                  }
                  placeholder="Write a short biography..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-lime-400"
                />

              </div>


              {/* STATUS */}

              <div className="md:col-span-2">

                <label className="flex cursor-pointer items-center gap-3">

                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        active: e.target.checked,
                      })
                    }
                    className="h-5 w-5 accent-lime-400"
                  />

                  <span className="text-sm font-bold">
                    Active presenter
                  </span>

                </label>

              </div>


              {/* BUTTONS */}

              <div className="flex flex-col gap-3 pt-3 sm:flex-row md:col-span-2">

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-lime-400 px-7 py-3 font-black text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {saving
                    ? "SAVING..."
                    : editingId !== null
                    ? "SAVE CHANGES"
                    : "ADD PRESENTER"}

                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="rounded-xl border border-white/10 px-7 py-3 font-bold text-gray-400 transition hover:border-white/30 hover:text-white"
                >
                  CANCEL
                </button>

              </div>

            </form>

          </div>

        )}


        {/* PRESENTER LIST */}

        <div className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-black">
                Current Presenters
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                {presenters.length} people in the station team
              </p>

            </div>

          </div>


          {/* LOADING */}

          {loading && (

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-lime-400/20 border-t-lime-400" />

              <p className="mt-4 text-sm text-gray-500">
                Loading presenters...
              </p>

            </div>

          )}


          {/* EMPTY */}

          {!loading && presenters.length === 0 && (

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">

              <div className="text-5xl">
                🎙️
              </div>

              <h3 className="mt-4 text-xl font-black">
                No presenters yet
              </h3>

              <p className="mt-2 text-gray-600">
                Click ADD PRESENTER to add your first presenter.
              </p>

            </div>

          )}


          {/* LIST */}

          {!loading && presenters.length > 0 && (

            <div className="grid gap-5 md:grid-cols-2">

              {presenters.map((presenter) => (

                <div
                  key={presenter.id}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-lime-400/20"
                >

                  <div className="flex items-start justify-between gap-4">

                    {/* AVATAR */}

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-300 to-green-700 text-xl font-black text-black">
                      {presenter.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>


                    {/* STATUS */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleStatus(presenter)
                      }
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        presenter.active
                          ? "bg-lime-400/10 text-lime-400"
                          : "bg-red-400/10 text-red-400"
                      }`}
                    >

                      {presenter.active
                        ? "ACTIVE"
                        : "INACTIVE"}

                    </button>

                  </div>


                  {/* INFO */}

                  <div className="mt-5">

                    <h3 className="text-2xl font-black">
                      {presenter.name}
                    </h3>

                    {presenter.nickname && (

                      <p className="mt-1 font-bold text-lime-400">
                        {presenter.nickname}
                      </p>

                    )}

                    <p className="mt-2 text-sm text-gray-500">
                      {presenter.role}
                    </p>


                    {presenter.program && (

                      <div className="mt-4 rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm">

                        <span className="text-gray-600">
                          Program:
                        </span>{" "}

                        <span className="font-bold text-gray-300">
                          {presenter.program}
                        </span>

                      </div>

                    )}


                    <p className="mt-4 text-sm leading-6 text-gray-500">
                      {presenter.bio}
                    </p>

                  </div>


                  {/* ACTIONS */}

                  <div className="mt-6 flex gap-3 border-t border-white/10 pt-5">

                    <button
                      type="button"
                      onClick={() =>
                        openEditForm(presenter)
                      }
                      className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-black transition hover:border-lime-400 hover:text-lime-400"
                    >
                      EDIT
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deletePresenter(presenter.id)
                      }
                      className="flex-1 rounded-xl border border-red-400/10 px-4 py-3 text-sm font-black text-red-400 transition hover:bg-red-400/10"
                    >
                      DELETE
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}