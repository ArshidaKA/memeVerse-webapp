import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaGithub, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gray-950 text-gray-300 py-10 mt-16"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-white tracking-wide">Meme <span className="text-[var(--primary)]">Verse</span></h2>
          <p className="text-sm mt-1 opacity-75">© {new Date().getFullYear()} MemeVerse. All rights reserved.</p>
        </div>

        <nav className="flex flex-wrap justify-center md:justify-end gap-6">
          {[ "Explore", "Upload", "Leaderboard"].map((item, index) => (
            <Link
              key={index}
              to={item.toLowerCase()}
              className="relative text-gray-400 transition hover:text-white"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex gap-5">
          {[FaTwitter, FaInstagram, FaGithub, FaGlobe].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="text-xl text-gray-400 hover:text-white transition transform hover:scale-110"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
