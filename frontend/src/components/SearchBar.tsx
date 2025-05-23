import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      navigate({
        to: '/search',
        search: { query: input.trim() },
      });
      setInput("");
    }
  };

  return (
    <div className="w-full px-4 flex justify-center">
      <input
        type="search"
        className="
          w-full
          
          rounded-full
          border border-gray-300
          px-4 py-2
          text-sm
          text-white
          placeholder-gray-400
          focus:outline-none
          focus:ring-2 focus:ring-amber-500
          focus:border-amber-500
          transition shadow-sm bg-[#1e1e1e]
        "
        placeholder="Search recipes..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search recipes"
      />
    </div>
  );
}
