import { Calendar, Clock } from "lucide-react";

interface Deadline  {
    id:number;
    title:string;
    course:string;
    date:string;
}

export default function DeadlinesCard({ deadlines }:{
    deadlines :Deadline[]
}) {
    return (
      <div className="bg-white min-w-96 rounded-lg shadow p-6 flex flex-col" style={{    border: "2px solid #151313" ,boxShadow: "2px 2px 0px #151313"}}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center text-gray-800">
            <Clock size={18} className="mr-2 text-red-500" />
            Upcoming Deadlines
          </h3>
        </div>

        <div className="space-y-4">
          {deadlines.map(deadline => (
            <div key={deadline.id} className="flex items-start">
              <div className="bg-red-100 p-2 rounded text-red-500">
                <Calendar size={16} />
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-gray-800">{deadline.title}</h4>
                <div className="flex text-sm text-gray-500">
                  <span className="mr-3">{deadline.course}</span>
                  <span>Due: {deadline.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 text-[#ff5734] text-sm font-medium  transition">
          View All Deadlines
        </button>
      </div>
    );
  }
