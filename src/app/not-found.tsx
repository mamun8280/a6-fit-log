
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] bg-[#0f1115] text-white flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-8xl font-extrabold text-[#ccff00] mb-2 tracking-wider">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 uppercase tracking-wide">Page Not Found</h2>
            <p className="text-gray-400 mb-8 max-w-md text-sm md:text-base">
                Oops! The page you are looking for does not exist or has been moved. Let&apos;s get you back on track.
            </p>
            <Link 
                href="/" 
                className="bg-[#ccff00] text-black font-extrabold px-8 py-3.5 rounded-2xl hover:opacity-90 transition-all shadow-lg text-sm tracking-wider uppercase"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;