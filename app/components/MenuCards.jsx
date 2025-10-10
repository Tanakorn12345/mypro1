import { motion } from "framer-motion";

export default function MenuCard({ item }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow p-4 flex flex-col items-center text-center"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-contain mb-3"
      />
      <h4 className="font-medium">{item.name}</h4>
      <p className="text-red-600 font-bold mt-1">{item.price}</p>
      <button className="mt-3 bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition">
        +
      </button>
    </motion.div>
  );
}
