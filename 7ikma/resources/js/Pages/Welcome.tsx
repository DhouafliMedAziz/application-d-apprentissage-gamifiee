import { AnimatedTooltip } from "@/Components/animated-tooltip";
import { Card, Carousel } from "@/Components/carousel";
import Rate from "@/Components/rate";
import { COLORS, STYLE } from "@/style/colors";



export default function Landing(){
  const DummyContent = () => {
    return (
      <>
        {[...new Array(3).fill(1)].map((_, index) => {
          return (
            <div
              key={"dummy-content" + index}
              className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
            >
              <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                  The first rule of Apple club is that you boast about Apple club.
                </span>{" "}
                Keep a journal, quickly jot down a grocery list, and take amazing
                class notes. Want to convert those notes to text? No problem.
                Langotiya jeetu ka mara hua yaar is ready to capture every
                thought.
              </p>
              <img
                src="https://assets.aceternity.com/macbook.png"
                alt="Macbook mockup from Aceternity UI"
                height="500"
                width="500"
                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
              />
            </div>
          );
        })}
      </>
    );
  };
  const data = [
    {
      category: "Artificial Intelligence",
      title: "You can do more with AI.",
      src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: <DummyContent />,
      rate:4.5
    },
    {
      category: "Productivity",
      title: "Enhance your productivity.",
      src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: <DummyContent />,
      rate:4.8

    },
    {
      category: "Product",
      title: "Launching the new Apple Vision Pro.",
      src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: <DummyContent />,
      rate:4.7
    },
   
    {
      category: "Product",
      title: "Maps for your iPhone 15 Pro Max.",
      src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: <DummyContent />,
      rate:3.9
    },
    {
      category: "iOS",
      title: "Photography just got better.",
      src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: <DummyContent />,
      rate:4.1
    },
    {
      category: "Hiring",
      title: "Hiring for a Staff Software Engineer",
      src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: <DummyContent />,
      rate:4.6
    },
  ];
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 6,
      name: "Dora",
      designation: "The Explorer",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];



  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));






  return(
    <div className="min-h-screen relative" style={{ backgroundColor:"#f7f7f5", fontFamily: 'dimis' ,color:COLORS.primary,fontSize:'14px',fontWeight:400,lineHeight:'20px'}}>  

      <header className="fixed  z-[100] w-full" style={{inset:`0% 0% auto`}}>
      <nav className="flex p-0  w-full m-auto h-[4.75em]" style={{translate: "none",
  rotate: "none",
  scale: "none",
  transform: "translate(0px, 0%)"}}>
        <div className="flex" style={{paddingLeft:STYLE.padding_page,transition:STYLE.animation_default,background:COLORS.light,flex:1,justifyContent:'flex-start',alignItems:'center'}}>

          <a className="w-[28.75rem] "  style={{textAlign:'center',fontFamily:'dimis',fontSize:'2.5em',color:COLORS.primary}}>
          BiblioPedia <span style={{ fontSize:'0.5em'}}>Griding knowledge</span>
          </a>
          <a className="nav-link size-56">
          <div className="nav-link__inner"> <div className="nav-link__text-wrap">
            <h1>home</h1>
            </div> 
          </div>
        </a>
        <a className="nav-link size-56">
          <div className="nav-link__inner"> <div className="nav-link__text-wrap">
            <h1>Services</h1>
            </div> 
          </div>
        </a>
        <a className="nav-link size-56">
          <div className="nav-link__inner"> <div className="nav-link__text-wrap">
            <h1>Courses</h1>
            </div> 
          </div>
        </a>
        <a className="nav-link size-56">
          <div className="nav-link__inner"> <div className="nav-link__text-wrap">
            <h1>Contact us</h1>
            </div> 
          </div>
        </a>
        <a className="nav-link size-44">
        <div className="nav-link__inner">
        <button className=" pixel-button px-4 py-2 rounded-md flex items-center " style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>Login <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-zap ml-1"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg></button>
        </div>
        </a>
        <a className="nav-link size-44">
        <div className="nav-link__inner">
        <button className=" light-pixel-button px-4 py-2 rounded-md flex items-center bg-[#ff5734]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>Sing up</button>
        </div>
        </a>

        </div>
        
        <div>

        </div>
       
      </nav>
      </header>
      <main className="w-full h-auto" style={{clipPath:'inset(0vh 0vw)',overflow:'overflow'}}>
          <section id="home">
            <div className="home-hero__col " style={{paddingLeft:'7em'}} >

            <div className=" mb-[2.25em]">
              <h1 className="home-hero__heading">
                <span style={{fontFamily:'dimis',fontWeight:700,letterSpacing: "-.06em",lineHeight: 1.1}}>Find the right</span>
                <br/>
               <span className="text-[#ff5734]">Course</span>  for you
              </h1>
              <h2 className="h-regular">              LEARN BY PLAYING
              </h2>
            </div>
            <div className=" mb-[2.25em] w-[40em]">
              <h2 className="h-regular">              See your personalised recommendations
              based on your interests and goals
              </h2>
            </div>
            <div className="w-[40em] mb-[3em] flex items-center gap-6 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
            <button className="pixel-button px-4 py-2 w-60 rounded-md flex items-center" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>JOIN THE QUEST <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-zap ml-1"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg></button>
            <a className="button">
              <div className="button-text">
                <div className="text-wrap">

                <span className="span-text-button">
                    view our courses
                </span>

                </div>
              </div>
              <div className="button-wrap ">
              <div className="button-icon">
              <svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 330 330" >
<path id="XMLID_27_" d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255  s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0  c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"/>
</svg>
              </div>


              </div>
            </a>
            </div>
              <div className="w-[50em] flex gap-3 items-center">
                  <div className="w-[20em]  flex gap-6 flex-col rounded-3xl bg-white p-4" style={{border:"1px solid #151513"}}>
                      <div className="rate-box text-white rounded-3xl bg-[#be94f5]">
                        Education
                      </div>
                      <h1 style={{fontSize:"1.5em"}}>
                        subjects
                      </h1>
                      <div className="h-[7em] p-6 m-4">
                      <h1 style={{fontSize:"6em",fontWeight:900}}>
                        +40
                      </h1>
                      </div>

                  </div>
                  <div className="w-[25em]  flex gap-6 flex-col rounded-3xl bg-[#be94f5] p-4" style={{border:"1px solid #151513"}}>
                      <div className="rate-box text-[#151513] rounded-3xl bg-[#fccc42]">
                        online
                      </div>
                      <h1 style={{fontSize:"1.5em"}}>
                        courses
                      </h1>
                      <div className="h-[7em] p-6 m-4">
                      <h1 style={{fontSize:"6em",fontWeight:900}}>
                        +120
                      </h1>
                      </div>

                  </div>
                  <div className="w-[30em]  flex gap-6 flex-col rounded-3xl bg-[#fccc42] p-4" style={{border:"1px solid #151513"}}>
                      <Rate></Rate>
                      <h1 style={{fontSize:"1.5em"}}>
                        learners Reviews
                      </h1>
                      <div className="h-[7em] p-6 m-4">
                      <h1 style={{fontSize:"6em",fontWeight:900}}>
                        +180k
                      </h1>
                      </div>

                  </div>
              </div>
              <img className=" absolute top-[30em] w-[35%] right-0 "  src="./img/hero.png"></img>
            </div>
            <div className=" absolute left-[25%] top-[20em] flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>

          </section>
            <section id="services">
            <div className=" mb-[2.25em] bg-[#fccc42]   flex flex-row rounded-3xl m-12 " >
              <div className=" p-12 flex-col gap-5 w-[70%]">
              <h1 className="home-hero__heading" style={{fontFamily:'dimis',fontSize:"7em",fontWeight:700,letterSpacing: "-.06em",lineHeight: 1.1}}>
                <span >Upgrade your  </span>
                
               <span className="text-white">Skills</span> <br/>   with   <span className="text-white">FREE</span> online courses
              </h1>
              <h2 className="h-regular w-[70%] mb-[2.25em]">             Ready to gain in-demand skills to kickstart your career? The Learnify Click Start program offers 20 FREE online courses to help you get your first experience in your chosen profession
              </h2>
              <button className="pixel-button px-4 py-2  rounded-md flex !text-center items-center !bg-[#131315]" style={{opacity: 1,fontSize:"1.5em", animation: "0.4s ease-out forwards scaleIn"}}>Start Now </button>

              </div>
            <div className="">
              <img className=" w-full" src="./img/puzzel.png"></img>
            </div>
            </div>
            </section>
            <section id="courses">
            <div className="home-hero__col " style={{paddingLeft:'7em'}} >

            <div className=" mb-[2.25em] flex flex-row w-full">
              <div className="w-[70%]">
              <h1 className="home-hero__heading p-12" style={{fontFamily:'dimis',fontWeight:700,fontSize:"6.5em",letterSpacing: "-.06em",lineHeight: 1.1}}>
                <span >Take your <span className="text-[#ff5734]">Knowledge</span></span>
                <br/>
                a degree furthur
              </h1>
              <h2 className="h-regular"> our Courses
              </h2>
              </div>
              <div>
              <div className="w-[25em]  flex gap-6 flex-col rounded-3xl p-4" style={{lineHeight:"1.5"}}>
                      <div className="rate-box text-[#131315] rounded-3xl bg-[#fccc42]">
                        our Cources
                      </div>
                      <h1 style={{fontSize:"1.5em"}}>
                        Make your education work with our playfull and flexible online courses from leading schools
                      </h1>
                  </div>
              </div>





            </div>
<div className="flex flex-row gap-8">

<button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center !bg-[#131315]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>New Courses (12) </button>
<button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center !text-[#131515] !bg-[white]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>Recommended (7) </button>
<button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center !text-[#131515] !bg-[white]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>Most Popular (10)</button>



</div>

            <Carousel items={
cards
}></Carousel>

</div>


            </section>
            <section id="subjects">
            <div className="home-hero__col " style={{paddingLeft:'7em'}} >

            <div className=" mb-[2.25em] flex flex-row w-full">
              <div className="w-[70%]">
              <h1 className="home-hero__heading p-12" style={{fontFamily:'dimis',fontWeight:700,fontSize:"6.5em",letterSpacing: "-.06em",lineHeight: 1.1}}>
                <span >Explore  </span>
                <br/>
                Top <span className="text-[#ff5734]">Subjects</span>
              </h1>
              </div>
              <div>
              <div className="w-[25em]  flex gap-6 flex-col rounded-3xl p-4" style={{lineHeight:"1.5"}}>
                      <div className="rate-box text-[#131315] rounded-3xl bg-[#fccc42]">
                        our Subjects
                      </div>
                      <h1 style={{fontSize:"1.5em"}}>
                        we have a largest selection of subjects to study with our online courses
                      </h1>
                  </div>
              </div>





            </div>
<div className="flex flex-row gap-8 overflow-x-scroll">

<button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center !bg-[#131315]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}> IT & computer Science </button>
<button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center !text-[#131515] !bg-[white]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>Copy writing and marketing </button>
<button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center !text-[#131515] !bg-[white]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>Design and branding</button>
<button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center !text-[#131515] !bg-[white]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>AI & Data Science</button>
<button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center !text-[#131515] !bg-[white]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>CI/CD & Testing</button>
<button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center !text-[#131515] !bg-[white]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>Mathematics</button>
<button className="pixel-button px-4 py-2 w-42  rounded-md flex !text-center items-center !text-[#131515] !bg-[white]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>Competitve Programming</button>



</div>

            <Carousel items={
cards
}></Carousel>

</div>


            </section>



      </main>




 
    
    
    
    
    
    </div>
  );
}