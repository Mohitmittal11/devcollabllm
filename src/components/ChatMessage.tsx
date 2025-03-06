/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const ChatMessage: React.FC<any> = ({ message }) => {
  const [isCopy, setCopy] = useState<boolean>(false);
  const reponseRef = useRef<any>(null);
  const handleCopy = () => {
    if (reponseRef.current) {
      const textToCopy =
        reponseRef.current.innerText || reponseRef.current.textContent;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => setCopy(true))
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  return (
    <div className="p-4">
      {/* User Message */}
      <div className="flex flex-col float-right">
        <div className="flex justify-center float-right border-gray-500 bg-gray-900 text-white py-2 text-nowrap px-3 rounded-lg max-w-[100%]">
          <p>{message.message}</p>
        </div>
        <p className="text-xs font-medium text-gray-400">{message.time}</p>
      </div>

      {message.response && (
        <div className="w-full h-full mt-16 border border-gray-500 bg-gray-900 text-white p-6 pt-12 rounded-lg overflow-auto relative">
          <div ref={reponseRef}>
            <ReactMarkdown>{message.response}</ReactMarkdown>
          </div>
          <span
            onClick={() => handleCopy()}
            className="absolute top-1 right-1 cursor-pointer border border-white px-2 rounded-md items-center hover:shadow-lg"
          >
            {isCopy ? "copied" : "copy"}
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
