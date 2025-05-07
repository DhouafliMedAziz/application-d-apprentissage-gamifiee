import { Award } from "lucide-react";

export default function AchievementCard({ achievementTitle, description, icon, level }:{
    achievementTitle:string;
    description:string;
    icon:string;
    level:string;
}) {
    const getBadgeColor = () => {
      switch(level.toLowerCase()) {
        case 'gold': return 'bg-yellow-100 text-yellow-600';
        case 'silver': return 'bg-gray-100 text-gray-600';
        case 'bronze': return 'bg-amber-100 text-amber-700';
        default: return 'bg-blue-100 text-blue-600';
      }
    };

    return (
      <div className="bg-white rounded-xl flex justify-center flex-col shadow p-6" style={{    border: "2px solid #151313" ,boxShadow: "2px 2px 0px #151313"}}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center text-gray-800">
            <Award size={18} className="mr-2 text-purple-500" />
            Achievement Unlocked
          </h3>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="bg-purple-100 p-4 rounded-full text-purple-500 mb-4">
            <img className="" src='./img/gold1.png'></img>
          </div>
          <h4 className="font-medium text-gray-800 mb-1">{achievementTitle}</h4>
          <p className="text-gray-500 text-sm mb-3">{description}</p>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${getBadgeColor()}`}>
            {level} Level
          </span>
        </div>
      </div>
    );
  }
