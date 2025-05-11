import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1 bg-black min-h-0 mt-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default HomeLayout;