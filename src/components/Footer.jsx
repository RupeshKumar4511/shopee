import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center py-6 px-4 bg-gray-200 w-full z-20 text-center">
            <ul className="flex flex-col sm:flex-row items-center justify-evenly gap-3 sm:gap-6 py-3 w-full max-w-5xl">
                <li>
                    <h1 className="text-2xl md:text-3xl text-blue-900 font-bold">
                        Shopee
                    </h1>
                </li>
                <li>
                    <Link to="/" className="text-blue-900 hover:underline text-sm sm:text-base">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/" className="text-blue-900 hover:underline text-sm sm:text-base">
                        Features
                    </Link>
                </li>
                <li>
                    <Link to="/" className="text-blue-900 hover:underline text-sm sm:text-base">
                        Terms
                    </Link>
                </li>
                <li>
                    <Link to="/" className="text-blue-900 hover:underline text-sm sm:text-base">
                        Privacy
                    </Link>
                </li>
            </ul>

            <p className="py-2 text-sm sm:text-base text-gray-800">
                Helpline No :{" "}
                <a href="tel:9306141076" className="font-medium hover:underline">
                    9306141076
                </a>
            </p>

            <p className="py-2 text-xs sm:text-sm text-gray-600">
                &copy; {new Date().getFullYear()} Rupesh Kumar. All rights reserved.
            </p>
        </footer>
    );
}
