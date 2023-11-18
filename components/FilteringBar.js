import React from "react";

export default function FilteringBar({ setIncludeAdult, includeAdult, setMinYear, minYear, setMinRating, minRating, setSortBy, sortBy}) {
  return (
    <div className="col-span-2 h-max gap-4 sticky top-20 hidden md:flex flex-col">
      <div className="col-span-2 h-max sticky top-20 bg-[#212121] rounded-xl shadow-lg p-5 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-1">
          <p className="opacity-50">Minimum Rating</p>
          <div className="w-full flex items-center justify-between">
            <p>{minRating}</p>
          </div>
          <input
            min={5}
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            max={9}
            type="range"
            className="w-full"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <p className="opacity-50">Minimum Release Year</p>
          <div className="w-full flex items-center justify-between">
            <p>{minYear}</p>
          </div>
          <input
            min={1950}
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            max={2023}
            type="range"
            className="w-full"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <p className="opacity-50">Include Adult</p>
          <div className="w-full flex items-center gap-6">
            <div className="flex items-center gap-1">
              <label htmlFor="adult">No</label>
              <input
                id="adult"
                type="radio"
                checked={includeAdult === false}
                name="adult"
                onChange={() => setIncludeAdult(false)}
              />
            </div>
            <div className="flex items-center gap-1">
              <label htmlFor="adult2">Yes</label>
              <input
                id="adult2"
                checked={includeAdult === true}
                type="radio"
                onChange={() => setIncludeAdult(true)}
                name="adult"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 h-max sticky top-20 bg-[#212121] rounded-xl shadow-lg p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="opacity-50">Sort by</p>
          <select
            className="bg-transparent rounded-lg m-0 focus:outline-none"
            id="sorting"
            onChange={(e) => setSortBy(e.target.value)}
            name="sorting"
            value={sortBy}
          >
            <option value="popularity.desc">
              {"Popularity (High to low)"}
            </option>
            <option value="popularity.asc">{"Popularity (Low to high)"}</option>
            <option value="primary_release_date.asc">
              {"Year (Low to high)"}
            </option>
            <option value="primary_release_date.desc">
              {"Year (High to low)"}
            </option>
            <option value="vote_average.asc">{"Rating (Low to high)"}</option>
            <option value="vote_average.desc">{"Rating (High to low)"}</option>
            <option value="vote_count.desc">
              {"Review count (High to low)"}
            </option>
            <option value="vote_count.asc">
              {"Review count (Low to high)"}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
