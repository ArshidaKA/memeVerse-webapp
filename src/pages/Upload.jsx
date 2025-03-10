import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileImage, X, Wand } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { uploadToCloudinary } from "../utils/cloudinary";

const MemeUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedMemes, setUploadedMemes] = useState([]);

  useEffect(() => {
    const storedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    setUploadedMemes(storedMemes);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type.includes("image") || selectedFile.type.includes("gif"))) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      toast.error("Only images and GIFs are allowed!");
    }  
  };

  const generateAICaption = async () => {
    setLoading(true);
    setTimeout(() => {
      setCaption("This is an AI-generated funny caption!");
      setLoading(false);
    }, 1000);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please upload an image first!");
    
    setLoading(true);
    const imageUrl = await uploadToCloudinary(file);
    setLoading(false);
    
    if (imageUrl) {
      const newMeme = { imageUrl, caption };
      const updatedMemes = [newMeme, ...uploadedMemes];
      setUploadedMemes(updatedMemes);
      localStorage.setItem("uploadedMemes", JSON.stringify(updatedMemes));
      toast.success("Meme uploaded successfully!");
      setFile(null);
      setPreview(null);
      setCaption("");
    } else {
      toast.error("Upload failed. Try again.");
    }
  };

  return (
    <>
    <div className="max-w-3xl mx-auto p-6  shadow-lg rounded-xl ">
      <ToastContainer />
      <motion.h1 
        className="text-2xl font-bold mb-4 text-center" 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🚀 Upload Your Meme
      </motion.h1>
      
      <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-6 rounded-lg transition duration-300">
        <UploadCloud className="w-12 h-12 text-gray-500" />
        <span className="mt-2 text-gray-600">Click to Upload Image/GIF</span>
        <input type="file" accept="image/*,image/gif" className="hidden" onChange={handleFileChange} />
      </label>

      {preview && (
        <div className="relative mt-4">
          <img src={preview} alt="Meme Preview" className="w-full rounded-lg shadow" />
          <button
            className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full"
            onClick={() => {
              setPreview(null);
              setFile(null);
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <textarea
        className="w-full mt-4 p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-gray-800"
        rows="3"
        placeholder="Add a funny caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          onClick={generateAICaption}
          disabled={loading}
        >
          <Wand className="w-5 h-5" /> {loading ? "Generating..." : "AI Caption"}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
          onClick={handleUpload}
          disabled={loading}
        >
          <FileImage className="w-5 h-5" /> {loading ? "Uploading..." : "Upload Meme"}
        </motion.button>
      </div>

      {uploadedMemes.length > 0 && (
  <div className="mt-10">
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-xl font-bold mb-4"
    >
      🎭 Your Uploaded Memes
    </motion.h2>

    <div className="grid grid-cols-2 gap-4">
      {uploadedMemes.map((meme, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="border rounded-lg overflow-hidden shadow transition"
        >
          <img
            src={meme.imageUrl}
            alt="Uploaded Meme"
            className="w-full"
          />
          <p className="p-2 text-sm text-gray-700">{meme.caption}</p>
        </motion.div>
      ))}
    </div>
  </div>
)}


    </div>
     <div className="max-w-4xl mx-auto text-center py-16 px-6">
     <h2 className="text-3xl font-bold text-[var(--text)]">
       Stay Updated with the Fun! 
     </h2>
     <p className="text-gray-600 dark:text-gray-300 mt-4">
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

export default MemeUpload;
