import React, { useState } from "react";
import { motion } from "framer-motion";

const careers = [
  {
    title: "Astronaut",
    fact: "NASA has many female astronauts, like Sally Ride!",
    emoji: "🚀",
    image: "./images/astronaut.png",
    malePercentage: 20,
    femalePercentage: 80,
  },
  {
    title: "Nurse",
    fact: "10% of nurses are male, and in some hospitals, it’s up to 20%!",
    emoji: "🏥",
    image: "./images/nurse.png",
    malePercentage: 10,
    femalePercentage: 90,
  },
  {
    title: "CEO",
    fact: "Many women lead major companies worldwide!",
    emoji: "💼",
    image: "./images/ceo.png",
    malePercentage: 60,
    femalePercentage: 40,
  },
  {
    title: "Chef",
    fact: "Some of the world’s best chefs are women and men!",
    emoji: "🍳",
    image: "./images/chef.png",
    malePercentage: 70,
    femalePercentage: 30,
  },
];

export default function GenderGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFact, setShowFact] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [imageVisible, setImageVisible] = useState(false); // 控制图片显示的状态

  const handleSelect = (choice) => {
    setSelected(choice);
    setShowFact(true);
    setImageVisible(true); // 选择后显示图片
  };

  const nextCareer = () => {
    if (current < careers.length - 1) {
      setSelected(null);
      setShowFact(false);
      setImageVisible(false); // 选择后隐藏图片
      setCurrent((prev) => prev + 1); // Move to the next career
    } else {
      setGameOver(true); // End the game after all questions are answered
    }
  };

  const prevCareer = () => {
    setSelected(null);
    setShowFact(false);
    setImageVisible(false); // 选择后隐藏图片
    setCurrent((prev) => (prev - 1 + careers.length) % careers.length); // Go back to the previous career
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-5">
      {gameOver ? (
        // 显示结束页面
        <motion.div className="text-center">
          <motion.h1 className="text-5xl font-bold text-white mb-8">Thank you for playing!</motion.h1>
          <motion.p className="text-xl text-white">Gender equality is the key to a better future!</motion.p>
        </motion.div>
      ) : (
        <div className="w-80 text-center bg-white p-5 rounded-lg shadow-lg">
          <motion.h2 className="text-3xl mb-3">
            {careers[current].emoji} {careers[current].title}
          </motion.h2>

          {/* 只在选择后显示图片 */}
          {imageVisible && (
            <img
              src={careers[current].image}
              alt={careers[current].title}
              className="mx-auto mb-4 w-40 h-40 object-cover rounded-full"
            />
          )}

          {!showFact ? (
            <div className="space-y-3">
              <button
                onClick={() => handleSelect("Boys")}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Boys
              </button>
              <button
                onClick={() => handleSelect("Girls")}
                className="py-2 px-4 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-700 transition"
              >
                Girls
              </button>
              <button
                onClick={() => handleSelect("Anyone")}
                className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Anyone
              </button>
            </div>
          ) : (
            <>
              <motion.p className="mt-3 text-lg text-gray-700">{careers[current].fact}</motion.p>

              {/* 显示性别数据 */}
              <div className="mt-3">
                <p className="text-md text-gray-600">Male: {careers[current].malePercentage}%</p>
                <p className="text-md text-gray-600">Female: {careers[current].femalePercentage}%</p>
              </div>
            </>
          )}

          <div className="mt-4 space-x-4">
            {current > 0 && (
              <button
                onClick={prevCareer}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                Previous
              </button>
            )}
            {showFact && (
              <button
                onClick={nextCareer}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
