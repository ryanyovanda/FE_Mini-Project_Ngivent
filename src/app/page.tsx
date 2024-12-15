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
      image: "https://images.t2u.io/upload/event/listing/0-34897-AWSS314d905f9-9bc5-40bf-9745-f8f50bf75242-zqXc_X.png",
    },
    {
      id: 2,
      title: "Gundah: Tak Segampang Itu",
      date: "15 February 2025",
      price: "Rp 150,000",
      image: "https://images.t2u.io/upload/event/listing/0-39893-AWSS33feb2141-c323-4ba0-83c9-9336a417aae5-s8sr_X.jpg",
    },
    {
      id: 3,
      title: "Yoga in the Park",
      date: "2 September 2025",
      price: "Rp 200,000",
      image: "https://images.t2u.io/upload/event/listing/0-38529-AWSS320dcfec2-1556-4c4c-9ac0-e2cc8d6a1e38-HZmn_X.jpg",
    },
    {
      id: 4,
      title: "Comic Frontier 19",
      date: "9 March 2025",
      price: "Rp 75,000",
      image: "https://images.t2u.io/upload/event/listing/0-38594-AWSS38eac1c96-74e2-4c82-ab30-3e34bba06b37-n5OS_X.png",
    },
    {
      id: 5,
      title: "Awesome Fit Party",
      date: "22 April 2025",
      price: "Rp 120,000",
      image: "https://images.t2u.io/upload/event/listing/0-36784-AWSS38fa35c8f-63d1-4fd7-ac17-3941e00a3b1c-edy1_X.jpg",
    },
    {
      id: 6,
      title: "Battle of the Toys",
      date: "5 October 2025",
      price: "Rp 500,000",
      image: "https://images.t2u.io/upload/event/listing/0-37835-AWSS3afb6dcc2-3e55-4e3e-be9d-5243a4abdf26-wAJe_X.jpg",
    },
    {
      id: 7,
      title: "World Wellness Weekend",
      date: "7 September 2025",
      price: "Rp 120,000",
      image: "https://images.t2u.io/upload/event/listing/0-37451-AWSS3ac431a22-4cdf-42f3-b420-7dffa56b97b7-mRuz_X.jpg",
    },
    {
      id: 8,
      title: "Togean Half Marathon",
      date: "13 October 2025",
      price: "Rp 100,000",
      image: "https://images.t2u.io/upload/event/listing/0-37437-AWSS375de0013-859c-422e-910d-11bc16031981-xdrp_X.jpg",
    },
    {
      id: 9,
      title: "Celebrity Fitness Dance",
      date: "30 August 2025",
      price: "Rp 200,000",
      image: "https://images.t2u.io/upload/event/listing/0-35528-AWSS3116012c5-dd9c-45b8-a4e9-22729351d1cb-oKoK_X.jpeg",
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
