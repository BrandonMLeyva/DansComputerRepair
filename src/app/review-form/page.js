export default function ReviewFormPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <section className="mx-auto max-w-3xl p-6">

                {/*Title of the Page*/}
                <h1 className="text-2xl font-semibold mb-6">Share Your Experience with Dan's Computer Repair</h1>

                <div className="border border-neutral-400  bg-white">
                    <form className="p-6 md:p-8 space-y-4">


                        {/*User inserts their full name*/}
                        <div>
                            <label className="block text-med mb-1">Name</label>
                            <input
                                type="text"
                                name="Name"
                                placeholder="Full Name"
                                className="w-full border border-black px-3 py-2"
                            />
                        </div>

                        {/*User inputs their contact information*/}
                        <div>
                            <label className="block text-med mb-1">Email Or Phone Number</label>
                            <input
                                type="text"
                                name="EmailPhone"
                                placeholder="Email Address Or Phone Number"
                                className="w-full border border-black px-3 py-2"
                            />
                        </div>

                        {/*Users enters a title for their review*/}
                        <div>
                            <label className="block text-med mb-1">Review Title</label>
                            <input
                                type="text"
                                name="ReviewTitle"
                                placeholder="What would you like to name your review?"
                                className="w-full border border-black px-3 py-2"
                            />
                        </div>

                        {/*User clicks on radio buttons to rate out of 5 options*/}
                        <fieldset>
                            <legend className="block text-med mb-2">Rating</legend>
                            <div className="flex gap-4 items-center">
                                <input type="radio" id="star5" name="rating" value="5" />
                                <input type="radio" id="star4" name="rating" value="4" />
                                <input type="radio" id="star3" name="rating" value="3" />
                                <input type="radio" id="star2" name="rating" value="2" />
                                <input type="radio" id="star1" name="rating" value="1" />
                            </div>
                        </fieldset>

                        {/*User types out their review*/}
                        <div>
                            <label className="block text-med mb-1">Review</label>
                            <input
                                type="text"
                                name="Review"
                                placeholder=""
                                className="w-full border border-black py-8"
                            />
                        </div>


                        {/* Button to upload photos for the review*/}
                        <div className="mt-8">
                            <button type="submit" className="w-1/3 bg-slate-300 text-black font-bold py-2 hover:bg-slate-400">
                                Upload a Photo
                            </button>
                        </div>
                    </form>

                    {/*Button to submit the review.*/}
                    <div className="border-t border-neutral-300 p-6 md:p-8">
                        <div className="flex justify-center items-center gap-2">
                            <span className="text-sm text-neutral-600"></span>
                            <button type="button" className="w-3/4 bg-[#8fbd7e] text-black px-4 py-2 font-bold hover:bg-[#6dab5c]">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}