export const getRandomTopic = () => {
  const topics = [
    "Cyber Cityscape",
    "Mythical Creature",
    "Galactic Exploration",
    "Underwater Civilization",
    "Enchanted Forests",
    "Steampunk Inventions",
    "Alien Flora and Fauna",
    "High Fantasy Battles",
    "Post-Apocalyptic Landscapes",
    "Magical Artifacts",
  ];

  const randomIndex = Math.floor(Math.random() * topics.length);
  return topics[randomIndex];
};
