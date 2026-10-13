import React from 'react';

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-sky-100 via-slate-100 to-sky-200 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 flex flex-col items-center border border-sky-200">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-sky-300 mb-6 shadow">
          <span className="text-4xl text-white font-bold">🏠</span>
        </div>
        <h1 className="text-3xl font-extrabold text-sky-600 mb-2 drop-shadow-sm">Home Page</h1>
        <p className="text-slate-700 text-lg text-center">Welcome to the Home page!</p>
      </div>
    </div>
  );
}

export default Home;