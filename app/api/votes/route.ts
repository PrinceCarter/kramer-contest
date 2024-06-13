import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

// Path to the file where votes are stored
const votesFilePath = path.join(process.cwd(), "votes.json");

interface VotesData {
  [key: string]: string;
}

export async function POST(req: NextRequest) {
  const { userId, vote } = await req.json();
  console.log("Received vote:", { userId, vote });

  // Read existing votes from the file
  let votesData: VotesData = {};
  if (fs.existsSync(votesFilePath)) {
    const fileContents = fs.readFileSync(votesFilePath, "utf8");
    votesData = JSON.parse(fileContents);
  }

  // Check if user has already voted
  if (votesData[userId]) {
    console.log("User has already voted:", userId);
    return NextResponse.json(
      { message: "User has already voted", vote: votesData[userId] },
      { status: 400 }
    );
  }

  // Save the vote
  votesData[userId] = vote;

  // Write the updated votes to the file. If the file doesn't exist, it will be created.
  fs.writeFileSync(votesFilePath, JSON.stringify(votesData, null, 2));
  console.log("Vote recorded:", { userId, vote });

  return NextResponse.json({ message: "Vote recorded" }, { status: 200 });
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
