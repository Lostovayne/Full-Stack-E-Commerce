"use client";

import type { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactElement } from "react";
import ProductCard from "./ProductCard";
import ProductThumb from "./ProductThumb";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: FC<ProductGridProps> = ({ products }): ReactElement => {
  return (
    <div className="grid size-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-5">
      {products.map((product, index) => (
        <AnimatePresence key={`${product._id}-${index}`}>
          <motion.div
            layout
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <ProductThumb product={product} />
            {/* <ProductThumb product={product} /> */}
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default ProductGrid;
