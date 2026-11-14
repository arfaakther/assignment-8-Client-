
import Link from "next/link";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white p-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-orange-400">
            HopeTogether.
          </h2>
          <p className="text-gray-400 mt-3">
            Together we can make the world a better place.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2 text-gray-400">
            <Link href="/">Home</Link>
            <Link href="#about">About</Link>
            <Link href="#events">Events</Link>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 border-t border-gray-700 mt-8 pt-5">
        © 2026 HopeTogether. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
