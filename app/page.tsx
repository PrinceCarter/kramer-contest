import { fetchMetadata } from "frames.js/next";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export async function generateMetadata() {
  return {
    title: "Kramer Contest",
    other: {
      ...(await fetchMetadata(new URL("/frames", BASE_URL))),
    },
  };
}

export default function Page() {
  return <span>Kramer Contest</span>;
}
