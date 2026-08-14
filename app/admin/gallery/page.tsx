
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
};

const CLOUDINARY_CLOUD_NAME = "py0t2qm8";
const CLOUDINARY_UPLOAD_PRESET = "kipsongoo_gallery";

export default function GalleryAdmin() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "EVENTS",
    date: "",
  });

  /*
  =========================================================
  LOAD GALLERY FROM FIREBASE FIRESTORE
  =========================================================
  */

  useEffect(() => {
    const galleryQuery = query(
      collection(db, "gallery"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      galleryQuery,
      (snapshot) => {
        const galleryData: GalleryItem[] =
          snapshot.docs.map((item) => {
            const data = item.data();

            return {
              id: item.id,
              title: data.title || "",
              category: data.category || "OTHER",
              image: data.image || "",
              date: data.date || "",
            };
          });

        setGallery(galleryData);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Error loading gallery:",
          error
        );

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  /*
  =========================================================
  RESET FORM
  =========================================================
  */

  const resetForm = () => {
    setForm({
      title: "",
      category: "EVENTS",
      date: "",
    });

    setSelectedFile(null);
    setPreview("");

    setEditingId(null);
    setShowForm(false);
  };

  /*
  =========================================================
  OPEN ADD FORM
  =========================================================
  */

  const openAddForm = () => {
    setForm({
      title: "",
      category: "EVENTS",
      date: "",
    });

    setSelectedFile(null);
    setPreview("");

    setEditingId(null);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  =========================================================
  SELECT IMAGE
  =========================================================
  */

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    /*
    CHECK FILE TYPE
    */

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    /*
    CHECK FILE SIZE
    */

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image must be less than 5MB.");
      return;
    }

    setSelectedFile(file);

    /*
    CREATE PREVIEW
    */

    const imagePreview =
      URL.createObjectURL(file);

    setPreview(imagePreview);
  };

  /*
  =========================================================
  EDIT ITEM
  =========================================================
  */

  const editItem = (item: GalleryItem) => {
    setEditingId(item.id);

    setForm({
      title: item.title,
      category: item.category,
      date: item.date,
    });

    setSelectedFile(null);

    /*
    SHOW CURRENT IMAGE
    */

    setPreview(item.image);

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  =========================================================
  UPLOAD IMAGE TO CLOUDINARY
  =========================================================
  */

  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      CLOUDINARY_UPLOAD_PRESET
    );

    formData.append(
      "folder",
      "kipsongoo-radio/gallery"
    );

    const uploadURL =
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    const response = await fetch(
      uploadURL,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "Cloudinary upload error:",
        errorText
      );

      throw new Error(
        "Cloudinary image upload failed."
      );
    }

    const data =
      await response.json();

    if (!data.secure_url) {
      throw new Error(
        "Cloudinary did not return an image URL."
      );
    }

    return {
      downloadURL:
        data.secure_url as string,
    };
  };

  /*
  =========================================================
  ADD / UPDATE GALLERY
  =========================================================
  */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter a photo title.");
      return;
    }

    /*
    NEW ITEM MUST HAVE IMAGE
    */

    if (!editingId && !selectedFile) {
      alert("Please select an image.");
      return;
    }

    try {
      setSaving(true);

      /*
      =====================================================
      UPDATE EXISTING PHOTO
      =====================================================
      */

      if (editingId) {
        const existingItem =
          gallery.find(
            (item) =>
              item.id === editingId
          );

        if (!existingItem) {
          throw new Error(
            "Gallery item not found."
          );
        }

        /*
        KEEP EXISTING IMAGE
        */

        let imageURL =
          existingItem.image;

        /*
        IF NEW IMAGE WAS SELECTED
        */

        if (selectedFile) {
          const uploaded =
            await uploadImage(
              selectedFile
            );

          imageURL =
            uploaded.downloadURL;
        }

        /*
        UPDATE FIRESTORE
        */

        await updateDoc(
          doc(
            db,
            "gallery",
            editingId
          ),
          {
            title:
              form.title.trim(),

            category:
              form.category,

            date:
              form.date.trim(),

            image:
              imageURL,

            updatedAt:
              serverTimestamp(),
          }
        );

        alert(
          "Gallery photo updated successfully."
        );
      }

      /*
      =====================================================
      ADD NEW PHOTO
      =====================================================
      */

      else {
        if (!selectedFile) {
          alert(
            "Please select an image."
          );

          return;
        }

        /*
        UPLOAD TO CLOUDINARY
        */

        const uploaded =
          await uploadImage(
            selectedFile
          );

        /*
        SAVE INFORMATION TO FIRESTORE
        */

        await addDoc(
          collection(db, "gallery"),
          {
            title:
              form.title.trim(),

            category:
              form.category,

            date:
              form.date.trim(),

            image:
              uploaded.downloadURL,

            createdAt:
              serverTimestamp(),

            updatedAt:
              serverTimestamp(),
          }
        );

        alert(
          "Photo uploaded successfully."
        );
      }

      resetForm();
    } catch (error) {
      console.error(
        "Error saving gallery:",
        error
      );

      if (
        error instanceof Error
      ) {
        alert(
          `Unable to save photo: ${error.message}`
        );
      } else {
        alert(
          "Unable to save photo. Please try again."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  /*
  =========================================================
  DELETE PHOTO
  =========================================================
  */

  const deleteItem = async (
    id: string
  ) => {
    const item =
      gallery.find(
        (galleryItem) =>
          galleryItem.id === id
      );

    if (!item) return;

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${item.title}"?`
      );

    if (!confirmed) return;

    try {
      /*
      DELETE FIRESTORE DOCUMENT
      */

      await deleteDoc(
        doc(
          db,
          "gallery",
          id
        )
      );

      /*
      NOTE:
      The image remains in Cloudinary.
      Cloudinary deletion requires a
      server-side authenticated request.
      */

      alert(
        "Gallery photo deleted successfully."
      );
    } catch (error) {
      console.error(
        "Error deleting gallery item:",
        error
      );

      alert(
        "Unable to delete gallery item."
      );
    }
  };

  /*
  =========================================================
  PAGE
  =========================================================
  */

  return (
    <main className="min-h-screen bg-[#050807] text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-white/10 bg-[#080d09]">

        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400 font-black text-black shadow-[0_0_25px_rgba(163,230,53,0.4)]">
                KR
              </div>

              <div>

                <div className="text-lg font-black tracking-wider text-lime-400">
                  KIPSONGOO
                </div>

                <div className="text-[10px] font-semibold tracking-[0.3em] text-gray-500">
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

        </div>

      </header>


      {/* =====================================================
          TITLE
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="text-xs font-black tracking-[0.3em] text-lime-400">
              CONTENT MANAGEMENT
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              GALLERY
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-gray-500">
              Upload, edit and manage Kipsongoo
              Radio photos.
            </p>

          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="rounded-full bg-lime-400 px-6 py-3 font-black text-black shadow-[0_0_25px_rgba(163,230,53,0.25)] transition hover:scale-105 hover:bg-lime-300"
          >
            + ADD PHOTO
          </button>

        </div>

      </section>


      {/* =====================================================
          FORM
      ===================================================== */}

      {showForm && (

        <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">

          <div className="rounded-3xl border border-lime-400/20 bg-[#080d09] p-6 shadow-2xl sm:p-8">

            <div className="mb-8 flex items-center justify-between">

              <div>

                <p className="text-xs font-black tracking-[0.25em] text-lime-400">
                  {editingId
                    ? "EDIT GALLERY ITEM"
                    : "NEW GALLERY ITEM"}
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  {editingId
                    ? "Update Photo"
                    : "Upload New Photo"}
                </h2>

              </div>

              <button
                type="button"
                onClick={resetForm}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xl text-gray-400 transition hover:border-red-400 hover:text-red-400"
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="grid gap-5 md:grid-cols-2"
            >

              {/* TITLE */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Photo Title
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title:
                        e.target.value,
                    })
                  }
                  placeholder="Kipsongoo Radio Launch"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-700 focus:border-lime-400"
                />

              </div>


              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
                >

                  <option value="EVENTS">
                    EVENTS
                  </option>

                  <option value="STUDIO">
                    STUDIO
                  </option>

                  <option value="PRESENTERS">
                    PRESENTERS
                  </option>

                  <option value="LIVE">
                    LIVE
                  </option>

                  <option value="COMMUNITY">
                    COMMUNITY
                  </option>

                  <option value="OTHER">
                    OTHER
                  </option>

                </select>

              </div>


              {/* DATE */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Date
                </label>

                <input
                  type="text"
                  value={form.date}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      date:
                        e.target.value,
                    })
                  }
                  placeholder="August 2026"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-700 focus:border-lime-400"
                />

              </div>


              {/* IMAGE UPLOAD */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  {editingId
                    ? "Replace Image (Optional)"
                    : "Upload Image"}
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleFileChange
                  }
                  className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-lime-400 file:px-4 file:py-2 file:font-bold file:text-black hover:file:bg-lime-300"
                />

                <p className="mt-2 text-xs text-gray-600">
                  JPG, PNG, WEBP • Maximum 5MB
                </p>

              </div>


              {/* PREVIEW */}

              {preview && (

                <div className="overflow-hidden rounded-2xl border border-white/10 md:col-span-2">

                  <div className="border-b border-white/10 bg-black/40 px-4 py-3 text-xs font-black tracking-wider text-gray-500">
                    IMAGE PREVIEW
                  </div>

                  <div className="flex justify-center bg-black p-5">

                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-96 rounded-xl object-contain"
                    />

                  </div>

                </div>

              )}


              {/* SUBMIT */}

              <div className="flex flex-col gap-3 pt-3 sm:flex-row md:col-span-2">

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-lime-400 px-8 py-3 font-black text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "UPLOADING..."
                    : editingId
                    ? "SAVE CHANGES"
                    : "UPLOAD PHOTO"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="rounded-xl border border-white/10 px-8 py-3 font-bold text-gray-400 transition hover:border-white/30 hover:text-white"
                >
                  CANCEL
                </button>

              </div>

            </form>

          </div>

        </section>

      )}


      {/* =====================================================
          GALLERY LIST
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <p className="text-xs font-black tracking-[0.25em] text-lime-400">
              CLOUDINARY MEDIA LIBRARY
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Gallery Photos
            </h2>

          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-400">
            {gallery.length} Photos
          </div>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-16 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-lime-400/20 border-t-lime-400" />

            <p className="mt-4 text-sm text-gray-500">
              Loading gallery from Firebase...
            </p>

          </div>

        )}


        {/* EMPTY */}

        {!loading &&
          gallery.length === 0 && (

            <div className="rounded-3xl border border-dashed border-white/10 py-24 text-center">

              <div className="text-6xl">
                🖼️
              </div>

              <h3 className="mt-5 text-xl font-black">
                Gallery is empty
              </h3>

              <p className="mt-2 text-gray-500">
                Upload your first
                Kipsongoo Radio photo.
              </p>

              <button
                type="button"
                onClick={openAddForm}
                className="mt-6 rounded-full bg-lime-400 px-6 py-3 text-sm font-black text-black"
              >
                + ADD PHOTO
              </button>

            </div>

          )}


        {/* GALLERY */}

        {!loading &&
          gallery.length > 0 && (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {gallery.map((item) => (

                <article
                  key={item.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-lime-400/30"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[4/3] overflow-hidden bg-[#080d09]">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1 text-[10px] font-black tracking-wider text-lime-400 backdrop-blur">
                      {item.category}
                    </div>

                  </div>


                  {/* DETAILS */}

                  <div className="p-5">

                    <h3 className="text-lg font-black">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      {item.date ||
                        "No date added"}
                    </p>

                    <div className="mt-5 flex gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          editItem(item)
                        }
                        className="flex-1 rounded-xl border border-white/10 py-2.5 text-xs font-black text-gray-300 transition hover:border-lime-400 hover:text-lime-400"
                      >
                        EDIT
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteItem(item.id)
                        }
                        className="flex-1 rounded-xl border border-red-400/10 py-2.5 text-xs font-black text-red-400 transition hover:bg-red-400/10"
                      >
                        DELETE
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

      </section>

    </main>
  );
  }