"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import NavBar from "./component/Navbar";
import Hero from "./component/Hero";

const Home: React.FC = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log(session);
    }
  }, [session]);

  const events = [
    {
      id: 1,
      title: "Sound Of Harmony",
      date: "1 February 2025",
      price: "Rp 100,000",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Gundah: Tak Segampang Itu",
      date: "15 February 2025",
      price: "Rp 150,000",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Yuko Suzuhana",
      date: "2 September 2025",
      price: "Rp 200,000",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Comic Frontier 19",
      date: "9 March 2025",
      price: "Rp 75,000",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Awesome Fit Party",
      date: "22 April 2025",
      price: "Rp 120,000",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      title: "Togean Half Marathon",
      date: "5 October 2025",
      price: "Rp 500,000",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      title: "Battle of The Toys",
      date: "7 September 2025",
      price: "Rp 120,000",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      title: "Gift Fair Indonesia",
      date: "13 October 2025",
      price: "Rp 100,000",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 9,
      title: "Weebs Event",
      date: "30 August 2025",
      price: "Rp 200,000",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="min-h-screen bg-[#ededed]">
      <NavBar />
      <Hero />

      {/* Search Bar */}
      <section className="py-4 bg-white shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search event or keyword"
            className="w-full md:w-1/3 px-4 py-2 border border-[#D6AD61] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6AD61]"
          />
          <select
            className="w-full md:w-1/4 px-4 py-2 border border-[#D6AD61] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6AD61]"
          >
            <option>State</option>
            <option>Jakarta</option>
            <option>Bandung</option>
            <option>Surabaya</option>
          </select>
          <select
            className="w-full md:w-1/4 px-4 py-2 border border-[#D6AD61] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6AD61]"
          >
            <option>Date</option>
            <option>Today</option>
            <option>Tomorrow</option>
            <option>This Weekend</option>
          </select>
          <button className="bg-[#132620] text-[#D6AD61] px-6 py-2 rounded-md hover:bg-[#0e1d19] transition">
            Search
          </button>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-[#D6AD61]">Popular Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#132620]">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-[#132620] font-bold mt-2">From {event.price}</p>
                  <button className="mt-4 bg-[#D6AD61] text-[#132620] px-4 py-2 rounded-md hover:bg-[#f0c78c] transition">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#132620] text-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">&copy; 2024 Ngivént. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
