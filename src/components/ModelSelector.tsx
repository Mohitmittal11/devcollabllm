import React from "react";
import { LLMModel } from "../types";

interface ModelSelectorProps {
  models: LLMModel[];
  selectedModel: string;
  onSelectModel: (modelId: "deepseek" | "llama") => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onSelectModel,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-medium mb-3">Select AI Model</h3>

      <div className="space-y-3">
        {models.map((model) => (
          <div
            key={model.id}
            className={`
              relative p-3 rounded-lg border cursor-pointer transition-all
              ${
                selectedModel === model.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
            onClick={() => onSelectModel(model.id)}
          >
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  model.id === "deepseek" ? "bg-purple-500" : "bg-green-500"
                }`}
              />
              <h4 className="font-medium">{model.name}</h4>
            </div>

            <p className="text-sm text-gray-600 mt-1">{model.description}</p>

            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Strengths:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {model.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-1.5" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
