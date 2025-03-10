import { useState } from "react";

const ToggleOne = ({
  id,
  state,
  onChange,
  disabled,
}: {
  id: string;
  state?: boolean;
  name: string;
  onChange: (newState: boolean) => void | Promise<void>;
  disabled?: boolean;
  isStatusChanging?: boolean;
}) => {
  const [isStatusChanging, setStatusChanging] = useState<boolean>(false);

  const handleChange = async () => {
    const newState = !state;
    setStatusChanging(true);
    await onChange(newState);
    setTimeout(() => {
      setStatusChanging(false);
    }, 1000);
  };

  return (
    <div className="cursor-pointer flex">
      <label
        id={id}
        className="flex items-center cursor-pointer select-none text-dark dark:text-white"
      >
        {isStatusChanging ? (
          <svg
            className="w-5 h-5 text-slate-500 animate-spin ml-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <div className="relative">
            <input
              onChange={handleChange}
              checked={state}
              id={id}
              type="checkbox"
              className="peer sr-only"
              disabled={disabled}
            />
            <div
              className={`h-5 rounded-full shadow-inner w-12 border ${
                !state ? "border border-gray-300" : "border border-bg-blue-500"
              }`}
            ></div>

            <div
              className={`absolute transition rounded-full dot shadow-switch-1 -top-1 h-7 w-7 ${
                state && "-left-[7px] peer-checked:translate-x-full"
              } ${!state ? "bg-gray-300" : "bg-blue-500"}`}
            ></div>
          </div>
        )}
      </label>
    </div>
  );
};

export default ToggleOne;
