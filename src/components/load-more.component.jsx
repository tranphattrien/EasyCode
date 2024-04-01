import React from "react";

export default function LoadMoreDataBtn({ state, fetchDataFunction }) {
  if (state !== null && state.totalDocs > state?.results?.length) {
    return (
      <button
        className="text-dark-grey p-2 px-3 hover:bg-grey/50 rounded-md flex items-center gap-2 mx-auto my-0"
        onClick={() => fetchDataFunction({ page: state.page + 1 })}
      >
        Load More ...
      </button>
    );
  }
}
