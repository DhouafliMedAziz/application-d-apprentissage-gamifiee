import { Star, Award, Trophy, PieChart, Play, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import AchievementCard from './AchivementsCard';
import DeadlinesCard from './deadlineCard';
import RecentActivityCard from './recentActivitiesCard';

export default function GamePlatform() {
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
    }
  };
  const [level, setLevel] = useState(7);
  const [performanceData, setPerformanceData] = useState([
    { category: 'Speed', score: 8 },
    { category: 'Accuracy', score: 6 },
    { category: 'Efficiency', score: 9 },
    { category: 'Creativity', score: 7 },
    { category: 'Communication', score: 8 }
  ]);

  const increaseLevel = () => {
    if (level < 10) setLevel(level + 1);
  };

  const decreaseLevel = () => {
    if (level > 1) setLevel(level - 1);
  };
  const levelPercentage = (level / 10) * 100;

  return (
    <div className=" m-0 rounded-xl max-w-7xl  font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mb-4 md:mb-0 flex gap-7 flex-col">
          <h1 className="text-2xl font-bold mb-2">Learn, Play and Earn Free Gifts!</h1>
          <p className="text-gray-600 mb-4 max-w-md">
            Challenge your friends in quiz games and increase rank points to get exclusive prizes from us
          </p>
          <div className="flex space-x-3">
          <button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center !text-[#131515] !bg-[white]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>View Rewards</button>

          <button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center " style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>Continue </button>

          </div>
          <h2 className="text-xl font-bold mb-4">Overview</h2>
          <div className="flex flex-row gap-4 w-full ">
          <DeadlinesCard
          deadlines={[
            { id: 1, title: "JavaScript Quiz", date: "May 3", course: "Web Dev" },
            { id: 2, title: "Final Project", date: "May 15", course: "UX Design" }
          ]}
        />

        {/* Achievement Card */}
        <AchievementCard
          achievementTitle="Lvl. 7"
          description="Geek Master"
          icon=""
          level="Gold"
        />
         <RecentActivityCard
          activities={[
            { id: 1, type: "completed", item: "CSS Grid Module", time: "2 hours ago" },
            { id: 2, type: "earned", item: "JavaScript Basics Badge", time: "Yesterday" },
            { id: 3, type: "started", item: "React Hooks Course", time: "2 days ago" }
          ]}
        />
    </div>
        </div>

        <div className="absolute -top-8 right-[25%] h-72 w-72">
            <img src='./img/inner.png' ></img>


        </div>
      </div>


    </div>
  );
}
