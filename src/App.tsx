import ThemeToggle from "./components/ThemeToggle";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

function App() {
    return (
        <h1 className="p-4">
            <ThemeToggle />
            <Timer />
            <Footer />
        </h1>
    );
}

export default App;
