import Image from "next/image";

interface FounderCardProps {
  img: string;
  h1: string;
  p: string[];
  className?: string;
}

export default function FounderCard({ img, h1, p, className }: FounderCardProps) {
  return (
    <div className={`flex flex-col items-center p-4 ${className}`}>
      <Image
        src={img}
        alt={h1}
        width={256}
        height={256}
        className="w-40 h-50 mt-4 rounded-full object-cover mb-5"
      />
      <h2 className="text-xl font-semibold text-gray-800">{h1}</h2>
      {p.map((title, index) => (
        <p key={index} className="text-gray-600 text-sm text-center">{title}</p>
      ))}
    </div>
  );
}