import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MemeOfTheDay() {
  const { memes } = useSelector((state) => state.memes);
  const [memeOfTheDay, setMemeOfTheDay] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (memes.length > 0) {
      const randomIndex = new Date().getDate() % memes.length;
      setMemeOfTheDay(memes[30]);
    }
  }, [memes]);

  if (!memeOfTheDay) return null;

  return (
    <div className="mt-16 text-center">
      <motion.h2
        className="text-3xl font-bold text-[var(--text)]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Meme of the Day! 
      </motion.h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">Laugh out loud with today's top pick! 😂</p>

      <div className="mt-6 relative p-4 rounded-xl shadow-lg max-w-lg mx-auto">
        <motion.div
          className="relative h-80 w-full rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Blurred Image with Reveal Effect */}
          <img
            src={memeOfTheDay.url}
            alt={memeOfTheDay.name}
            className={`h-full w-full object-cover rounded-lg transition-all duration-500 ${
              revealed ? "blur-0" : "blur-md grayscale"
            }`}
          />

          {!revealed && (
            <motion.button
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold text-lg py-2 px-6 rounded-lg transition duration-300 hover:bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onClick={() => setRevealed(true)}
            >
              Reveal Meme 👀
            </motion.button>
          )}
        </motion.div>

        <AnimatePresence>
          {revealed && (
            <motion.p
              className="mt-2 text-lg font-semibold text-gray-800 dark:text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              {memeOfTheDay.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
