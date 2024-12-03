import React, { useEffect, useState } from "react";
import skyScrapperAPI from "../api/SkyScrapper";
import { MdPersonOutline } from "react-icons/md";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { LuArrowRightLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const FlightsService = () => {
  const [flights, setFlights] = useState([]); // Flight data
  const [loading, setLoading] = useState(true); // Loading state
  const [origin, setOrigin] = useState(""); // Origin
  const [destination, setDestination] = useState(""); // Destination
  const [date, setDate] = useState(""); // Date
const navigate = useNavigate();
  const [selectedTripType, setSelectedTripType] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedPassengerType, setSelectedPassengerType] = useState('Adult');



  // Fetch flight data function
  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await skyScrapperAPI.get("/flights/searchFlights", {
        params: {
            originSkyId: origin, // origin মান ড্রপডাউন থেকে আসবে
            destinationSkyId: destination, // destination মান ড্রপডাউন থেকে আসবে
            originEntityId: "27544008", // এখানে Entity ID স্থির রাখুন
            destinationEntityId: "27537542", // এখানে Entity ID স্থির রাখুন
            date: date,
            cabinClass: "economy",
            adults: 1,
            currency: "USD", // সঠিক মুদ্রা কোড দিন
          },
      });
      setFlights(response.data.data.itineraries);
      console.log(response.data);
      setLoading(false);
      navigate("/flight-results", { state: { flights: response.data.data.itineraries } });
    } catch (error) {
      console.error("Error fetching flights:", error);
      setLoading(false);
    }
  };

  // Apply filters function
//   const applyFilters = (flights) => {
//     return flights.filter(
//       (flight) =>
//         flight.stops <= filters.stops && flight.price <= filters.maxPrice
//     );
//   };
  

  // Paginated flight data
//   const currentFlights = applyFilters(flights).slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );
  const handleDateChange = (e) => {
    setDate(e.target.value); // স্টেট আপডেট হচ্ছে
    console.log(e.target.value); // কনসোল লগ দিয়ে চেক করুন
  };
  

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];  // এটা সঠিকভাবে YYYY-MM-DD ফরম্যাটে সেট করবে
    setDate(today);
  }, []);

  useEffect(() => {
    if (origin && destination && date) {
      fetchFlights();
    }
  }, [origin, destination, date]);
 

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-100">
      {/* Background Image */}
      <div
        className="flex flex-col items-center bg-contain bg-center bg-no-repeat w-full h-[600px] p-8"
        style={{
          backgroundImage: "url('https://i.ibb.co/vL1YDtd/rb-115118.png')",
        }}
      >
        {/* Search Form */}
        <div className="w-full lg:mt-[480px] max-w-4xl bg-base-200 p-6 rounded-lg shadow-lg">
          <div className="flex gap-8 mb-4">
            {/* Dropdown 1 - Trip Type */}
            <div className="relative">
            
              <select
                id="tripType"
                className="w-full p-3 bg-white  rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400  transition-all duration-300"
                value={selectedTripType}
                onChange={(e) => setSelectedTripType(e.target.value)}
              >
                <option value="Round Trip">Round Trip</option>
                <option value="One Way">One Way</option>
                <option value="Multi-city">Multi-city</option>
              </select>
            </div>

            {/* Dropdown 2 - Passenger Type */}
            
      <div className="relative">
        <select
          id="passengerType"
          className="w-full p-3 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400 transition-all duration-300"
          value={selectedPassengerType}
          onChange={(e) => setSelectedPassengerType(e.target.value)}
        >
          <option value="Adult">Adult</option>
          <option value="Child">Child</option>
        </select>
      </div>
            {/* Dropdown 3 - class Type */}
            <div className="relative">
         <select
                id="classType"
                className="w-full p-3 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400  transition-all duration-300"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="economy">Economy</option>
                <option value="Premium-economy">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>

          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            
            <select
              id="tripType"
              className="w-full p-3 bg-white  rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400  transition-all duration-300"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
                <option disabled value="">Where From?</option>
                <option value="JFK">New York (JFK)</option>
                <option value="LAX">Los Angeles (LAX)</option>
                <option value="SFO">San Francisco (SFO)</option>
                <option value="ORD">Chicago O'Hare (ORD)</option>
                <option value="LHR">London Heathrow (LHR)</option>
            </select>
          </div>
          <div className="relative">
            
            <select
              id="tripType"
              className="w-full p-3 bg-white  rounded-lg shadow-sm focus:ring-2 focus:ring-slate-400  transition-all duration-300"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
                <option disabled value="">Where To?</option>
                <option value="JFK">New York (JFK)</option>
                <option value="LAX">Los Angeles (LAX)</option>
                <option value="SFO">San Francisco (SFO)</option>
                <option value="ORD">Chicago O'Hare (ORD)</option>
                <option value="LHR">London Heathrow (LHR)</option>
            </select>
          </div>
           
          <div>
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
      />
      
    </div>
          </div>
          <button
             onClick={() => {
                fetchFlights();
              }}
            className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Search Flights
          </button>
        </div>
      </div>

      {/* Flight Results */}
      {/* <div className="w-full max-w-6xl p-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <p className="ml-2 text-gray-600">Loading flights...</p>
          </div>
        ) : currentFlights.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFlights.map((flight, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition"
              >
                <p className="text-lg font-bold text-gray-800 text-center">
                  Price: ${flight.price}
                </p>
                <p className="text-sm text-gray-600 text-center">
                  Stops: {flight.stops}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No flights found.</p>
        )}
      </div> */}
    </div>
  );
};

export default FlightsService;
