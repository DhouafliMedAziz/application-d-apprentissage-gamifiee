import GamePlatform from "@/Components/gamesection";
import { Brain, Check, ChevronRight, Clock, Star, Users, X } from "lucide-react";
import Leaderboard from "./leaderboard";

export default function DashboardPage(){
    const users = [
        { rank: 1, avatar: './img/usr/etudiant1.png', name: 'Brody Bellson', score: 65322 },
        { rank: 2, avatar: './img/usr/etudiant2.png', name: 'Jack Nicklison', score: 48105 },
        { rank: 3, avatar: './img/usr/etudiant3.png', name: 'Timothy Bell', score: 21780 },
        { rank: 4, avatar: './img/usr/etudiant4.png', name: 'Brody Bennet', score: 19231, trend: 'up' },
        { rank: 5, avatar: './img/usr/etudiant5.png', name: 'Brody Bennet', score: 15322, trend: 'down' },
        { rank: 6, avatar: './img/usr/etudiant6.png', name: 'Brody Bennet', score: 15101, trend: 'up' },
        { rank: 6, avatar: './img/usr/etudiant7.png', name: 'Brody Bennet', score: 13899, trend: 'down' },
        { rank: 7, avatar: './img/usr/etudiant8.png', name: 'Brody Bennet', score: 12466, trend: 'down' },
        { rank: 8, avatar: './img/usr/etudiant9.png', name: 'Brody Bennet', score: 12466, trend: 'down' },


      ];
      const userData = {
        name: 'M. Rafli Atmaka',
        level: 5,
        xp: 4550,
        xpToNextLevel: 7000,
        badges: 112,
        rank: 'MASTER',
        rankPoints: 8997,
        performance: {
          teamwork: 70,
          creative: 85,
          solving: 80,
          curiosity: 90,
          discipline: 60
        },
        quizHistory: [
          {
            id: 1,
            title: 'Science Challenge',
            topic: 'Biology',
            date: '2 hours ago',
            score: 850,
            correct: 9,
            total: 10,
            opponents: 3,
            result: 'win',
            xpGained: 120
          },
          {
            id: 2,
            title: 'History Trivia',
            topic: 'World Wars',
            date: 'Yesterday',
            score: 720,
            correct: 8,
            total: 10,
            opponents: 5,
            result: 'win',
            xpGained: 110
          },
          {
            id: 3,
            title: 'Math Masters',
            topic: 'Algebra',
            date: '3 days ago',
            score: 650,
            correct: 6,
            total: 10,
            opponents: 4,
            result: 'lose',
            xpGained: 65
          }
        ]
      };

    return(<>

    <GamePlatform></GamePlatform>
             <div className="w-full flex gap-3 items-center mb-4">
                <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Recent Quiz Matches</h2>
                  <button className="text-[#ff5734] flex items-center text-sm font-medium ">
                    View All <ChevronRight size={16} />
                  </button>
                </div>

                <div className=" bg-white rounded-xl w-3/2 shadow-sm overflow-hidden flex flex-row " style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}>
                  {userData.quizHistory.map((quiz, index) => (
                    <div key={quiz.id} className={`p-4 ${index !== userData.quizHistory.length ? 'border-l-2 ' : ''}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-start">
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                            quiz.topic === 'Biology' ? 'bg-green-100' :
                            quiz.topic === 'World Wars' ? 'bg-blue-100' : 'bg-purple-100'
                          }`}>
                            <Brain size={24} className={`${
                              quiz.topic === 'Biology' ? 'text-green-500' :
                              quiz.topic === 'World Wars' ? 'text-blue-500' : 'text-purple-500'
                            }`} />
                          </div>

                          <div className="ml-3">
                            <h3 className="font-medium">{quiz.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="mr-2">{quiz.topic}</span>
                              <div className="h-1 w-1 rounded-full bg-gray-300 mr-2"></div>
                              <Clock size={12} className="mr-1" />
                              <span>{quiz.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          <div className={`flex items-center ${
                            quiz.result === 'win' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            <span className="font-bold text-lg mr-1">{quiz.score}</span>
                            {quiz.result === 'win' ?
                              <Check size={16} className="bg-green-100 rounded-full p-0.5" /> :
                              <X size={16} className="bg-red-100 rounded-full p-0.5" />
                            }
                          </div>

                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span className="mr-1">{quiz.correct}/{quiz.total}</span>
                            <div className="h-1 w-1 rounded-full bg-gray-300 mr-1"></div>
                            <Users size={12} className="mr-1" />
                            <span>{quiz.opponents}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-gray-50 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-5 w-5 rounded-full bg-yellow-400 flex items-center justify-center">
                            <Star size={12} className="text-white" />
                          </div>
                          <span className="ml-1 text-sm text-gray-600">+{quiz.xpGained} XP</span>
                        </div>

                        <button className="text-xs text-[#ff5734] font-medium hover:underline">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div></div>
                </div>
               <Leaderboard users={users}></Leaderboard>
    </>)
}
