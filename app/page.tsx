import { fetchMetadata } from "frames.js/next";

export async function generateMetadata() {
  return {
    title: "Kramer Contest",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frames",
          process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000"
        )
      )),
    },
  };
}

export default function Page() {
  return <span>Kramer Contest</span>;
}
