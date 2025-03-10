import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function HallOfFame() {
  const { memes } = useSelector((state) => state.memes);
  const topMemes = [...memes].sort((a, b) => b.likes - a.likes).slice(0, 5);

  return (
    <div className="mt-16 text-center">
      <motion.h2
        className="text-3xl font-bold text-[var(--text)]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        🏆 Hall of Fame
      </motion.h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">Check out the memes that went viral! 🔥</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {topMemes.map((meme, index) => (
          <motion.div
            key={meme.id}
            className="p-4  rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="block text-lg font-bold text-yellow-500">#{index + 1}</span>
            <img src={meme.url} alt={meme.name} className="h-60 w-full object-cover rounded-lg" />
            <p className="mt-2 text-lg font-semibold ">{meme.name}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">🔥 {meme.likes} Likes</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
