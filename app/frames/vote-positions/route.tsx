import { frames } from "../frames";
import { Button } from "frames.js/next";
import fs from "fs";
import path from "path";

const votesFilePath = path.join(process.cwd(), "votes.json");

interface VotesData {
  [key: string]: string;
}

export const POST = frames(async () => {
  let votesData: VotesData = {};

  if (fs.existsSync(votesFilePath)) {
    const fileContents = fs.readFileSync(votesFilePath, "utf8");
    votesData = JSON.parse(fileContents);
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
      <div tw="bg-purple-800 text-white w-full h-full flex justify-center items-center flex-col p-12">
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          Vote Position
        </h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          Yes: {yesCount}
        </p>
        <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          No: {noCount}
        </p>
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
