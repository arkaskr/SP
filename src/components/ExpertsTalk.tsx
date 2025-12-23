import Image from "next/image";
import Link from "next/link";
import { BsCheck2Circle } from "react-icons/bs";

const ExpertsTalk = () => {
  const image = "/assets/images/Global expert.jpeg";

  return (
    <div className="relative flex flex-col md:flex-row items-start translate-y-40 justify-between py-36 w-screen">
      {/* Blue Background + Text */}
      <div className="w-full bg-blue-100 space-y-6 px-8 py-4 mt-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 ">
          <div>Global Experts,</div>
          <div>Personalized Support</div>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg">
          Our team is here to help you to navigate every aspect of studying abroad.
        </p>

        <div>
          <Link href="/study-abroad" className="inline-block">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Let&apos;s Talk
            </button>
          </Link>
        </div>
      </div>

      {/* Image moved to right edge */}
      <div className="absolute right-0 top-1/2 transform -translate-y-80 mr-20 hidden md:block">
        <Image
          src={image}
          alt="Global expert"
          width={320}
          height={480}
          className="w-80 h-full rounded-lg shadow-md object-cover"
        />
      </div>
    </div>
  );
};

export default ExpertsTalk;