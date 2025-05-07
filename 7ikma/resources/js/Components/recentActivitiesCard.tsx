import { Activity, Award, BookOpen, CheckCircle } from "lucide-react";



interface Activity{
    id:number;
    type:string;
    item:string;
    time:string;

}

export default function RecentActivityCard({ activities }:{activities:Activity[]}) {
    const getActivityIcon = (type:string) => {
      switch(type) {
        case 'completed': return <CheckCircle size={16} className="text-green-500" />;
        case 'earned': return <Award size={16} className="text-purple-500" />;
        case 'started': return <BookOpen size={16} className="text-blue-500" />;
        default: return <Activity size={16} className="text-gray-500" />;
      }
    };

    return (
      <div className="bg-white rounded-lg shadow p-6" style={{    border: "2px solid #151313" ,boxShadow: "2px 2px 0px #151313"}}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center text-gray-800">
            <Activity size={18} className="mr-2 text-[#be94f5]" />
            Recent Activity
          </h3>
        </div>

        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-start">
              <div className="bg-gray-100 p-2 rounded">
                {getActivityIcon(activity.type)}
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-gray-800">
                  {activity.type === 'completed' && 'Completed'}
                  {activity.type === 'earned' && 'Earned'}
                  {activity.type === 'started' && 'Started'} {activity.item}
                </h4>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 text-[#ff5734] text-sm font-medium  transition">
          View All Activity
        </button>
      </div>
    );
  }
