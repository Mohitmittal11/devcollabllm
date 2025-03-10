/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import ModelSelector from "../components/ModelSelector";
import { MessageSquare } from "lucide-react";
import { detailProject } from "../lib/Project";
import { Project } from "../ts/Interfaces/Project";
import { Send, Search, Clock, ArrowDown } from "lucide-react";
import { LLMModel } from "../types";
import { Chat, ChatList } from "../lib/Chat";
import { ChatInterface } from "../ts/Interfaces/Chat";
import { toast } from "react-toastify";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectDetails, setProjectDetails] = useState<Project>();
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(true);
  const [chatList, setChatList] = useState<ChatInterface[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<string>("deepseek");

  const cookies = document.cookie.split("; ");
  const role = cookies.find((row) => row.startsWith("role="))?.split("=")[1];

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails(projectId);
      setIsSearching(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectDetails?.projectId) {
      fetchChatList(projectDetails?.projectId);
    }
  }, [projectDetails]);

  const fetchProjectDetails = async (id: string) => {
    try {
      const res = await detailProject(id);
      if (res.code == 200) {
        setProjectDetails(res.data);
      }
    } catch (error) {
      console.log("Error while ", error);
    }
  };

  // Available LLM models
  const models: LLMModel[] = [
    {
      id: "deepseek",
      name: "DeepSeek",
      description:
        "Optimized for deep code reasoning and complex problem-solving",
      strengths: [
        "Code review and refactoring",
        "Architecture planning",
        "Complex debugging",
        "Performance optimization",
      ],
    },
    {
      id: "llama",
      name: "Llama",
      description: "General purpose coding assistant with broad knowledge",
      strengths: [
        "Documentation generation",
        "Test creation",
        "Quick code snippets",
        "Learning resources",
      ],
    },
  ];

  const fetchChatList = async (id?: string, search?: string) => {
    try {
      let paramsData: any = {
        id: id,
        role: role,
      };
      if (search) {
        paramsData = { ...paramsData, search: search };
      }
      const response = await ChatList(paramsData);
      if (response.code == 200) {
        setChatList(response.data.response);
        setIsChatLoading(false);
      }
    } catch (error) {
      setIsChatLoading(false);
      console.log("Error is ", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const chatBodyData = {
        query: messageInput,
        modelType: selectedModel,
        role: role,
        projectId: projectDetails?.projectId,
      };

      const newMessage = {
        message: messageInput,
        time: new Date().toLocaleTimeString(),
        response: "hello", // Initially empty
      };

      // Add new message to chatList
      setChatList((prev: any) => [...prev, newMessage]);
      setMessageInput("");

      const response = await Chat(chatBodyData);

      if (response.code === 201) {
        setChatList((prev: any) => {
          const updatedChatList = [...prev];
          updatedChatList[updatedChatList.length - 1].response =
            response.data.response;
          return updatedChatList;
        });
      }
    } catch (error: any) {
      toast.error(error?.response.data.message);
      setTimeout(() => {
        fetchChatList(projectDetails?.projectId);
      }, 1000);
      console.log("Error is ", error);
    }
  };

  const handleSearch = (search: string) => {
    fetchChatList(projectDetails?.projectId, search);
  };

  return (
    <Fragment>
      {isChatLoading ? (
        <p className="text-center text-2xl font-semibold text-gray-900">
          Loading...
        </p>
      ) : (
        <div className="h-full flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {projectDetails?.name}
            </h1>
            <p className="text-gray-600">{projectDetails?.description}</p>
          </div>

          <div className="flex-1 flex gap-6">
            {/* Chat section */}
            <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm overflow-auto">
              {/* Search bar */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />

                  <input
                    type="text"
                    placeholder="Search in conversation..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      if (!e.target.value) {
                        fetchChatList(projectDetails?.projectId);
                      }
                    }}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {searchTerm && (
                    <button
                      onClick={() => handleSearch(searchTerm)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {isSearching ? "Clear" : "Search"}
                    </button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto max-h-[400px]">
                {isSearching ? (
                  // Search results
                  chatList && chatList.length > 0 ? (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">
                          Search results for "{searchTerm}"
                        </h3>
                        <button
                          // onClick={clearSearch}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Back to conversation
                        </button>
                      </div>

                      <div className="space-y-4">
                        {chatList.map((message) => (
                          <ChatMessage key={message._id} message={message} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-6">
                      <Search className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        No results found
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Try different keywords or go back to the conversation
                      </p>
                      <button
                        // onClick={clearSearch}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Back to conversation
                      </button>
                    </div>
                  )
                ) : chatList.length > 0 ? (
                  // Regular conversation
                  <div>
                    {chatList.map((item) => (
                      <ChatMessage key={item._id} message={item} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  // Empty conversation
                  <div className="flex flex-col items-center justify-center h-full p-6">
                    <div className="bg-gray-100 p-3 rounded-full mb-4">
                      <MessageSquare className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No messages yet
                    </h3>
                    <p className="text-gray-500 text-center max-w-md mb-6">
                      Start a conversation with the AI assistant to get help
                      with your project.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        All conversations are saved for future reference
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input area */}
              {!isSearching && (
                <div className="p-4 border-t">
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-end gap-2"
                  >
                    <div className="flex-1">
                      <textarea
                        value={messageInput}
                        onChange={(e) =>
                          setMessageInput(e.target.value.trimStart())
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.currentTarget.value) {
                            handleSendMessage(e);
                          }
                        }}
                        placeholder="Ask a question or request code help..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>
                          Using{" "}
                          {selectedModel === "deepseek" ? "DeepSeek" : "Llama"}{" "}
                          model
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            messagesEndRef.current?.scrollIntoView({
                              behavior: "smooth",
                            })
                          }
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <ArrowDown className="h-3 w-3 mr-1" />
                          Scroll to bottom
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isChatLoading}
                      className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-80 flex-shrink-0">
              <ModelSelector
                models={models}
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProjectDetail;
