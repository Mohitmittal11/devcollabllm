/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatMessage: React.FC<any> = ({ message }) => {
  const [isCopy, setCopy] = useState<boolean>(false);
  const reponseRef = useRef<any>(null);
  const handleCopy = () => {
    if (reponseRef.current) {
      const textToCopy =
        reponseRef.current.innerText || reponseRef.current.textContent;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopy(true);
          setTimeout(() => {
            setCopy(false);
          }, 3000);
        })
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  return (
    <div className="p-4">
      {/* User Message */}
      <div className="flex flex-col float-right">
        <div className="flex justify-center float-right border-gray-500 bg-gray-100 text-gray-900 py-2 text-nowrap px-3 rounded-lg max-w-[100%]">
          <p>{message.message}</p>
        </div>
        <p className="text-xs font-medium text-gray-400">{message.time}</p>
      </div>

      {message.response == "hello" ? (
        <p className="text-4xl mt-16 text-black tracking-widest animate-pulse">
          ...
        </p>
      ) : (
        <div className="relative mt-16">
          <div ref={reponseRef}>
            <SyntaxHighlighter
              wrapLines={false}
              style={prism}
              language="typescript"
              lineNumberContainerStyle={{
                paddingRight: "12px",
                color: "#333",
                fontSize: "12px",
                fontWeight: "bold",
                background: "#f5f5f5",
              }}
              customStyle={{
                paddingTop: "48px",
              }}
            >
              {message.response}
            </SyntaxHighlighter>
          </div>
          <span
            onClick={() => handleCopy()}
            className="absolute top-1 right-1 cursor-pointer px-2 rounded-md items-center"
          >
            {isCopy ? "copied" : "copy"}
          </span>
        </div>
      )}
    </div>
  );
};

// border border-gray-500 bg-gray-900 text-white p-6 pt-12 rounded-lg overflow-auto relative

export default ChatMessage;
