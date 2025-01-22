import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="10"
            required
            className="border p-3 rounded-lg"
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            maxLength="62"
            minLength="10"
            required
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            required
            className="border p-3 rounded-lg"
          />

          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="sale" className="w-5" />
              <p>sell</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="rent" className="w-5" />
              <p>Rent</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="parking" className="w-5" />
              <p>Parking spot</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="furnished" className="w-5" />
              <p>Furnished</p>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="offer" className="w-5" />
              <p>offer</p>
            </div>
          </div>

          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="p-3 rounded-lg border border-gray-300"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                className="p-3 rounded-lg border border-gray-300"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                className="p-3 rounded-lg border border-gray-300"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                className="p-3 rounded-lg border border-gray-300"
              />
              <div className="flex flex-col items-center">
                <p>Discount price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="text-gray-600 font-normal ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 uppercase rounded hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>

          <button className="p-3 bg-slate-700 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-80">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
