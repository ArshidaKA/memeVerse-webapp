import { useSelector } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";

export default function MemePoll() {
  const { memes } = useSelector((state) => state.memes);
  const [votedMeme, setVotedMeme] = useState(null);
  const randomMemes = [...memes].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <motion.div 
      className="mt-30 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl font-bold text-[var(--text)]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        🗳️ Vote for the Funniest Meme!
      </motion.h2>

      <motion.p 
        className="text-gray-600 dark:text-gray-300 mt-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Pick the meme that made you laugh the most! 😂
      </motion.p>

      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {randomMemes.map((meme, index) => (
          <motion.div
            key={meme.id}
            className={`p-4 rounded-xl shadow-lg cursor-pointer ${
              votedMeme === meme.id ? "border-4 border-yellow-500" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            onClick={() => setVotedMeme(meme.id)}
          >
            <img 
              src={meme.url} 
              alt={meme.name} 
              className="h-60 w-full object-cover rounded-lg" 
            />
            <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
              {meme.name}
            </p>
          </motion.div>
        ))}
      </div>

      {votedMeme && (
        <motion.p 
          className="mt-4 text-yellow-600 font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ✅ You voted! Thanks for participating!
        </motion.p>
      )}

      <motion.div 
        className="max-w-4xl mx-auto  mt-7 text-center py-16 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-[var(--text)]">
          Stay Updated with the Fun!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Get the latest meme trends, updates, and surprises straight to your inbox.
        </p>
        
        <div className="mt-6 flex justify-center">
          <motion.input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none dark:bg-gray-800 dark:text-white"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          <motion.button
            className="px-6 py-2 bg-yellow-600 text-white rounded-xl font-medium ml-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Subscribe
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
