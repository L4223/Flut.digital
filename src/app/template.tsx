"use client"

import { motion } from "framer-motion";

// Page transition: a short slide only. Content is never rendered with
// opacity 0, so it is visible before hydration and without JavaScript.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 12 }}
      // opacity: 1 also recovers pages whose cached HTML still starts at 0.
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
