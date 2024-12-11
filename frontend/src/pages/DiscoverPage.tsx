import React, { useState } from "react";
import "../DiscoverPage.css"; 
import parisImage from "../images/eiffel.webp";
import tokyoImage from "../images/tokyoo.webp";
import newYorkImage from "../images/newyork.webp";
import rioImage from "../images/Rio.webp";
import romeImage from "../images/rome.webp";
import londonImage from "../images/london.webp";
import bangkokImage from "../images/bangkok.webp";
import dubaiImage from "../images/dubai.webp";
import syndeyImage from "../images/sydney.webp";
import capeImage from "../images/cape.webp";
import cairoImage from "../images/cairo.webp";
import moscowImage from "../images/moscow.webp";
import beijingImage from "../images/beijing.webp";
import LAImage from "../images/LA.webp";
import mumbaiImage from "../images/mumbai.webp";
import singaporeImage from "../images/singapore.webp";
import berlinImage from "../images/berlin.webp";
import istanbulImage from "../images/istanbul.webp";
import athensImage from "../images/athens.webp";
import hongImage from "../images/hong.webp";
import barcelonaImage from "../images/barceolna.webp";
import torontoImage from "../images/toronto.webp";
import santoriniImage from "../images/santorini.webp";
import buenosImage from "../images/buenos.webp";
import seoulImage from "../images/seoul.webp";
import veniceImage from "../images/venice.webp";
import sanfImage from "../images/sanf.webp";
import limaImage from "../images/lima.webp";
import madridImage from "../images/madrid.webp";
import amsterdamImage from "../images/amsterdam.webp";
import moroccoImage from "../images/morocco.webp";
import vanImage from "../images/van.webp";
import kualaImage from "../images/kuala.webp";
import machuImage from "../images/machu.webp";
import niagraImage from "../images/niagra.webp";
import kyotoImage from "../images/kyoto.webp";
import florenceImage from "../images/florence.webp";
import hawaiiImage from "../images/hawaii.webp";
import baliImage from "../images/bali.webp";
import pragueImage from "../images/prague.webp";
import phucketImage from "../images/phucket.webp";
import reyImage from "../images/rey.webp";
import petraImage from "../images/petra.webp";
import viennaImage from "../images/vienna.webp";
import queensImage from "../images/queens.webp";
import greatImage from "../images/great.webp";
import croatiaImage from "../images/croatia.webp";
import hanoiImage from "../images/hanoi.webp";
import { useNavigate } from "react-router-dom";


