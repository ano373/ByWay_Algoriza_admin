import { FaFacebook, FaGoogle, FaMicrosoft } from "react-icons/fa6";

export default function AuthMediaSection() {
  return (
    <div className="flex flex-wrap gap-7 justify-center">
      <a
        href="https://facebook.com"
        className="flex items-center gap-3 p-5 border border-gray-300 rounded-md hover:bg-gray-50 transition"
      >
        <FaFacebook className="text-4xl text-[#1877F2]" />
        <span className="text-xl font-semibold text-[#1877F2]">Facebook</span>
      </a>

      <a
        href="https://google.com"
        className="flex items-center gap-3 p-5 border border-gray-300 rounded-md hover:bg-gray-50 transition"
      >
        <FaGoogle className="text-4xl text-[#DB4437]" />
        <span className="text-xl font-semibold text-[#DB4437]">Google</span>
      </a>

      <a
        href="https://microsoft.com"
        className="flex items-center gap-3 p-5 border border-gray-300 rounded-md hover:bg-gray-50 transition"
      >
        <FaMicrosoft className="text-4xl text-[#00A4EF]" />
        <span className="text-xl font-semibold text-[#00A4EF]">Microsoft</span>
      </a>
    </div>
  );
}
