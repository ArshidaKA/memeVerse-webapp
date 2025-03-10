import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemes } from "../redux/memeSlice";
import { FaCloudUploadAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const hardcodedUsers = [
  { name: "John Doe", profile: "https://randomuser.me/api/portraits/men/1.jpg", rank: 1, uploads: 15 },
  { name: "Jane Smith", profile: "https://randomuser.me/api/portraits/women/2.jpg", rank: 2, uploads: 12 },
  { name: "Alice Johnson", profile: "https://randomuser.me/api/portraits/women/3.jpg", rank: 3, uploads: 10 },
  { name: "Bob Brown", profile: "https://randomuser.me/api/portraits/men/4.jpg", rank: 4, uploads: 8 },
  { name: "Charlie Davis", profile: "https://randomuser.me/api/portraits/men/5.jpg", rank: 5, uploads: 6 },
];

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { memes, loading } = useSelector((state) => state.memes);

  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);

  const topMemes = [...memes].sort((a, b) => b.box_count - a.box_count).slice(0, 10);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6  shadow-lg rounded-lg"
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-6"
      >
         MemeVerse Hall of Fame
      </motion.h1>

      <div className="mb-6">
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-lg font-semibold mb-2 text-center  underline decoration-pink-500 hover:decoration-purple-600 transition"
        >
          Top Meme Creators
        </motion.h3>
        <ul>
          {hardcodedUsers.map((user, index) => (
            <motion.li
              key={user.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl mb-2 shadow-sm transition"
            >
              <img src={user.profile} alt={user.name} className="w-12 h-12 rounded-full border" />
              <span className="font-medium flex-1 ">{user.rank}. {user.name}</span>
              <div className="flex items-center gap-1 text-sm ">
                <FaCloudUploadAlt className="w-4 h-4" /> {user.uploads}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <div>
  <h3 className="text-lg font-semibold mb-2 text-center underline decoration-purple-500 hover:decoration-pink-600 transition">
    Top 10 Most Liked Memes
  </h3>

  {loading ? (
    <p className="text-center text-gray-500 animate-pulse">Loading...</p>
  ) : (
    <div className="grid grid-cols-2 mt-5 gap-4">
      {topMemes.map((meme, index) => (
        <div
          key={index}
          className="rounded-xl overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105"
        >
          <img
            src={meme.url}
            alt={meme.name}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <div className="p-3">
            <p className="text-sm font-medium ">{meme.name}</p>
            <p className="text-xs text-gray-500">Likes: {meme.box_count}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

      
    </motion.div>
    <div className="max-w-4xl mx-auto text-center py-16 px-6">
    <h2 className="text-3xl font-bold text-[var(--text)]">
      Stay Updated with the Fun! 
    </h2>
    <p className="text-gray-600 mt-4">
      Get the latest meme trends, updates, and surprises straight to your inbox.
    </p>
    <div className="mt-6 flex justify-center">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none dark:bg-gray-800 dark:text-white"
      />
      <button className="px-6 py-2 bg-yellow-600 text-white rounded-xl font-medium">
        Subscribe
      </button>
    </div>
    </div>
    </>
  );
};

export default Leaderboard;
