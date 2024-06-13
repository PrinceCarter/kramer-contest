import React from "react";

interface MessageBoxProps {
  title: string;
  message: string;
  vote?: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ title, message, vote }) => {
  return (
    <div tw="flex flex-col w-full">
      <p tw="text-3xl mb-4">{title}</p>
      <div tw="flex bg-white w-full rounded-lg shadow-xl justify-center items-center">
        <p tw="font-black text-blue-600 px-8">
          {message}
          {vote && (
            <span
              style={{
                color: vote === "Yes" ? "green" : "red",
              }}
              tw="text-4xl font-bold"
            >
              {vote}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default MessageBox;
