import { fetchMetadata } from "frames.js/next";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

console.log("BASE_URL:", BASE_URL);

export async function generateMetadata() {
  let url;
  try {
    url = new URL("/frames", BASE_URL);
  } catch (error) {
    console.error("Invalid BASE_URL:", BASE_URL);
    throw error;
  }

  return {
    title: "Kramer Contest",
    other: {
      ...(await fetchMetadata(url)),
    },
  };
}

export default function Page() {
  return <span>Kramer Contest</span>;
}
