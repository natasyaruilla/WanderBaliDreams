import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleExploreMore = () => {
    navigate("/home");  
  };

  return (
    <div className="font-sans text-gray-900">
      <header className="px-9 py-2 bg-gray-100">
        <div className="flex justify-between items-center">
          <img src="/logo wanderbalidreams.png" alt="Logo" className="h-15 w-16" />
        </div>
      </header>

    <section
    className="relative bg-cover bg-center h-[92vh]"
    style={{ backgroundImage: "url('/landing pagebali.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 className="text-6xl font-extrabold mb-4">DISCOVER BALI</h1>
          <p className="text-lg mb-8 max-w-2xl">
            Jadikan petualangan Anda di Bali tak terlupakan dengan WanderBaliDreams — panduan pilihan Anda ke berbagai destinasi terbaik dan permata tersembunyi di pulau ini.
          </p>
          <button
          onClick={handleExploreMore}
          className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
          >
            Explore more
          </button>
      </div>
      </section>



      <section id="about" className="py-5 px-5 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 mt-3">About Us</h2>
          <p className="text-lg text-gray-700">
            WanderBaliDreams adalah panduan Anda untuk menemukan keindahan dan surga tersembunyi di Bali.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
