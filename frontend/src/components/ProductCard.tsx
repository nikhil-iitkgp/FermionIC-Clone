import { motion } from "framer-motion";

interface ProductProps {
  title: string;
  description: string;
  image: string;
}

const ProductCard = ({ title, description, image }: ProductProps) => {
  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
    </motion.div>
  );
};

export default ProductCard;
