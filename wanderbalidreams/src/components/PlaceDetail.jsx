import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailPage() {
  const { id } = useParams(); 
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [name, setName] = useState("");  
  const [message, setMessage] = useState("");  
  const [highlight, setHighlight] = useState("");  
  const [highlightOptions, setHighlightOptions] = useState([]); 

  useEffect(() => {
    axios.get(`http://localhost:5000/api/destinations/${id}`)
      .then((response) => {
        setPlace(response.data);
      })
      .catch((error) => {
        console.error('Error fetching place details:', error);
      });

    axios.get(`http://localhost:5000/api/reviews`)
      .then((response) => {
        setReviews(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });

    axios.get(`http://localhost:5000/api/destinations`)
      .then((response) => {
        const names = response.data.map(item => item.name);
        setHighlightOptions(names);
      })
      .catch((error) => {
        console.error("Error fetching highlight options:", error);
      });
  }, [id]);  

  const handleReviewSubmit = (e) => {
    e.preventDefault();  

    const reviewData = {
      name: name,
      highlight: highlight,
      comment: message,
    };

    axios.post('http://localhost:5000/api/reviews', reviewData)
      .then((response) => {
        setReviews([response.data, ...reviews]);
        setName("");  
        setMessage("");  
        setHighlight(""); 
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
  };

  if (!place) return <div className="text-center py-24">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="container mx-auto px-4 flex-grow py-12">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 shadow-md mb-8"
        >
          <span className="text-xl">←</span>
          <span>Kembali</span>
        </button>

        {/* DETAIL SECTION */}
        <div className="lg:flex lg:items-center lg:space-x-12 bg-white p-6 rounded-lg shadow-lg">
          {/* Gambar */}
          <div className="lg:w-1/2 mb-6 lg:mb-0">
            <img className="w-full h-96 object-cover rounded-lg shadow" src={place.imageUrl} alt={place.name} />
          </div>

          {/* Deskripsi */}
          <div className="lg:w-1/2 flex flex-col justify-center min-h-[300px]">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">{place.name}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{place.description}</p>
          </div>
        </div>

        {/* REVIEW SECTION */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Kata Pengunjung</h3>
          <div>
            {reviews.length === 0 ? (
              <p className="text-gray-600">Belum ada review.</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
                  <p className="text-lg font-semibold text-green-700">{review.highlight}</p>  
                  <h4 className="text-lg font-semibold text-gray-800 mt-2">{review.name}</h4>  
                  <p className="text-sm text-gray-600 mt-2">{review.comment}</p>  
                </div>
              ))
            )}
          </div>
        </div>

        {/* FORM REVIEW */}
        <div className="bg-white p-8 rounded-lg shadow-lg mt-12 mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bagikan pengalamanmu di sini!</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label htmlFor="highlight" className="block text-lg font-medium text-gray-700">Lokasi</label>
              <select
                id="highlight"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md text-lg"
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                required
              >
                <option value="">-- Pilih lokasi yang ingin diulas --</option>
                {highlightOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                id="full-name"
                type="text"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Ulasan</label>
              <textarea
                id="message"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis ulasanmu di sini..."
                required
              />
            </div>
            <button
              type="submit"
              className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
            >
              Kirim Ulasan
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-[#2F4F4F] text-white py-6 text-center mt-12">
        <p>&#169; WanderBaliDreams</p>
      </footer>
    </div>
  );
}

export default DetailPage;
