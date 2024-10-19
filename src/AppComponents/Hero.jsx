import React from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const subtitle = "A new and innovative way to manage and create your boards";
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/signup");
  };
  return (
    <>
      <BackgroundBeamsWithCollision>
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          Welcome to{" "}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">BoardWise</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">BoardWise</span>
            </div>
          </div>
          <TextGenerateEffect
            words={subtitle}
            className="text-center text-black dark:text-white text-lg md:text-2xl font-semibold"
          />
        </h2>
      </BackgroundBeamsWithCollision>
      <div className="flex justify-center text-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          onClick={handleGetStarted}
        >
          <span>Get Started</span>
          <MdArrowOutward />
        </HoverBorderGradient>
      </div>
    </>
  );
};

export default Hero;
