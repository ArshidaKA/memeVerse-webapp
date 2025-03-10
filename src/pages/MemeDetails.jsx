import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaComment, FaShareAlt } from "react-icons/fa";

function MemeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const meme = useSelector((state) => state.memes.memes.find((m) => m.id === id));
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
    setComments(storedComments);
  }, [id]);

  const handleComment = () => {
    if (comment.trim()) {
      const newComment = { text: comment, likes: 0 };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
      setComment("");
    }
  };

  const handleLikeComment = (index) => {
    const updatedComments = comments.map((cmt, i) =>
      i === index ? { ...cmt, likes: cmt.likes + 1 } : cmt
    );
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (!meme) return <p className="text-center">Meme not found!</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <motion.img
        src={meme.url}
        alt={meme.name}
        className="w-full h-[400px] object-cover rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <h1 className="text-2xl font-bold mt-4">{meme.name}</h1>
      <p className="text-gray-600">👍 {meme.likes} | 💬 {comments.length}</p>

      <div className="flex space-x-4 mt-4">
        <motion.button
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
          whileTap={{ scale: 1.2 }}
        >
          <FaHeart />
          <span>Like</span>
        </motion.button>

        <motion.button
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          onClick={handleShare}
          whileTap={{ scale: 1.2 }}
        >
          <FaShareAlt />
          <span>Share</span>
        </motion.button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="space-y-2 mt-2">
          {comments.map((cmt, index) => (
            <motion.div
              key={index}
              className="p-2 rounded-md flex justify-between items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span>{cmt.text}</span>
              <motion.button
                onClick={() => handleLikeComment(index)}
                className="text-red-500 flex items-center space-x-1"
                whileTap={{ scale: 1.2 }}
              >
                <FaHeart /> <span>{cmt.likes}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 p-2 border rounded-md"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <motion.button
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={handleComment}
            whileTap={{ scale: 0.9 }}
          >
            <FaComment />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default MemeDetails;