export const destinationsData = [
  {
    id: 1,
    name: "Paris, France",
    image: parisImage,
    description: "The city of lights and romance awaits you.",
    region: "Europe",
    rating: 4.8,
    latitude: 48.8566,
    longitude: 2.3522,
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: tokyoImage,
    description: "Experience a perfect mix of tradition and modernity.",
    region: "Asia",
    rating: 4.7,
    latitude: 35.6895,
    longitude: 139.6917,
  },
  {
    id: 3,
    name: "New York, USA",
    image: newYorkImage,
    description: "The city that never sleeps offers endless opportunities.",
    region: "North America",
    rating: 4.9,
    latitude: 40.7128,
    longitude: -74.0060,
  },
  {
    id: 4,
    name: "Rome, Italy",
    image: romeImage,
    description: "A city full of history and iconic landmarks like the Colosseum.",
    region: "Europe",
    rating: 4.9,
    latitude: 41.9028,
    longitude: 12.4964,
  },
  {
    id: 5,
    name: "London, England",
    image: londonImage,
    description: "The bustling capital with Big Ben and Buckingham Palace.",
    region: "Europe",
    rating: 4.8,
    latitude: 51.5074,
    longitude: -0.1278,
  },
  {
    id: 6,
    name: "Bangkok, Thailand",
    image: bangkokImage,
    description: "A vibrant city known for ornate temples and street food.",
    region: "Asia",
    rating: 4.7,
    latitude: 13.7563,
    longitude: 100.5018,
  },
  {
    id: 7,
    name: "Dubai, UAE",
    image: dubaiImage,
    description: "A luxury destination with towering skyscrapers like the Burj Khalifa.",
    region: "Asia",
    rating: 4.6,
    latitude: 25.276987,
    longitude: 55.296249,
  },
  {
    id: 8,
    name: "Sydney, Australia",
    image: syndeyImage,
    description: "The Opera House and beautiful beaches await you.",
    region: "Oceania",
    rating: 4.7,
    latitude: -33.8688,
    longitude: 151.2093,
  },
  {
    id: 9,
    name: "Cape Town, South Africa",
    image: capeImage,
    description: "A stunning coastal city with Table Mountain views.",
    region: "Africa",
    rating: 4.8,
    latitude: -33.9249,
    longitude: 18.4241,
  },
  {
    id: 10,
    name: "Rio de Janeiro, Brazil",
    image: rioImage,
    description: "The vibrant city of Carnival and Christ the Redeemer.",
    region: "South America",
    rating: 4.6,
    latitude: -22.9068,
    longitude: -43.1729,
  },
  {
    id: 11,
    name: "Cairo, Egypt",
    image: cairoImage,
    description: "Explore the ancient pyramids and the Sphinx.",
    region: "Africa",
    rating: 4.7,
    latitude: 30.0444,
    longitude: 31.2357,
  },
  {
    id: 12,
    name: "Moscow, Russia",
    image: moscowImage,
    description: "Red Square and the Kremlin await in this iconic city.",
    region: "Europe",
    rating: 4.5,
    latitude: 55.7558,
    longitude: 37.6173,
  },
  {
    id: 13,
    name: "Beijing, China",
    image: beijingImage,
    description: "Visit the Great Wall and the Forbidden City.",
    region: "Asia",
    rating: 4.7,
    latitude: 39.9042,
    longitude: 116.4074,
  },
  {
    id: 14,
    name: "Los Angeles, USA",
    image: LAImage,
    description: "Home to Hollywood hills and iconic beaches.",
    region: "North America",
    rating: 4.6,
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: 15,
    name: "Mumbai, India",
    image: mumbaiImage,
    description: "A bustling city with cultural diversity and Bollywood.",
    region: "Asia",
    rating: 4.4,
    latitude: 19.076,
    longitude: 72.8777,
  },
  {
    id: 16,
    name: "Singapore",
    image: singaporeImage,
    description: "A city of futuristic architecture and delicious cuisine.",
    region: "Asia",
    rating: 4.8,
    latitude: 1.3521,
    longitude: 103.8198,
  },
  {
    id: 17,
    name: "Berlin, Germany",
    image: berlinImage,
    description: "A historic city with a vibrant cultural scene.",
    region: "Europe",
    rating: 4.7,
    latitude: 52.5200,
    longitude: 13.4050,
  },
  {
    id: 18,
    name: "Istanbul, Turkey",
    image: istanbulImage,
    description: "A city where East meets West, rich in history.",
    region: "Europe",
    rating: 4.8,
    latitude: 41.0082,
    longitude: 28.9784,
  },
  {
    id: 19,
    name: "Athens, Greece",
    image: athensImage,
    description: "The cradle of Western civilization and the Parthenon.",
    region: "Europe",
    rating: 4.7,
    latitude: 37.9838,
    longitude: 23.7275,
  },
  {
    id: 20,
    name: "Hong Kong",
    image: hongImage,
    description: "A bustling city with a stunning harbor skyline.",
    region: "Asia",
    rating: 4.6,
    latitude: 22.3193,
    longitude: 114.1694,
  },
  {
    id: 21,
    name: "Barcelona, Spain",
    image: barcelonaImage,
    description: "Gaudi's architecture and Mediterranean vibes await.",
    region: "Europe",
    rating: 4.8,
    latitude: 41.3851,
    longitude: 2.1734,
  },
  {
    id: 22,
    name: "Toronto, Canada",
    image: torontoImage,
    description: "A multicultural city with the iconic CN Tower.",
    region: "North America",
    rating: 4.7,
    latitude: 43.65107,
    longitude: -79.347015,
  },
  {
    id: 23,
    name: "Santorini, Greece",
    image: santoriniImage,
    description: "A romantic island known for its whitewashed buildings.",
    region: "Europe",
    rating: 4.9,
    latitude: 36.3932,
    longitude: 25.4615,
  },
  {
    id: 24,
    name: "Buenos Aires, Argentina",
    image: buenosImage,
    description: "The birthplace of tango and rich cultural heritage.",
    region: "South America",
    rating: 4.6,
    latitude: -34.6037,
    longitude: -58.3816,
  },
  {
    id: 25,
    name: "Seoul, South Korea",
    image: seoulImage,
    description: "A vibrant city with ancient palaces and K-pop culture.",
    region: "Asia",
    rating: 4.8,
    latitude: 37.5665,
    longitude: 126.978,
  },
  {
    id: 26,
    name: "Venice, Italy",
    image: veniceImage,
    description: "A city of canals and gondolas, perfect for romance.",
    region: "Europe",
    rating: 4.8,
    latitude: 45.4408,
    longitude: 12.3155,
  },
  {
    id: 27,
    name: "San Francisco, USA",
    image: sanfImage,
    description: "The Golden Gate Bridge and Alcatraz await.",
    region: "North America",
    rating: 4.6,
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: 28,
    name: "Lima, Peru",
    image: limaImage,
    description: "Gateway to Machu Picchu and rich Peruvian culture.",
    region: "South America",
    rating: 4.7,
    latitude: -12.0464,
    longitude: -77.0428,
  },
  {
    id: 29,
    name: "Madrid, Spain",
    image: madridImage,
    description: "A lively city known for its museums and nightlife.",
    region: "Europe",
    rating: 4.7,
    latitude: 40.4168,
    longitude: -3.7038,
  },
  {
    id: 30,
    name: "Amsterdam, Netherlands",
    image: amsterdamImage,
    description: "Known for its canals, art museums, and tulips.",
    region: "Europe",
    rating: 4.8,
    latitude: 52.3676,
    longitude: 4.9041,
  },
  {
    id: 31,
    name: "Marrakech, Morocco",
    image: moroccoImage,
    description: "A vibrant city with souks and stunning palaces.",
    region: "Africa",
    rating: 4.6,
    latitude: 31.6295,
    longitude: -7.9811,
  },
  {
    id: 32,
    name: "Vancouver, Canada",
    image: vanImage,
    description: "A scenic city surrounded by mountains and water.",
    region: "North America",
    rating: 4.7,
    latitude: 49.2827,
    longitude: -123.1207,
  },
  {
    id: 33,
    name: "Kuala Lumpur, Malaysia",
    image: kualaImage,
    description: "Known for the Petronas Towers and cultural diversity.",
    region: "Asia",
    rating: 4.7,
    latitude: 3.139,
    longitude: 101.6869,
  },
  {
    id: 34,
    name: "Machu Picchu, Peru",
    image: machuImage,
    description: "The iconic Incan citadel nestled in the Andes.",
    region: "South America",
    rating: 4.9,
    latitude: -13.1631,
    longitude: -72.545,
  },
  {
    id: 35,
    name: "Niagara Falls, Canada/USA",
    image: niagraImage,
    description: "A breathtaking natural wonder on the border.",
    region: "North America",
    rating: 4.8,
    latitude: 43.0962,
    longitude: -79.0377,
  },
  {
    id: 36,
    name: "Kyoto, Japan",
    image: kyotoImage,
    description: "A city of stunning temples and tranquil gardens.",
    region: "Asia",
    rating: 4.8,
    latitude: 35.0116,
    longitude: 135.7681,
  },
  {
    id: 37,
    name: "Florence, Italy",
    image: florenceImage,
    description: "The cradle of the Renaissance with iconic art and architecture.",
    region: "Europe",
    rating: 4.9,
    latitude: 43.7696,
    longitude: 11.2558,
  },
  {
    id: 38,
    name: "Hawaii, USA",
    image: hawaiiImage,
    description: "Tropical paradise known for its stunning beaches and volcanoes.",
    region: "North America",
    rating: 4.9,
    latitude: 20.7967,
    longitude: -156.3319,
  },
  {
    id: 39,
    name: "Bali, Indonesia",
    image: baliImage,
    description: "A tropical haven of beaches, temples, and wellness retreats.",
    region: "Asia",
    rating: 4.8,
    latitude: -8.3405,
    longitude: 115.092,
  },
  {
    id: 40,
    name: "Prague, Czech Republic",
    image: pragueImage,
    description: "A fairy-tale city with a stunning old town and castle.",
    region: "Europe",
    rating: 4.8,
    latitude: 50.0755,
    longitude: 14.4378,
  },
  {
    id: 41,
    name: "Phuket, Thailand",
    image: phucketImage,
    description: "A tropical destination with pristine beaches and vibrant nightlife.",
    region: "Asia",
    rating: 4.7,
    latitude: 7.8804,
    longitude: 98.3923,
  },
  {
    id: 42,
    name: "Reykjavik, Iceland",
    image: reyImage,
    description: "A gateway to stunning glaciers, geysers, and northern lights.",
    region: "Europe",
    rating: 4.9,
    latitude: 64.1355,
    longitude: -21.8954,
  },
  {
    id: 43,
    name: "Petra, Jordan",
    image: petraImage,
    description: "The ancient rose-red city carved into sandstone cliffs.",
    region: "Asia",
    rating: 4.8,
    latitude: 30.3285,
    longitude: 35.4444,
  },
  {
    id: 44,
    name: "Vienna, Austria",
    image: viennaImage,
    description: "A city of classical music, imperial palaces, and rich history.",
    region: "Europe",
    rating: 4.8,
    latitude: 48.2082,
    longitude: 16.3738,
  },
  {
    id: 45,
    name: "Queenstown, New Zealand",
    image: queensImage,
    description: "An adventure hub surrounded by stunning mountains and lakes.",
    region: "Oceania",
    rating: 4.9,
    latitude: -45.0312,
    longitude: 168.6626,
  },
  {
    id: 46,
    name: "Great Barrier Reef, Australia",
    image: greatImage,
    description: "A natural wonder and the world's largest coral reef system.",
    region: "Oceania",
    rating: 4.9,
    latitude: -18.2871,
    longitude: 147.6992,
  },
  {
    id: 47,
    name: "Dubrovnik, Croatia",
    image: croatiaImage,
    description: "The 'Pearl of the Adriatic' with stunning medieval walls.",
    region: "Europe",
    rating: 4.7,
    latitude: 42.6507,
    longitude: 18.0944,
  },
  {
    id: 48,
    name: "Hanoi, Vietnam",
    image: hanoiImage,
    description: "Known for its centuries-old architecture and rich Vietnamese culture.",
    region: "Asia",
    rating: 4.7,
    latitude: 21.0285,
    longitude: 105.8542,
  },
];




