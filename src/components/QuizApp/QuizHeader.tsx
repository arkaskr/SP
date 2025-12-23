import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";

interface Session {
  user: {
    name: string;
    id: string;
  };
}

export default function QuizHeader({
  session,
  // time,
  currentStep,
  setCurrentStep,
  timeLeft,
  setTimeLeft,
}: {
  session: Session;
  // time: number;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  timeLeft: number;
  setTimeLeft: (time: number | ((prev: number) => number)) => void;
}) {
  // const [timer, setTimer] = useState(time);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timeUp, setTimeUp] = useState(false); // ✅ Prevents immediate setState

  useEffect(() => {
    if (currentStep === "quiz") {
      if (timeUp) {
        setCurrentStep("summary");
        return;
      }
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev: number) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(intervalRef.current!);
            setTimeUp(true);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentStep, setCurrentStep, setTimeLeft, timeUp]);

  // useEffect(() => {
  //   setTimer(time);
  // }, [time]);

  // ✅ Move state update outside the render cycle
  useEffect(() => {
    if (timeUp) {
      setCurrentStep("summary");
    }
  }, [setCurrentStep, timeUp]);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-b max-w-screen-2xl mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section: Logo and User Info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
            <Image
              src="/assets/images/logo.svg"
              alt="SynergiaTech Logo"
              width={32}
              height={32}
            />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-medium">{session?.user.name}</h3>
            <p className="text-xs text-blue-100">
              Student ID: {session?.user.id}
            </p>
          </div>
        </div>

        {/* Center Section: Company Name */}
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            SynergiaPrep
            <span className="text-blue-200 text-sm ml-2">
              Online Testing Platform
            </span>
          </h1>
        </div>

        {/* Right Section: Exam Info and Timer */}
        <div className="flex items-center space-x-6">
          <div className="hidden sm:block">
            <div className="text-sm space-y-0.5">
              <p className="text-blue-100">General Knowledge</p>
              <div className="flex items-center">
                <span className="text-blue-100">Time:</span>
                <span className="bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded ml-2 font-mono">
                  {String(Math.floor(timeLeft / 3600)).padStart(2, "0")}:
                  {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Exam Info */}
      <div className="sm:hidden mt-3 pt-3 border-t border-white/10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-blue-100">General Knowledge</span>
          <div className="flex items-center">
            <span className="text-blue-100">Time:</span>
            <span className="bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded ml-2 font-mono">
              {String(Math.floor(timeLeft / 3600)).padStart(2, "0")}:
              {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
