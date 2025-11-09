"use client";
import React from "react";
import Button from "./_components/Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const [hasClick, setHasClick] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadedVideos, setLoadedVideos] = React.useState(0);

  const totalVideos = 3;

  const nextVideosRef = React.useRef<HTMLVideoElement>(null);

  const handleVideoLoaded = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideosIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setHasClick(true);
    setCurrentIndex(upcomingVideosIndex);
  };

  useGSAP(
    () => {
      if (hasClick) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            (nextVideosRef.current as HTMLVideoElement)?.play();
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  const getVideoSource = (index: number) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-50 transition-all duration-500 ease-in 
            hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideosRef}
                src={getVideoSource(upcomingVideosIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoaded}
              />
            </div>
          </div>

          <video
            ref={nextVideosRef}
            src={getVideoSource(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoaded}
          />
          <video
            src={getVideoSource(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoaded}
          />
        </div>

        <h1 className="special-font hero-leading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100 ">
              Redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br />
              Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-leading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
}
