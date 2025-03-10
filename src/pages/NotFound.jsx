import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen    text-center px-6">
      <motion.h1
        className="text-5xl font-bold mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        404 - Oops!
      </motion.h1>

      <motion.img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS5rTTW8ir57OCeu6YIXNytCEtI7nq8v6Ylw&s" // Replace with a fun meme URL
        alt="Lost meme"
        className="max-w-md rounded-lg shadow-lg mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.p
        className="text-lg text-gray-800 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Looks like you're lost in the meme universe. Maybe this meme will help? 😆
      </motion.p>

      <Link to="/">
        <motion.button
          className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-400 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Go Back Home 🏠
        </motion.button>
      </Link>
    </div>
  );
}
