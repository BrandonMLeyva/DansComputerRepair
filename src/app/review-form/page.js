"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function ReviewFormPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [file, setFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [hover, setHover] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    reviewTitle: "",
    rating: "",
    reviewText: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase.from("reviews").insert([
      {
        name: formData.name,
        emailOrPhone: formData.emailOrPhone,
        reviewTitle: formData.reviewTitle,
        rating: formData.rating,
        reviewText: formData.reviewText,
        photoUrl: photoUrl || null, 
      },
    ]);

    if (error){ 
      console.error(error);
      setErrorMessage("There was an error submitting your review. Please try again.");
    }
    else {
      console.log("Inserted:", data);
      setSuccessMessage("Thank you for your review!");
      setFormData({
        name: "",
        emailOrPhone: "",
        reviewTitle: "",
        rating: "",
        reviewText: "",
      });
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 10000);
  };

  const handlePhotoUpload = async () => {
    if (!file) return;
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("reviews-photos")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      setErrorMessage("Photo upload failed. Please try again.");
    }

    const { data: publicData } = supabase.storage
      .from("reviews-photos")
      .getPublicUrl(fileName);
    setPhotoUrl(publicData.publicUrl);
    setUploading(false);
  };

  

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Share Your Experience with Dan's Computer Repair
        </h1>

        <div className="border border-neutral-400 bg-white">
          {successMessage && (
            <div className="bg-green-100 text-green-800 p-4 border-b border-green-200">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-100 text-red-800 p-4 border-b border-red-200">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
            <div>
              <label className="block text-med mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border border-black px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-med mb-1">
                Email Or Phone Number
              </label>
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                placeholder="Email Address Or Phone Number"
                className="w-full border border-black px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-med mb-1">Review Title</label>
              <input
                type="text"
                name="reviewTitle"
                value={formData.reviewTitle}
                onChange={handleChange}
                placeholder="What would you like to name your review?"
                className="w-full border border-black px-3 py-2"
                required
              />
            </div>

            <fieldset>
              <legend className="block text-med mb-2">Rating</legend>
              <div className="flex gap-1 text-2xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, rating: String(star) }))
                    }
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                  >
                    {star <= (hover || Number(formData.rating)) ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </fieldset>

            <div>
              <label className="block text-med mb-1">Review</label>
              <input
                type="text"
                name="reviewText"
                value={formData.reviewText}
                onChange={handleChange}
                className="w-full border border-black py-8 px-3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-med mb-1">Upload a Photo</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="border border-black px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handlePhotoUpload}
                  disabled={!file || uploading}
                  className="bg-slate-300 text-black font-bold px-4 py-2 hover:bg-slate-400 disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload Photo"}
                </button>
              </div>

              {photoUrl && (
                <div className="mt-2">
                  <img
                    src={photoUrl}
                    alt="Uploaded preview"
                    className="w-32 h-32 object-cover border"
                  />
                  <p className="text-sm text-green-700 mt-1"> Uploaded successfully!</p>
                </div>
              )}
            </div>

            <div className="border-t border-neutral-300 p-6 md:p-8">
              <div className="flex justify-center items-center gap-2">
                <button
                  type="submit"
                  className="w-3/4 bg-[#8fbd7e] text-black px-4 py-2 font-bold hover:bg-[#6dab5c]"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}