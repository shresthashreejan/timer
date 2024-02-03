import { motion } from "framer-motion";
import ThemeToggle from "./components/ThemeToggle";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="p-4 overflow-x-hidden">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    delay: 0.5,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                <ThemeToggle />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                <Timer />
            </motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                <Footer />
            </motion.div>
        </div>
    );
}

export default App;
