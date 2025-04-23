"use client";
 
export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
 
 
  return (
    <div className=" flex flex-col gap-4">
    <h1>Certified Teacher</h1>
    <div className="flex flex-row">
    {items.map((item, idx) => (
        <div
          className="group relative -mr-4"
          key={item.name}
        >
          <img
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className="relative !m-0 h-20 w-20 rounded-full border-2 border-[#151513] object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
          />
        </div>
      ))}
 <div
          className="group relative -mr-4"
        >
          <div
          style={{fontSize:"2em",fontWeight:700}}
            className="relative flex text-[#151517]  text-center items-center  bg-[#fccc42] !m-0 h-20 w-20 rounded-full border-2 border-[#151513] object-cover object-top !p-2 transition duration-500 group-hover:z-30 group-hover:scale-105"
          ><span>135+</span></div>
        </div> 


    </div>
   </div>
  );
};