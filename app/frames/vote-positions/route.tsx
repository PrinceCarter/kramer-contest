import Header from "@/app/components/Header";
import { frames } from "../frames";
import { Button } from "frames.js/next";
import fs from "fs";
import path from "path";

var dir = "/tmp";

const votesFilePath = path.join(dir, "votes.json");

interface VotesData {
  [key: string]: string;
}

export const POST = frames(async () => {
  let votesData: VotesData = {};

  if (fs.existsSync(votesFilePath)) {
    const fileContents = fs.readFileSync(votesFilePath, "utf8");
    votesData = JSON.parse(fileContents);
  } else {
    fs.mkdirSync(dir);
    console.log("Successfully created tmp");
  }

  // Get total count of Yes votes
  const yesCount = Object.values(votesData).filter(
    (vote) => vote === "Yes"
  ).length;

  // Get total count of No votes
  const noCount = Object.values(votesData).filter(
    (vote) => vote === "No"
  ).length;

  return {
    image: (
      <div tw="flex bg-blue-600 text-white w-full h-full flex flex-col justify-start items-start p-12">
        <Header />
        <div tw="flex flex-grow"></div>
        <p tw="text-3xl mb-4">Aggregated Voting Positions:</p>
        <div tw="flex w-full">
          <div tw="flex bg-white text-blue-600 w-1/2 rounded-lg shadow-lg justify-center mr-2">
            <h2 tw="text-4xl font-bold px-8 text-green-600">Yes: {yesCount}</h2>
          </div>
          <div tw="flex bg-white text-blue-800 w-1/2 rounded-lg shadow-lg justify-center ml-2">
            <h2 tw="text-4xl font-bold px-8 text-red-600">No: {noCount}</h2>
          </div>
        </div>
      </div>
    ),
    buttons: [
      <Button key="go-back" action="post" target="/">
        Go Back
      </Button>,
    ],
    metadata: {
      "fc:frame": "kramer-contest",
      "fc:frame:image": "",
      "og:image": "",
    },
  };
});
