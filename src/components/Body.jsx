import { motion } from "framer-motion";
import MemeOfTheDay from "./MemeOfTheDay";
import HallOfFame from "./HallOfFame";
import MemePoll from "./MemePoll";

const features = [
  { title: "Trending Memes", desc: "🚀 Discover the latest trending memes" },
  { title: "Showcase Creativity", desc: "🎨 Upload and share your funniest memes" },
  { title: "Leaderboard", desc: "🔥 Compete to be the top meme creator" },
  { title: "Fun Community", desc: "🌐 Join a fun and interactive community" },
];

export default function Body() {
  return (
    <div className="mt-16 text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-[var(--text)]"
      >
        Why Join MemeVerse?
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative p-6 bg-white text-black  border border-gray-200 0 rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg cursor-grab"
            whileHover={{ backgroundColor: "black", color: "white" }} 
            whileTap={{ scale: 0.95 }} 
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <MemeOfTheDay />
      <HallOfFame />
      <MemePoll />
    </div>
  );
}
