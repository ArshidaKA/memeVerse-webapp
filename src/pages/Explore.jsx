import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemes } from "../redux/memeSlice";
import { debounce } from "lodash";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal, Ghost } from "lucide-react";
import { Link } from "react-router-dom";

function Explore() {
  const dispatch = useDispatch();
  const { memes, loading } = useSelector((state) => state.memes);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [category, setCategory] = useState("Trending");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);

  useEffect(() => {
    let sortedMemes = [...memes];
    if (sortBy === "likes") {
      sortedMemes.sort((a, b) => b.box_count - a.box_count);
    } else if (sortBy === "comments") {
      sortedMemes.sort((a, b) => b.captions - a.captions);
    } else {
      sortedMemes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFilteredMemes(sortedMemes);
  }, [memes, sortBy]);

  const handleSearch = useCallback(
    debounce((query) => {
      const results = memes.filter((meme) =>
        meme.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMemes(results);
    }, 500),
    [memes]
  );

  useEffect(() => {
    if (searchTerm) handleSearch(searchTerm);
    else setFilteredMemes(memes);
  }, [searchTerm, memes, handleSearch]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-[1500px]">
         loading
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-6">Explore Memes</h1>

          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex gap-4">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
              >
                <Filter className="h-5 w-5" />
              </motion.button>

              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSort(!showSort)}
                className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </motion.button>
            </div>
            
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search Memes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-4 placeholder-black rounded-xl shadow-2xl text-black bg-gray-200 focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800  p-2 text-white rounded-full hover:bg-gray-700 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </motion.div>
          </div>

          {showFilters && (
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="bg-white shadow-lg rounded-lg p-3 w-48">
              <select className="w-full p-2 shadow-2xl font-semibold text-black font-sans rounded-md" onChange={(e) => setCategory(e.target.value)}>
                <option value="Trending">Trending</option>
                <option value="New">New</option>
                <option value="Classic">Classic</option>
                <option value="Random">Random</option>
              </select>
            </motion.div>
          )}

          {showSort && (
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="bg-white shadow-lg rounded-lg p-3 w-48">
              <select className="w-full p-2 shadow-2xl font-semibold text-black font-sans rounded-md" onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Sort by Date</option>
                <option value="likes">Sort by Likes</option>
                <option value="comments">Sort by Comments</option>
              </select>
            </motion.div>
          )}

          {filteredMemes.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center mt-20"
            >
              <Ghost className="h-20 w-20 text-gray-500" />
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4">Oops! No Memes Found</p>
              <p className="text-gray-500 dark:text-gray-400">Try searching with a different keyword.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 mt-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMemes.slice(0, page * 10).map((meme) => (
                <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }} key={meme.id} className="shadow-lg rounded-lg overflow-hidden">
                  <Link to={`/meme/${meme.id}`}>
                    <img src={meme.url} alt={meme.name} className="w-full h-64 object-cover" />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold">{meme.name}</h2>
                      <p className="text-sm text-gray-500">👍 {meme.box_count} | 💬 {meme.captions}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Explore;
