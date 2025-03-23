import React, { use, useState ,useEffect} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import axios from "axios";

const NgoList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [ngos, setNgos] = useState([]);

  useEffect(() => { 
    // useEffect to fetch data from the backend
    const fetchNgos = async () => {       
      try {
        const response = await axios.get("http://localhost:3000/api/ngos/getallngo"); // Fetch data from the backend
        console.log("NGO List",response.data);
        setNgos(response.data.data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching NGOs:", error);
      }
    };
  
    fetchNgos(); // Call the function inside useEffect
  }, []); // Empty dependency array to run only once when the component mounts
  
  // const ngos = [
  //   {
  //     id: 1,
  //     name: "Red Cross Society",
  //     category: "Medical Aid",
  //     location: "Global",
  //     city: "New York",
  //     image: "https://example.com/redcross.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Food for All",
  //     category: "Food Aid",
  //     location: "Global",
  //     city: "Los Angeles",
  //     image: "https://example.com/foodforall.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "UNICEF",
  //     category: "Child Welfare",
  //     location: "Global",
  //     city: "Chicago",
  //     image: "https://example.com/unicef.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Habitat for Humanity",
  //     category: "Shelter",
  //     location: "Global",
  //     city: "Houston",
  //     image: "https://example.com/habitat.jpg",
  //   },
  //   {
  //     id: 5,
  //     name: "CARE International",
  //     category: "Humanitarian Aid",
  //     location: "Global",
  //     city: "Miami",
  //     image: "https://example.com/care.jpg",
  //   },
  // ];

  const categories = [
    { id: "all", name: "All Categories", icon: "🌟" },
    { id: "Medical Aid", name: "Medical Aid", icon: "🏥" },
    { id: "Food Aid", name: "Food Aid", icon: "🍲" },
    { id: "Child Welfare", name: "Child Welfare", icon: "👶" },
    { id: "Shelter", name: "Shelter", icon: "🏠" },
    { id: "Humanitarian Aid", name: "Humanitarian Aid", icon: "🤝" },
  ];

  const filteredNgos = ngos.filter((ngo) => {
    const matchesSearch =
      (ngo?.organizationName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (ngo?.city?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesCategory =
      !categoryFilter ||
      categoryFilter === "all" ||
      ngo?.status === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Partner NGOs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with trusted organizations providing disaster relief and
            humanitarian assistance.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-72 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search NGOs..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">Categories</h3>
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCategoryFilter(category.id)}
                    className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                      categoryFilter === category.id
                        ? "bg-green-500 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-green-50 border border-gray-200"
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNgos.map((ngo) => (
                  <motion.div
                    key={ngo._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                    onClick={() => navigate(`/ngo/${ngo._id}`, { state: { ngoData: ngo } })}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {ngo.organizationName}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {ngo.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {ngo.city}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600"
                        >
                          View Profile
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredNgos.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No NGOs Found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoList;
