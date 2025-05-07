import { IconArrowAutofitDownFilled, IconArrowAutofitUpFilled, IconArrowBigDownFilled, IconArrowBigUp, IconArrowBigUpFilled, IconCircleArrowDown, IconCircleArrowUp } from '@tabler/icons-react';
import React from 'react';

interface User {
  rank: number;
  avatar: string;
  name: string;
  score: number;
  trend?: 'up' | 'down';
}

interface LeaderboardProps {
  users: User[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  return (
    <div className="leaderboard absolute right-0 top-0">
      <div  style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}} className="leaderboard-header flex flex-row gap-6 overflow-hidden justify-center relative">

        <div className='w-1/4 h-2/3  mt-36 rounded-3xl rank-2 p-6' style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}> #2              <img className="avatar absolute -mt-32 left-12" src={users[1].avatar} alt={`${users[1].name}'s avatar`} />
        <div className="user-name absolute -mt-20 left-4">{users[1].name}</div></div>
        <div className='w-1/4 h-4/5 mt-24 rounded-3xl rank-1 p-6' style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}>#1  <img className="avatar absolute -mt-32 left-42" src={users[0].avatar} alt={`${users[0].name}'s avatar`} /> <div className="user-name absolute -mt-20 left-36">{users[0].name}</div></div>
        <div className='w-1/4 h-4/5 mt-44 rounded-3xl rank-3 p-6' style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}>#3   <img className="avatar absolute -mt-32 right-12" src={users[2].avatar} alt={`${users[2].name}'s avatar`} /><div className="user-name absolute -mt-20 right-4">{users[2].name}</div></div>
      </div>
      <div className="leaderboard-list"  style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}>
        {users.map((user) => (
            user.rank > 3 && (
                <div
                key={`${user.rank}-${user.name}`}
                className={`leaderboard-entry ${user.rank <= 3 ? `rank-${user.rank}` : 'default'}`}
                style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}>
                <div className="left-section">
                  <div className={`rank-badge border-0 ${user.rank <= 3 ? `rank-${user.rank}` : 'default'}`}>
                    #{user.rank}
                  </div>
                  <img className="avatar" src={user.avatar} alt={`${user.name}'s avatar`} />
                </div>
                <div className="user-name">{user.name}</div>
                <div className="right-section">
                  <div className="score-badge">
                    <div className="score-text">{user.score.toLocaleString()}xp</div>
                  </div>
                  {user.trend && (
                    <div className={`rank-indicator ${user.trend}`}>
                      {user.trend === 'up' ? <IconCircleArrowUp/> : <IconCircleArrowDown/>}
                    </div>
                  )}
                </div>
              </div>
            )

        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
