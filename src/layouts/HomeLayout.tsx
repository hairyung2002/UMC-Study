import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { Sidebar } from "../components/SideBar";
import { useState } from "react";

const HomeLayout = () => {
    const [ isSide, setIsSide ] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar onMenuClick={() => setIsSide(true)} />
            <div className="flex flex-1">
                <Sidebar isOpen={isSide} onClose={() => setIsSide(false)} />
                <main className="flex-1 bg-black p-4">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default HomeLayout;