import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/destinations')
      .then((response) => {
        setPlaces(response.data);  
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="font-sans text-gray-900">
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/homepage.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-6xl font-extrabold mb-4">Bali, Indonesia</h1>
          <p className="text-lg mb-8 max-w-2xl">
            Setiap perjalanan punya cerita, dan Bali siap menulis ceritamu. Dengan pemandangan yang memukau dan budaya yang kaya, setiap langkahmu di pulau ini akan jadi kenangan. WanderBaliDreams membantu kamu menemukan spot terbaik, tidak hanya untuk dilihat, tapi juga untuk dirasakan. Temukan tempat-tempat yang membuatmu ingin kembali, lagi dan lagi.
          </p>
        </div>
      </section>


      <section className="py-28 px-8 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-12">Jelajahi Bali!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center max-w-7xl mx-auto">
            {places.map((place, index) => (
              <div key={index} className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white mx-auto transform hover:scale-105 transition duration-300">
                <img className="w-full h-52 object-cover" src={place.imageUrl} alt={place.name} />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{place.name}</h3>
                  <p className="text-gray-600 mt-2">{place.address}</p>
                  <Link to={`/place/${place.id}`} className="text-blue-600 hover:underline mt-4 inline-block">See Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <footer className="bg-[#2F4F4F] text-white py-6 text-center">
        <p>&#169; WanderBaliDreams</p>
      </footer>
    </div>
  );
}

export default HomePage;
