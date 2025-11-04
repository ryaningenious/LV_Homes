import { useState } from "react";

interface CardProps {
  url?: string;
  title: string;
  description: string;
}

export default function Card({ url, title, description }: CardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`relative w-[400px] h-[500px] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-105 hover:shadow-xl group ${
        flipped ? "rotate-x-0" : ""
      }`}
      onClick={handleClick}
    >
      {url ? (
        <img src={url} alt="" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-12 fill-gray-800 transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
            flipped ? "scale-0" : "group-hover:scale-0"
          }`}
        >
          <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
        </svg>
      )}

      <div
        className={`flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full p-5 bg-gray-200 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          flipped ? "rotate-x-0" : "rotate-x-[-90deg] group-hover:rotate-x-0"
        }`}
      >
        <p className="m-0 text-2xl font-bold text-gray-800">{title}</p>
        <p className="mt-2 text-sm text-gray-600 leading-tight">{description}</p>
      </div>
    </div>
  );
}
