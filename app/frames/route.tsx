import { frames } from "./frames";
import { Button } from "frames.js/next";
import axios from "axios";
import Header from "../components/Header";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const frameHandler = frames(async (ctx: any) => {
  // User has clicked on a button to vote
  if (ctx.request.method === "POST") {
    // Check if the frame is valid
    if (!ctx.message || !ctx.message.isValid) {
      return {
        image: "Error: Invalid Frame",
        buttons: [],
      };
    }

    // Grab the user ID
    const userId = ctx.message.requesterCustodyAddress;

    // Grab the vote option
    const voteOption = ctx.message.buttonIndex === 1 ? "Yes" : "No";

    // Record the vote
    try {
      await axios.post(`${API_BASE_URL}/api/votes`, {
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
        const userVote = error.response.data.vote;
        return {
          status: 200,
          image: (
            <div tw="bg-blue-600 text-white w-full h-full flex flex-col justify-start items-start p-12 font-roboto">
              <Header />
              <div tw="flex-grow"></div>
              <p tw="text-3xl mb-4">You already voted:</p>
              <div tw="flex bg-white text-blue-600 w-full rounded-lg shadow-lg justify-center items-center">
                <h2 tw="text-4xl font-bold text-center px-8">
                  <span
                    style={{
                      color: userVote === "Yes" ? "green" : "red",
                    }}
                  >
                    {userVote}
                  </span>
                </h2>
              </div>
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
        image: "Error: Internal Server Error",
        buttons: [],
      };
    }

    // Update frame to show the user's vote
    return {
      status: 200,
      image: (
        <div tw="flex flex-col text-white bg-blue-600 w-full h-full justify-start items-start p-12">
          <Header />
          <div tw="flex flex-grow"></div>
          <p tw="text-3xl mb-4">You voted:</p>
          <div tw="flex bg-white text-blue-600 w-full rounded-lg shadow-lg justify-center items-center">
            <h2
              tw="text-4xl font-bold px-8"
              style={{
                color: voteOption === "Yes" ? "green" : "red",
              }}
            >
              {voteOption}
            </h2>
          </div>
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
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        <div tw="flex flex-col text-white bg-blue-600 w-full h-full justify-start items-start p-12">
          <Header />
          <div tw="flex flex-grow"></div>
          <p tw="text-3xl mb-4">Make your prediction:</p>
          <div tw="flex bg-white w-full rounded-lg shadow-xl">
            <p tw="font-black text-blue-600 px-8">
              Will there be over 10,000 Kramer predictions before 6/29 midnight?
            </p>
          </div>
        </div>
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
