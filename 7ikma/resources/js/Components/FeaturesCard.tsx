import { MessageSquare, Lightbulb, Gamepad } from "lucide-react";

export default function FeaturesCard() {
  return (
    <div className="bg-[#f7f7f5] p-4 w-full flex flex-row justify-center  ">
      <div className="border border-dashed  rounded-lg p-4 flex flex-col md:flex-row gap-4">
        {/* Quiz Card */}
        <div className="flex-1 bg-purple-300 rounded-lg p-6 relative overflow-hidden" style={{border:"1px solid #151513"}}>
          <div className="relative z-10">
            <div className="bg-purple-200 rounded-lg w-16 h-16 flex items-center justify-center mb-4 relative" style={{boxShadow: "3px 3px 0px #151313"}}>
              <MessageSquare className="text-gray-800 w-6 h-6" />
              <span className="absolute -top-1 -right-1 text-xl">×</span>
              <span className="absolute -bottom-1 -left-1 text-xl">×</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800">Fun</h2>
            <h3 className="text-3xl font-serif italic text-gray-800 mb-4">Quiz</h3>
            <p className="text-gray-800">
              Test your understanding with a short but fun quizzes!
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none">
            <div className="absolute right-0 top-0 bg-purple-400 rounded-full w-48 h-48 -mt-12 -mr-24 opacity-70"></div>
            <div className="absolute right-0 top-0 bg-purple-400 rounded-full w-40 h-40 -mt-8 -mr-20 opacity-60"></div>
            <div className="absolute right-0 top-0 bg-purple-400 rounded-full w-32 h-32 -mt-4 -mr-16 opacity-50"></div>
            <div className="absolute right-0 top-0 bg-purple-400 rounded-full w-24 h-24 mt-0 -mr-12 opacity-40"></div>
          </div>
        </div>

        {/* Creative Activities Card */}
        <div className="flex-1 bg-[#ff5734] rounded-lg p-6 relative overflow-hidden" style={{border:"1px solid #151513"}}>
          <div className="relative z-10">
            <div className="bg-red-200 rounded-lg w-16 h-16 flex items-center justify-center mb-4 relative" style={{boxShadow: "3px 3px 0px #151313"}}>
              <Lightbulb className="text-gray-800 w-6 h-6" />
              <span className="absolute -top-1 -right-1 text-xl">×</span>
              <span className="absolute -bottom-1 -left-1 text-xl">×</span>
            </div>
            <h2 className="text-4xl font-bold text-white">Creative</h2>
            <h3 className="text-3xl font-serif italic text-white mb-4">Activities</h3>
            <p className="text-white">
              Discover enjoyable activities such as coloring, crafting, and science.
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none">
            <div className="absolute right-0 top-0 bg-red-400 rounded-full w-48 h-48 -mt-12 -mr-24 opacity-70"></div>
            <div className="absolute right-0 top-0 bg-red-400 rounded-full w-40 h-40 -mt-8 -mr-20 opacity-60"></div>
            <div className="absolute right-0 top-0 bg-red-400 rounded-full w-32 h-32 -mt-4 -mr-16 opacity-50"></div>
            <div className="absolute right-0 top-0 bg-red-400 rounded-full w-24 h-24 mt-0 -mr-12 opacity-40"></div>
          </div>
        </div>

        {/* Learn with Games Card */}
        <div className="flex-1 bg-yellow-300 rounded-lg p-6 relative overflow-hidden" style={{border:"1px solid #151513"}}>
          <div className="relative z-10">
            <div className="bg-yellow-100 rounded-lg w-16 h-16 flex items-center justify-center mb-4 relative" style={{boxShadow: "3px 3px 0px #151313"}}>
              <Gamepad className="text-gray-800 w-6 h-6" />
              <span className="absolute -top-1 -right-1 text-xl">×</span>
              <span className="absolute -bottom-1 -left-1 text-xl">×</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800">Learn with</h2>
            <h3 className="text-3xl font-serif italic text-gray-800 mb-4">Games</h3>
            <p className="text-gray-800">
              Learn something new while your kids playing games!
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none">
            <div className="absolute right-0 top-0 flex flex-wrap">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white rounded-full m-1"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
