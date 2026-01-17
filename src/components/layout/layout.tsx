import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollToTop from '../ScrollToTop';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <ScrollToTop />
            <Header />
            <main className="flex-1 container mx-auto px-4 pt-16 py-8 pb-24 lg:pb-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
