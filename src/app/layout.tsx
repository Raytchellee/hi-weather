"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

const Images = [
  "cloudy1.jpg",
  "cloudy2.jpg",
  "cloudy3.jpg",
  "cloudy4.jpg",
  "cloudy5.jpg",
  "day1.jpg",
  "day2.jpg",
  "day3.jpg",
  "day4.jpg",
  "day5.jpg",
  "night1.jpg",
  "night2.jpg",
  "night3.jpg",
  "night4.jpg",
  "night5.jpg",
  "rainy1.jpg",
  "rainy2.jpg",
  "rainy3.jpg",
  "rainy4.jpg",
  "rainy5.jpg",
];

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % Images.length);
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Hi Weather</title>
        <meta
          name="description"
          content="An app created for getting weather information"
        />
        <link rel="icon" href="./icons.png" />
      </head>
      <body
        className={inter.className}
        style={{
          backgroundImage: `url('/images/${Images[index]}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          overflow: "hidden",
          fontFamily: "monospace",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <RecoilRoot>{children}</RecoilRoot>
        <Toaster />
      </body>
    </html>
  );
}
