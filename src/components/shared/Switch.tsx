import React, { useState } from "react";

type Props = {
  isActive: boolean;
  callback?: (currentState: boolean) => Promise<boolean>;
};

const Switch = ({ isActive, callback = async () => true }: Props) => {
  const [isOn, setIsOn] = useState<boolean>(isActive);

  const handleClick = async () => {
    if (await callback(!isOn)) {
      setIsOn(!isOn);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer ${isOn ? "bg-green-400" : "bg-gray-400"
        }`}
    >
      <span
        className={`absolute inset-y-0 left-0 flex items-center justify-center w-6 h-6 transition duration-200 ease-in-out transform ${isOn ? "translate-x-4" : "translate-x-0"
          } bg-white rounded-full shadow`}
      ></span>
    </div>
  );
};

export default Switch;
