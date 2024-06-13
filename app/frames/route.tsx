import { frames } from "./frames";
import { Button } from "frames.js/next";
import axios from "axios";
import Header from "../components/Header";
import MessageBox from "../components/MessageBox";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to render the message box with the given title and message
const renderMessage = (title: string, message: string, vote?: string) => {
  return {
    status: 200,
    image: (
      <div tw="flex flex-col text-white bg-blue-600 w-full h-full justify-start items-start p-12">
        <Header />
        <div tw="flex-grow"></div>
        <MessageBox title={title} message={message} vote={vote} />
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
};

// Function to handle the vote submission
const handleVote = async (userId: string, voteOption: string) => {
  try {
    // Send a POST request to the API to record the vote
    await axios.post(`${API_BASE_URL}/api/votes`, {
      userId,
      vote: voteOption,
    });
  } catch (error: any) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      // If the user has already voted, display their previous vote
      const userVote = error.response.data.vote;
      return renderMessage("You already voted:", "", userVote);
    }

    return {
      image: "Error: Internal Server Error",
      buttons: [],
    };
  }

  return renderMessage("You voted:", "", voteOption);
};

// Frame handler for the Kramer contest frame
const frameHandler = frames(async (ctx: any) => {
  // Check if the request is a POST request
  if (ctx.request.method === "POST") {
    if (!ctx.message || !ctx.message.isValid) {
      return {
        image: "Error: Invalid Frame",
        buttons: [],
      };
    }

    // Get the user ID
    const userId = ctx.message.requesterCustodyAddress;
    // Get the vote option from the button index
    const voteOption = ctx.message.buttonIndex === 1 ? "Yes" : "No";

    return handleVote(userId, voteOption);
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
          <div tw="flex-grow"></div>
          <MessageBox
            title="Make your prediction:"
            message="Will there be over 10,000 Kramer predictions before 6/29 midnight?"
          />
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
