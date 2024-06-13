import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

// Path to the file where votes are stored
const votesFilePath = path.join(process.cwd(), "votes.json");

interface VotesData {
  [key: string]: string;
}

// Function to read the votes data from the JSON file
async function readVotesData(): Promise<VotesData> {
  try {
    // Read the file contents and parse it as JSON
    const fileContents = await fs.readFile(votesFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    // Properly check for known error types
    if (error instanceof Error && error.message.includes("ENOENT")) {
      // If file does not exist, return an empty object
      return {};
    } else {
      console.error("Failed to read votes data:", error);
      throw new Error("Failed to read votes data.");
    }
  }
}

// Function to write the updated votes data to the JSON file
async function writeVotesData(votesData: VotesData): Promise<void> {
  // Write the updated votes data to the votes.json file
  await fs.writeFile(votesFilePath, JSON.stringify(votesData, null, 2));
}

export async function POST(req: NextRequest) {
  const { userId, vote } = await req.json();

  // Read the votes data from the votes.json file
  const votesData = await readVotesData();

  // Check if the user has already voted
  if (votesData[userId]) {
    return NextResponse.json(
      { message: "User has already voted", vote: votesData[userId] },
      { status: 400 }
    );
  }

  // Update the votes data with the new vote
  votesData[userId] = vote;

  // Write the updated votes data to the votes.json file
  await writeVotesData(votesData);

  // Confirm the vote recording
  return NextResponse.json({ message: "Vote recorded" }, { status: 200 });
}

export async function GET() {
  // Only allow POST requests, respond with 405 Method Not Allowed for GET requests
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
