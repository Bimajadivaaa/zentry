"use client";
import Image from "next/image";
import React from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import Link from "next/link";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

export default function Navbar() {
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = React.useState(false);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [isNavVisible, setIsNavVisible] = React.useState(true);

  const navContainerRef = React.useRef<HTMLDivElement>(null);
  const audioElementRef = React.useRef<HTMLAudioElement>(null);

  const { y: currentScrollY } = useWindowScroll();

  React.useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      (navContainerRef.current as HTMLDivElement)?.classList.remove(
        "floating-nav"
      );
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      (navContainerRef.current as HTMLDivElement)?.classList.add(
        "floating-nav"
      );
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      (navContainerRef.current as HTMLDivElement)?.classList.add(
        "floating-nav"
      );
    }
  }, [currentScrollY, lastScrollY]);

  React.useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  React.useEffect(() => {
    if (isAudioPlaying) {
      (audioElementRef.current as HTMLAudioElement)?.play();
    } else {
      (audioElementRef.current as HTMLAudioElement)?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Image
              src="/img/logo.png"
              alt="logo"
              width={100}
              height={0}
              className="w-10"
            />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />

            <div className="flex h-full items-center right-1 absolute mr-4">
              <div className="hidden md:block">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <button
                className="ml-10 flex items-center space-x-0.5 cursor-pointer"
                onClick={toggleAudioIndicator}
              >
                <audio
                  ref={audioElementRef}
                  src="/audio/loop.mp3"
                  loop
                  className=""
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`indicator-line ${
                      isIndicatorActive ? "active" : ""
                    }`}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
