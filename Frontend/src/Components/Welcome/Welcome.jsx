import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Welcome = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-600 to-purple-600 px-6 overflow-hidden text-center">
      {/* Animated Background Circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-96 h-96 bg-white opacity-10 rounded-full top-10 left-10"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1.3 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-80 h-80 bg-white opacity-10 rounded-full bottom-10 right-10"
      ></motion.div>

      {/* Welcome Text */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-6xl font-extrabold text-white drop-shadow-lg mb-4"
      >
        Welcome to To-Do Web
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-xl text-white opacity-90 mb-8"
      >
        Developed by Bibek Bot. Stay productive and organized with ease.
      </motion.p>
      <motion.button
        onClick={handleNavigate}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl font-semibold rounded-full shadow-lg transition duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300"
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default Welcome;
