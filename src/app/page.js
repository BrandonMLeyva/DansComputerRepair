"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [localReviews, setLocalReviews] = useState([]);
  const [yelpReviews, setYelpReviews] = useState([]);
    
  const [index, setIndex] = useState(0);
  const [showYelp, setShowYelp] = useState(false);

  const reviews = showYelp ? yelpReviews : localReviews;

  useEffect(() => setIndex(0), [showYelp, localReviews.length]);

  useEffect(() => {
    async function fetchLocalReviews() {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("creationTime", { ascending: false });

      console.log("Fetched from Supabase:", data, "error:", error);

      if (error) console.error(error);
      const mappedReviews = data.map((review) => ({
        name: review.name,
        rating: review.rating,
        date: new Date(review.creationTime).toLocaleDateString(),
        text: review.reviewText,
        photos: review.photoUrl ? [review.photoUrl] : [],
      }));
      if (data) setLocalReviews(mappedReviews);
      else setLocalReviews(data);
    }

    fetchLocalReviews();
  }, []);

  useEffect(() => {
    async function fetchYelpReviews() {
      const { data, error } = await supabase
        .from("Yelp_Embed_Reviews")
        .select("*")
        .order("id", { ascending: true });

        console.log("Fetched Yelp embeds:", data, "error:", error);

        if (error) {
          console.error(error);
          return;
        }

        const mapped = data.map(row => ({
          embed: row.embed
        }));

        setYelpReviews(mapped);
    }

    fetchYelpReviews();
  }, []);
  

  useEffect(() => {
    if (showYelp) {
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
  }, [showYelp, index]);

  const nextReview = () => setIndex((index + 1) % reviews.length);
  const prevReview = () => setIndex((index - 1 + reviews.length) % reviews.length);

return (
  <main className="flex flex-col min-h-screen">
    {/* --- Blank space for future content --- */}
      <section className="flex-grow flex items-center justify-center"></section>

        {/* --- Yelp Reviews Section --- */}
        <section className="bg-white text-black py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-10">
              <h2 className="text-2xl font-semibold mb-10">
                {showYelp ? "Yelp Reviews For Dan’s Computer Repair" : "Local Reviews For Dan’s Computer Repair"}
              </h2>
              {/* Toggle Button */}
              <button
                onClick={() => setShowYelp(!showYelp)}
                setindex={0}
            
                  className="mb-8 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-800 transition"
              >
                {showYelp ? "Show Local Reviews" : "Show Yelp Reviews"}
              </button>
            </div>

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
    showYelp ? "items-center" : ""
  }`}
>

  {!reviews[index] ? (
    <p>No Reviews or Is Loading Them.....</p>
  ) :
  !showYelp ? (
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
      {/* Photo Gallery */}
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
    <div
    className="w-full"
     dangerouslySetInnerHTML={{ __html: reviews[index].embed }} 
     />
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