export const DestinationsPage = () => {
  // search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");
  //  region filter dropdown
  const [filterRegion, setFilterRegion] = useState("All");
  // redirect users to detailed pages
  const navigate = useNavigate();

  const filteredDestinations = destinationsData.filter((destination) => {
    const matchesSearch = destination.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()); // case-insensitive match for search 
    const matchesRegion =
      filterRegion === "All" || destination.region === filterRegion; // check if destination matches region
    return matchesSearch && matchesRegion;
  });

  return (
    <div>
      {/* Centered Content Section */}
      <div className="centered-content">
        <h1>Destinations</h1>
        <p>Discover amazing places to visit!</p>

        {/* Search Bar Section */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm} // Controlled component for search input
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        {/* Filter Dropdown Section */}
        <div className="filter-options">
          <label>Filter by Region:</label>
          <select
            value={filterRegion} //component for dropdown
            onChange={(e) => setFilterRegion(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
            <option value="Africa">Africa</option>
          </select>
        </div>
      </div>

      {/* Destinations Grid Section */}
      <div className="destinations-grid">
        {filteredDestinations.map((destination) => (
          <div className="destination-card" key={destination.id}>
            {/* Image Section */}
            <div className="image-container">
              <img src={destination.image} alt={destination.name} />
            </div>
            {/* Destination Details */}
            <h3>{destination.name}</h3>
            <p>{destination.description}</p>
            <p>Rating: ⭐ {destination.rating}</p>
            {/* Button to navigate to the destination's details */}
            <button
              onClick={() => navigate(`/destinations/${destination.id}`)}
            >
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


