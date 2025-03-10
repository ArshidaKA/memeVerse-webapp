import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const UserProfile = () => {
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [profile, setProfile] = useState({
    name: "John Doe",
    bio: "Meme lover & creator 🤪",
    profilePic: "https://img.freepik.com/free-photo/vertical-shot-happy-dark-skinned-female-with-curly-hair_273609-15519.jpg",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    setUploadedMemes(storedMemes);

    const storedLikedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    setLikedMemes(storedLikedMemes);
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  return (
    <motion.div 
      className="max-w-3xl mx-auto p-6 shadow-xl rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="flex flex-col items-center border-b pb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label className="cursor-pointer relative">
          <motion.img
            src={profile.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
            whileHover={{ scale: 1.1 }}
          />
          {editMode && (
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleProfilePicChange}
            />
          )}
        </label>

        {editMode ? (
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            className="text-xl font-bold mt-3 border p-1 rounded text-center"
          />
        ) : (
          <h2 className="text-2xl font-bold mt-3 ">{profile.name}</h2>
        )}

        {editMode ? (
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleProfileChange}
            className="w-full mt-2 border p-2 rounded text-center"
          />
        ) : (
          <p className="text-gray-600 text-center mt-1">{profile.bio}</p>
        )}

        <motion.button
          onClick={() => setEditMode(!editMode)}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          whileTap={{ scale: 0.9 }}
        >
          {editMode ? "Save" : "Edit Profile"}
        </motion.button>
      </motion.div>

      <h3 className="text-xl font-semibold mt-6 mb-3 ">Liked Memes ❤️</h3>
      {likedMemes.length === 0 ? (
        <p className="text-gray-500">You haven't liked any memes yet.</p>
      ) : (
        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {likedMemes.map((meme, index) => (
            <motion.div 
              key={index} 
              className="border rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src={meme.imageUrl} alt="Liked Meme" className="w-full" />
              <p className="p-2">{meme.caption}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      <h3 className="text-xl font-semibold mt-6 mb-3 ">Your Uploaded Memes 📤</h3>
      {uploadedMemes.length === 0 ? (
        <p className="text-gray-500">No memes uploaded yet.</p>
      ) : (
        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {uploadedMemes.map((meme, index) => (
            <motion.div 
              key={index} 
              className="border rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src={meme.imageUrl} alt="Uploaded Meme" className="w-full" />
              <p className="p-2">{meme.caption}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      <br /><br />
      <motion.p 
        className="text-gray-700 text-center font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        📢 Show Off Your Creativity! 🎨 Upload your funniest memes and see them displayed here!
      </motion.p>
    </motion.div>
  );
};

export default UserProfile;