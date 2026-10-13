import React from 'react';
import { useParams } from 'react-router-dom';

function Users() {
  const { id } = useParams();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-sky-100 via-slate-100 to-sky-200 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 flex flex-col items-center border border-sky-200">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-sky-300 mb-6 shadow">
          <span className="text-4xl text-white font-bold">{id?.toUpperCase?.() || "U"}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-sky-600 mb-2 drop-shadow-sm">User Page</h1>
        <p className="text-slate-700 text-lg text-center mb-4">This is the details page for user with ID:</p>
        <span className="text-xl font-mono px-4 py-2 bg-sky-100 rounded-lg shadow text-sky-800">{id}</span>
      </div>
    </div>
  );
}

export default Users;