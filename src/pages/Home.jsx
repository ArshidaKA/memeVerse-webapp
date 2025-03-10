import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMemes } from "../redux/memeSlice"; 
import Body from "../components/Body";
import { motion } from "framer-motion";

export default function Home() {
  const dispatch = useDispatch();
  const { memes, loading } = useSelector((state) => state.memes);

  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 bg-[#fce7e7] text-yellow-600 rounded-full text-sm font-medium mb-8"
          >
            Create Memes, Go Viral
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl italic font-mono font-bold mb-6"
          >
            Transform Your{" "}
            <span className="text-yellow-600">
              meme
              <br />
              game
            </span>{" "}
            with MemeVerse
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto text-gray-500 text-lg mb-10"
          >
            Explore the ultimate meme hub where creativity meets humor. Create, share, and enjoy the funniest memes—all in one place!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="/explore"
              className="inline-flex items-center bg-yellow-600 text-white px-7 py-3 rounded-full font-medium text-lg hover:scale-105 transition-transform duration-300"
            >
              Explore Now <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            {loading ? (
              <p className="text-gray-500">Loading memes...</p>
            ) : (
              <Splide
                options={{
                  type: "loop",
                  drag: "free",
                  focus: "center",
                  perPage: 3,
                  gap: "1rem",
                  autoScroll: {
                    speed: 1,
                  },
                  pagination: false,
                }}
                extensions={{ AutoScroll }}
              >
                {memes.map((meme) => (
                  <SplideSlide key={meme.id}>
                    <motion.img
                      src={meme.url}
                      alt={meme.name}
                      className="rounded-lg shadow-md object-cover h-[300px] w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            )}
          </motion.div>
        </div>
      </main>
      <Body />
    </div>
  );
}
