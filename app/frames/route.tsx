import { frames } from "./frames";
import { Button } from "frames.js/next";
import axios from "axios";

const frameHandler = frames(async (ctx: any) => {
  // User has clicked on a button to vote
  if (ctx.request.method === "POST") {
    // Check if the frame is valid
    if (!ctx.message || !ctx.message.isValid) {
      return {
        status: 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "Invalid Frame" }),
      };
    }

    // Grab the user ID
    const userId = ctx.message.requesterCustodyAddress;

    // Grab the vote option
    const voteOption = ctx.message.buttonIndex === 1 ? "Yes" : "No";

    // Record the vote
    try {
      await axios.post("http://localhost:3000/api/votes", {
        userId,
        vote: voteOption,
      });
    } catch (error: any) {
      // Check if user has already voted
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return {
          status: 200,
          image: (
            <div tw="bg-purple-800 text-white w-full h-full flex justify-center items-center flex-col p-12">
              <span tw="text-4xl text-center font-bold mb-4 bg-black bg-opacity-50 p-8 rounded">
                You already voted.
              </span>
            </div>
          ),
          buttons: [
            <Button
              key="follow-kramer"
              action="link"
              target="https://warpcast.com/kramerapp.eth"
            >
              Follow Kramer
            </Button>,
            <Button key="vote-positions" action="post" target="/vote-positions">
              See Vote Positions
            </Button>,
          ],
          metadata: {
            "fc:frame": "kramer-contest",
            "fc:frame:image": "",
            "og:image": "",
          },
        };
      }

      // Internal server error
      return {
        status: 500,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "Internal Server Error" }),
      };
    }

    // Update frame to show the user's vote
    return {
      status: 200,
      image: (
        <div tw="bg-purple-800 text-white w-full h-full flex justify-center items-center flex-col p-12">
          <span tw="text-4xl text-center font-bold mb-4 bg-black bg-opacity-50 p-8 rounded">
            You voted: {voteOption}
          </span>
        </div>
      ),
      buttons: [
        <Button
          key="follow-kramer"
          action="link"
          target="https://warpcast.com/kramerapp.eth"
        >
          Follow Kramer
        </Button>,
        <Button key="vote-positions" action="post" target="/vote-positions">
          See Vote Positions
        </Button>,
      ],
      metadata: {
        "fc:frame": "kramer-contest",
        "fc:frame:image": "",
        "og:image": "",
      },
    };
  }

  return {
    image: (
      <div tw="bg-purple-800 text-white w-full h-full flex justify-center items-center flex-col p-12">
        <h1 tw="text-4xl text-center font-bold mb-4 bg-black bg-opacity-50 p-8 rounded">
          There will be over 10,000 Kramer predictions before 6/29 midnight.
        </h1>
        <p tw="text-lg bg-black bg-opacity-50 p-2 rounded">
          Join the excitement and make your predictions now!
        </p>
      </div>
    ),
    buttons: [
      <Button key="yes" action="post" target={{ query: { value: "Yes" } }}>
        Say Yes
      </Button>,
      <Button key="no" action="post" target={{ query: { value: "No" } }}>
        Say No
      </Button>,
    ],
    metadata: {
      "fc:frame": "kramer-contest",
      "fc:frame:image": "",
      "og:image": "",
    },
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
