"use client";
import { useEffect, useState } from "react";
import Services from "./home-services-title.js";


export default function Home() {
  const [index, setIndex] = useState(0);

  const reviews = [
    {
      type: "local",
      name: "Pat O",
      rating: 5,
      date: "6/18/2025",
      text: "Very honest, very knowledgeable. 5-star video card and power supply install. Will I use him again? Yes.",
      photos: [
      "/images/brokenlaptop.jpg",
    ],
    },
    {
      type: "local",
      name: "Jessica V",
      rating: 5,
      date: "5/12/2025",
      text: "Fast, friendly, and professional service. Fixed my laptop in no time!",
    },
    {type: "yelp", 
      embed: ` <span class="yelp-review" data-review-id="obNvJEsjNpDHE8P0Aji5uw" data-hostname="www.yelp.com">
      Read <a href="https://www.yelp.com/user_details?userid=ZcBia4ui1wKLn4r0fuUgBw" rel="nofollow noopener">Emmanuel N.</a>'s 
      <a href="https://www.yelp.com/biz/dan-s-computer-repair-sacramento-2?hrid=obNvJEsjNpDHE8P0Aji5uw" rel="nofollow noopener">review</a> 
      of <a href="https://www.yelp.com/biz/rm7wutt8n6aimfyUVd8Fqg" rel="nofollow noopener">Dan’s Computer Repair</a> on 
      <a href="https://www.yelp.com" rel="nofollow noopener">Yelp</a>
    </span>`},
    {type: "yelp", 
      embed:`<span class="yelp-review" data-review-id="o3f-kqbIRbJNKvaiHmOCrA" data-hostname="www.yelp.com">
      Read <a href="https://www.yelp.com/user_details?userid=UhDS4R5uewlxzbXxgaSb1g" rel="nofollow noopener">Jessica V.</a>'s 
      <a href="https://www.yelp.com/biz/dan-s-computer-repair-sacramento-2?hrid=o3f-kqbIRbJNKvaiHmOCrA" rel="nofollow noopener">review</a> 
      of <a href="https://www.yelp.com/biz/rm7wutt8n6aimfyUVd8Fqg" rel="nofollow noopener">Dan’s Computer Repair</a> on
      <a href="https://www.yelp.com" rel="nofollow noopener">Yelp</a>
    </span>`},
    {type: "yelp", 
      embed:`<span class="yelp-review" data-review-id="dS1bNufO6xIrpywibYK1cg" data-hostname="www.yelp.com">
      Read <a href="https://www.yelp.com/user_details?userid=nxRUDtmFRdbHtVSG5q_ekA" rel="nofollow noopener">Gerry Andre</a>'s 
      <a href="https://www.yelp.com/biz/dan-s-computer-repair-sacramento-2?hrid=dS1bNufO6xIrpywibYK1cg" rel="nofollow noopener">review</a> 
      of <a href="https://www.yelp.com/biz/rm7wutt8n6aimfyUVd8Fqg" rel="nofollow noopener">Dan’s Computer Repair</a> on 
      <a href="https://www.yelp.com" rel="nofollow noopener">Yelp</a>
    </span>`},
  ];

  useEffect(() => {
  if (reviews[index].type === "yelp") {
    const script = document.createElement("script");
    script.src = "https://www.yelp.com/embed/widgets.js";
    script.async = true;

    script.onload = () => {
      document.body.classList.add("yelp-embed-loaded");
    }
    document.body.appendChild(script);

    return () => {
      document.body.classList.remove("yelp-embed-loaded");
      document.body.removeChild(script);
    };
  }
}, [index]);

  const nextReview = () => setIndex((index + 1) % reviews.length);
  const prevReview = () => setIndex((index - 1 + reviews.length) % reviews.length);

return (
    <main className="flex flex-col min-h-screen">
      {/* --- Blank space for future content --- */}
      <section className="flex-grow flex items-center justify-center"></section>

      {/* Services Section */}
      <Services />

      {/* --- Yelp Reviews Section --- */}
      <section className="bg-white text-black py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-10">
            Reviews For Dan’s Computer Repair
          </h2>

          <div className="flex items-center justify-center gap-6">
            {/* < Button */}
            <button
              onClick={prevReview}
              className="text-3xl bg-white text-black px-4 py-2 rounded-full hover:bg-gray-700 transition"
            >
              {'<'}
            </button>

            {/* Review box */}
          <div
  key={index}
  className={`bg-gray-300 text-black rounded-lg p-8 w-full max-w-3xl min-h-[250px] flex flex-col justify-center text-center shadow-md ${
    reviews[index].type === "yelp" ? "items-stretch" : "items-center"
  }`}
>
  {reviews[index].type === "local" ? (
    <>
      <div className="flex justify-between w-full">
        <span className="font-semibold">{reviews[index].name}</span>
        
      </div>
      <div className="flex justify-between w-full mb-2 text-2xl">
        {"★".repeat(reviews[index].rating)}
        {"☆".repeat(5 - reviews[index].rating)}
        <span className="text-base ml-10">{reviews[index].date}</span>
      </div>
      <div className="flex justify-between w-full mb-2">
      <p className="text-base indent-0">{reviews[index].text}</p>
      </div>
      {/* ✅ Add this: Photo Gallery */}
    {reviews[index].photos && (
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {reviews[index].photos.map((photo, i) => (
          <img
            key={i}
            src={photo}
            alt={`Review photo ${i + 1}`}
            className="max-h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
          />
        ))}
      </div>
    )}
    </>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: reviews[index].embed }} />
  )}
</div>

            {/* > Button */}
            <button
              onClick={nextReview}
              className="text-3xl bg-white text-black px-4 py-2 rounded-full hover:bg-gray-700 transition"
            >
              {'>'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}