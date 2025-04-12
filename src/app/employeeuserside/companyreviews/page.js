import React from 'react'
import Image from 'next/image'
import Navbar from '../../(navbar)/navbar/page';

const companies = [
  {
    name: "The Hans Foundation",
    reviews: "4 reviews",
    rating: 4,
    logo: "/hans.png",
  },
  {
    name: "Physics Wallah",
    reviews: "28 reviews",
    rating: 4,
    logo: "/pw.png",
  },
  {
    name: "Apollo Hospitals",
    reviews: "1,005 reviews",
    rating: 4,
    logo: "/apollo.png",
  },
  {
    name: "ICICI Bank Ltd",
    reviews: "7,331 reviews",
    rating: 4,
    logo: "/icici.png",
  },
  {
    name: "McDonald's",
    reviews: "2,52,170 reviews",
    rating: 4,
    logo: "/mcd.png",
  },
  {
    name: "[24]7.ai",
    reviews: "160 reviews",
    rating: 4,
    logo: "/247.png",
  },
];

const CompanyReviews = () => {
  return (
    <div>
      <Navbar/>
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Find great places to work</h1>
      <p className="text-lg mb-6">Get access to millions of company reviews</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Company name or job title"
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <button className="bg-blue-700 text-white px-6 py-3 rounded-md">
          Find Companies
        </button>
      </div>

      <a href="#" className="text-blue-600 text-sm underline mb-8 inline-block">
        Do you want to search for salaries?
      </a>

      <h2 className="text-2xl font-semibold mt-10 mb-6">Popular companies</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {companies.map((company, i) => (
          <div
            key={i}
            className="flex items-start gap-4 border p-4 rounded-md shadow-sm"
          >
            <Image
              src={company.logo}
              alt={company.name}
              width={50}
              height={50}
              className="object-contain"
            />
            <div>
              <h3 className="font-bold">{company.name}</h3>
              <div className="flex items-center text-pink-600">
                {"★".repeat(company.rating)}
                {"☆".repeat(5 - company.rating)}
                <span className="text-sm text-blue-600 ml-2">
                  {company.reviews}
                </span>
              </div>
              <div className="flex gap-4 text-sm mt-1 text-gray-600">
                <span>Salaries</span>
                <span>Questions</span>
                <span>Open jobs</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

  )
}

export default CompanyReviews
