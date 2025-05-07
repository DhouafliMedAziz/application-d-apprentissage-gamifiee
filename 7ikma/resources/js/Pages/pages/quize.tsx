import { ChevronLeft, Grid2X2, Clock, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function MathQuiz() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [seconds, setSeconds] = useState(211);
  const colors = {
    darkBg: "#151513",
    accent: "#ff5734",
    yellow: "#fccc42",
    purple: "#be94f5",
    light: "#f7f7f5"
  };
  const elementStyle = {
    border: "2px solid #151513",
    boxShadow: "2px 2px 0px #151513"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds:any) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerClick = (answer:any) => {
    setSelectedAnswer(answer);
  };

  const toggleHint = () => {
    if (!showHint && hintsUsed < 3) {
      setHintsUsed(hintsUsed + 1);
    }
    setShowHint(!showHint);
  };

  return (
    <div className="flex items-center rounded-lg justify-center w-full " style={{ backgroundColor: colors.purple }}>
      <div
        className="w-full h-full flex flex-col relative rounded-xl"
        style={{
          backgroundColor: colors.purple,
          color: colors.darkBg
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: colors.light,
              ...elementStyle
            }}
          >
            <ChevronLeft size={20} color={colors.darkBg} />
          </button>
          <h1 className="text-xl font-bold" style={{ color: colors.darkBg }}>Math Quiz</h1>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: colors.light,
              ...elementStyle
            }}
          >
            <Grid2X2 size={20} color={colors.darkBg} />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-2">
          <div className="flex space-x-2">
            <div style={{ color: colors.darkBg }} className="font-medium">Q3 Question</div>
            <div style={{ color: colors.darkBg }} className="ml-auto font-medium">5 of 7</div>
          </div>
          <div className="flex space-x-1 mt-1">
            <div className="h-2 rounded-full flex-1" style={{ backgroundColor: colors.darkBg }}></div>
            <div className="h-2 rounded-full flex-1" style={{ backgroundColor: colors.darkBg }}></div>
            <div className="h-2 rounded-full flex-1" style={{ backgroundColor: colors.darkBg }}></div>
            <div className="h-2 rounded-full flex-1" style={{ backgroundColor: `${colors.darkBg}40` }}></div>
            <div className="h-2 rounded-full flex-1" style={{ backgroundColor: `${colors.darkBg}40` }}></div>
            <div className="h-2 rounded-full flex-1" style={{ backgroundColor: `${colors.darkBg}40` }}></div>
            <div className="h-2 rounded-full flex-1" style={{ backgroundColor: `${colors.darkBg}40` }}></div>
          </div>
        </div>

        {/* Timer - Now centered and justified */}
        <div className="flex justify-center mt-2">
          <div
            className="font-bold px-4 py-2 rounded-lg flex items-center text-center"
            style={{
              backgroundColor: colors.yellow,
              color: colors.darkBg,
              ...elementStyle
            }}
          >
            <Clock size={18} className="mr-2" />
            <span>{formatTime(seconds)}</span>
          </div>
        </div>

        {/* Hints Counter */}
        <div className="absolute top-24 right-6 flex items-center">
          <div
            className="px-3 py-1 rounded-lg flex items-center mt-8"
            style={{
              backgroundColor: colors.accent,
              color: colors.light,
              ...elementStyle
            }}
          >
            <span className="font-medium">Hints: {3 - hintsUsed}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-4 flex flex-col ">
          {/* Image */}
          <div className="mb-4 w-full items-center flex justify-center">
            <div
              className="w-52 h-52 rounded-lg flex items-center justify-center overflow-hidden"
              style={{
                backgroundColor: colors.light,
                ...elementStyle
              }}
            >
              <img src="./img/inner.png" alt="Quiz illustration" className="object-cover " />
            </div>
          </div>

          {/* Question */}
          <div className="mb-5">
            <h2 className="text-2xl font-bold" style={{ color: colors.darkBg }}>
              If Rani has 10 apples and gives 4 apples to her friend, how many apples are left?
            </h2>
          </div>

          {/* Hint Content Only */}
          <div className="mb-6">
            {showHint && (
              <div
                className="p-3 rounded-lg"
                style={{
                  backgroundColor: colors.light,
                  ...elementStyle
                }}
              >
                <p className="font-medium">To solve this problem, subtract the number of apples Rani gives away from her total.</p>
                <p className="mt-1 font-bold">10 - 4 = ?</p>
              </div>
            )}
          </div>

          {/* Answer options */}
          <div className="mt-auto mb-4">
            <p className="mb-4 font-medium" style={{ color: colors.darkBg }}>Choose your answer</p>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="py-3 rounded-lg font-medium"
                style={{
                  backgroundColor: selectedAnswer === 'A' ? colors.accent : colors.yellow,
                  color: selectedAnswer === 'A' ? colors.light : colors.darkBg,
                  ...elementStyle
                }}
                onClick={() => handleAnswerClick('A')}
              >
                A. 5 apples
              </button>

              <button
                className="py-3 rounded-lg font-medium"
                style={{
                  backgroundColor: selectedAnswer === 'B' ? colors.accent : colors.yellow,
                  color: selectedAnswer === 'B' ? colors.light : colors.darkBg,
                  ...elementStyle
                }}
                onClick={() => handleAnswerClick('B')}
              >
                B. 6 apples
              </button>

              <button
                className="py-3 rounded-lg font-medium"
                style={{
                  backgroundColor: selectedAnswer === 'C' ? colors.accent : colors.yellow,
                  color: selectedAnswer === 'C' ? colors.light : colors.darkBg,
                  ...elementStyle
                }}
                onClick={() => handleAnswerClick('C')}
              >
                C. 7 apples
              </button>

              <button
                className="py-3 rounded-lg font-medium"
                style={{
                  backgroundColor: selectedAnswer === 'D' ? colors.accent : colors.yellow,
                  color: selectedAnswer === 'D' ? colors.light : colors.darkBg,
                  ...elementStyle
                }}
                onClick={() => handleAnswerClick('D')}
              >
                D. 8 apples
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-between items-center">
          <button
            className="flex items-center text-sm px-3 py-1 rounded-lg"
            style={{
              color: colors.darkBg,
              backgroundColor: colors.light,
              ...elementStyle
            }}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <button
            onClick={toggleHint}
            disabled={hintsUsed >= 3 && !showHint}
            className="flex items-center justify-center w-10 h-10 rounded-lg"
            style={{
              backgroundColor: colors.yellow,
              color: colors.darkBg,
              ...elementStyle
            }}
          >
            <HelpCircle size={22} />
          </button>

          <button
            className="py-2 px-4 rounded-lg flex items-center font-medium"
            style={{
              backgroundColor: colors.light,
              color: colors.darkBg,
              ...elementStyle
            }}
          >
            <span>Next</span>
            <ChevronLeft size={16} className="transform rotate-180 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
