import { useState } from "react";



export default function CoursePage(){
    const [activeFilter, setActiveFilter] = useState("All courses");

    const filters = ["All courses", "Marketing", "Computer Science", "Psychology"];

    const courses = [
      {
        id: 1,
        category: "Marketing",
        title: "Creative Writing for Beginners",
        progress: 5,
        total: 20,
        bgColor: "bg-[#fccc42]",
        students: 3,
        bookmarked: true
      },
      {
        id: 2,
        category: "Computer Science",
        title: "Digital Illustration with Adobe Illustrator",
        progress: 12,
        total: 50,
        bgColor: "bg-[#be94f5]",
        students: 3,
        bookmarked: true
      },
      {
        id: 3,
        category: "Psychology",
        title: "Public Speaking and Leadership",
        progress: 18,
        total: 22,
        bgColor: "bg-blue-200",
        students: 3,
        bookmarked: false
      }
    ];

    const nextLessons = [
      {
        id: "01",
        title: "Introduction to Creative Writing",
        course: "Creative writing for beginners",
        teacher: {
          name: "Conner Garcia",
          avatar: "/img/usr/etudiant3.png"
        },
        duration: "22 min"
      },
      {
        id: "03",
        title: "Foundations of Public Speaking",
        course: "Public Speaking and Leadership",
        teacher: {
          name: "Saira Goodman",
          avatar: "/img/usr/etudiant1.png"
        },
        duration: "40 min"
      },
      {
        id: "05",
        title: "Getting to know the tool Adobe Illustrator",
        course: "Digital Illustration with Adobe Illustrator",
        teacher: {
          name: "Tony Ware",
          avatar: "/img/usr/etudiant11.png"
        },
        duration: "1h 08 min"
      },
      {
        id: "11",
        title: "Understanding audience psychology",
        course: "Public Speaking: Basic course",
        teacher: {
          name: "Mya Guzman",
          avatar: "/img/usr/etudiant10.png"
        },
        duration: "26 min"
      },
      {
        id: "04",
        title: "The importance of self reflection",
        course: "Psychology of influence",
        teacher: {
          name: "Zohaib Osborn",
          avatar: "/img/usr/etudiant4.png"
        },
        duration: "23 min"
      }
    ];

    const filteredCourses = activeFilter === "All courses"
      ? courses
      : courses.filter(course => course.category === activeFilter);
return(
    <>
     <div>
            <h2 className="text-2xl font-bold mb-4">My courses</h2>

            <div className="flex mb-6 gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-xl text-sm ${
                    activeFilter === filter
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-300 text-gray-700"
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  className={`${course.bgColor} rounded-2xl p-4 relative`}
                  style={{    border: "2px solid #151313" ,boxShadow: "2px 2px 0px #151313"}}
                >


                  <div className="inline-block px-3 py-1 bg-[#151513] text-white rounded-lg text-base mb-2">
                    {course.category}
                  </div>

                  <h3 className="font-bold text-lg mb-6">{course.title}</h3>

                  <div className="mb-2">
                    <div className="text-sm mb-1">Progress</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-black bg-opacity-10 rounded-full h-2">
                        <div
                          className="bg-black h-2 rounded-full"
                          style={{ width: `${(course.progress / course.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm">
                        {course.progress}/{course.total} lessons
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex">
                      {Array(course.students).fill(0).map((_, i) => (
                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-${course.bgColor} overflow-hidden ${i > 0 ? "-ml-2" : ""}`}>
                          <img
                            src={`/img/usr/etudiant9.png`}
                            alt="Student"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      <div className={`w-8 h-8 rounded-full bg-amber-500 border-2 border-${course.bgColor} -ml-2 flex items-center justify-center text-xs font-medium`}>
                        +{course.id * 10 + course.students * 4}
                      </div>
                    </div>

                    <button className="bg-[#ff5734] text-white px-4 py-2 rounded-lg text-sm" style={{    border: "2px solid #151313" ,boxShadow: "2px 2px 0px #151313"}}>
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Lessons */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">My next lessons</h2>
              <a href="#" className="text-[#ff5734] text-sm">View all lessons</a>
            </div>
              <div className="flex flex-row justify-between">
            <div className="bg-white border border-gray-200 rounded-3xl p-2">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-gray-500">
                    <th className="text-left font-normal py-2 px-4">Lesson</th>
                    <th className="text-left font-normal py-2 px-4">Teacher</th>
                    <th className="text-left font-normal py-2 px-4">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {nextLessons.map((lesson, index) => (
                    <tr key={lesson.id} className={index !== nextLessons.length - 1 ? "border-b border-gray-100" : ""}>
                      <td className="py-3 px-4">
                        <div className="font-medium">{lesson.id}. {lesson.title}</div>
                        <div className="text-sm text-gray-500">{lesson.course}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                              src={lesson.teacher.avatar}
                              alt={lesson.teacher.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span>{lesson.teacher.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{lesson.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          {/* Recommended Course */}
          <div className="bg-gray-900 rounded-3xl p-4 text-white ">
            <div className="text-lg mb-2">New course matching your interests</div>

            <div className="inline-block px-3 py-1 bg-amber-400 text-black rounded-full text-sm mb-2">
              Computer Science
            </div>

            <h3 className="font-bold text-xl mb-2">Microsoft Future Ready: Fundamentals of Big Data</h3>

            <div className="text-sm text-gray-400 mb-4">They are already studying</div>

            <div className="flex mb-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-gray-900 overflow-hidden ${i > 0 ? "-ml-2" : ""}`}>
                  <img
                    src={`/img/usr/etudiant10.png`}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-gray-900 -ml-2 flex items-center justify-center text-xs font-medium text-black">
                +100
              </div>
            </div>

            <button className="bg-[#ff5734] text-white px-4 py-2 rounded-lg text-sm" style={{    border: "2px solid #151313" ,boxShadow: "2px 2px 0px #151313"}}>
                      Continue
                    </button>
          </div>
          </div>
          </div>
    </>
)

}
