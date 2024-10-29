import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SideDrawer = ({ isOpen, closeDrawer, children }) => {
  //console.log("children from drawer",children)
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Background */}
          <motion.div
            className="fixed inset-0 bg-black/10 bg-opacity-30 z-40"
            onClick={closeDrawer}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg z-50 p-5 rounded-l-xl"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideDrawer;
