import React, { useState } from "react";
import { Head, Link, useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import { cn } from "@/lib/utils";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { COLORS, STYLE } from "@/style/colors";
import { Check, LogIn, User, UserCog } from "lucide-react";
import CountryChooser from "@/Components/countryselect";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('student');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showUserTypeToggle, setShowUserTypeToggle] = useState(false);

  const [focusedInput, setFocusedInput] = useState(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('login'), { onFinish: () => reset('password') });
  };
  const handleLoginToggle = (loginState:boolean) => {
    if (isLogin !== loginState) {
      setIsAnimating(true);

      if (loginState === false) {
        setTimeout(() => {
          setShowUserTypeToggle(true);
          setIsLogin(loginState);
          setIsAnimating(false);
        }, 300);
      } else {
        setShowUserTypeToggle(false);
        setTimeout(() => {
          setIsLogin(loginState);
          setIsAnimating(false);
        }, 300);
      }
    }
  };
  return (
    <>
     <div className="min-h-screen p-7 h-full relative" style={{ backgroundColor:"#f7f7f5", fontFamily: 'dimis' ,color:COLORS.primary,fontSize:'14px',fontWeight:400,lineHeight:'20px'}}>

          <header className="fixed  z-[100] w-full" style={{inset:`0% 0% auto`}}>
          <nav className="flex p-0  w-full m-auto h-[4.75em]" style={{translate: "none",
      rotate: "none",
      scale: "none",
      transform: "translate(0px, 0%)"}}>
            <div className="flex" style={{paddingLeft:STYLE.padding_page,transition:STYLE.animation_default,background:COLORS.light,flex:1,justifyContent:'flex-start',alignItems:'center'}}>

              <a className="w-[28.75rem] "  style={{textAlign:'center',fontFamily:'dimis',fontSize:'2.5em',color:COLORS.primary}}>

                  <span className=" font-bold">Learn<span className="text-[#ff5734]">ify</span></span> <span style={{ fontSize:'0.5em'}}>Griding knowledge</span>
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
          <main className="w-full h-[70em] flex justify-center items-center " style={{clipPath:'inset(0vh 0vw)',alignItems:'center'}}>
      <div className="w-full  flex justify-center flex-col  p-36 items-center">


      <h1 className="text-6xl font-bold mb-1 text-[#000f1d]">Welcome back!</h1>
          <p className="text-gray-600 text-lg mb-8">Get Ready for world full of playfull learning</p>
          <div className="flex flex-row items-center  w-2/3 rounded-xl shadow-md" style={{    border: "3px solid #151313" ,boxShadow: "3px 3px 0px #151313",overflow:'hidden'}}>

              <div className="bg-[#f7f7f5] h-[55em] p-6 w-1/2 ">
              <div className="flex mb-6 border border-gray-300 p-1 rounded-lg relative overflow-hidden">
        <div
          className={`absolute inset-y-1 transition-all duration-300 ease-in-out rounded-md  z-0 ${
            isLogin ? 'left-1 right-1/2 bg-black' : 'left-1/2 right-1 border'
          }`}
        />
        <button
          className={`flex-1 py-2 text-center rounded-md transition-all duration-200 z-10 flex items-center justify-center space-x-1 ${
            isLogin ? 'text-white font-medium' : 'text-gray-700'
          }`}
          onClick={() => handleLoginToggle(true)}
        >
          <LogIn className="w-4 h-4 mr-1" />
          <span>Login</span>
          {isLogin && <Check className="w-4 h-4 ml-1 animate-fadeIn" />}
        </button>
        <div className="flex-1 relative">
          {(!showUserTypeToggle || isLogin) && (
            <button
              className={`w-full py-2 text-center rounded-md transition-all duration-200 z-10 flex items-center justify-center space-x-1 ${
                !isLogin ? 'text-white font-medium animate-elevate' : 'text-gray-700'
              }`}
              onClick={() => handleLoginToggle(false)}
            >
              <span>Sign Up</span>
              {!isLogin && !showUserTypeToggle && <Check className="w-4 h-4 ml-1 animate-fadeIn" />}
            </button>
          )}

          {showUserTypeToggle && !isLogin && (
            <div className="absolute inset-0 animate-descend">
              <div className="flex w-full h-full">
                <button
                  className={`flex-1 py-2 text-center rounded-md transition-all duration-200 z-10 flex items-center justify-center ${
                    userType === 'student' ? 'text-white font-medium bg-black' : 'text-gray-700'
                  }`}
                  onClick={() => setUserType('student')}
                >
                  <User className="w-4 h-4 mr-1" />
                  <span className="text-xs">Student</span>
                  {userType === 'student' && <Check className="w-3 h-3 ml-1 animate-fadeIn" />}
                </button>
                <button
                  className={`flex-1 py-2 text-center rounded-md transition-all duration-200 z-10 flex items-center justify-center ${
                    userType === 'teacher' ? 'text-white font-medium bg-black' : 'text-gray-700'
                  }`}
                  onClick={() => setUserType('teacher')}
                >
                  <UserCog className="w-4 h-4 mr-1" />
                  <span className="text-xs">Teacher</span>
                  {userType === 'teacher' && <Check className="w-3 h-3 ml-1 animate-fadeIn" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
                <form onSubmit={submit}>
                  <div className="flex flex-col gap-4 justify-center    mt-12" >
             {!isLogin && (
 <div className="flex-1 animate-fadeIn animate-slideUp">
 <label htmlFor="name" className="block text-[#000f1d] text-sm font-medium mb-1">
   Username
 </label>
 <TextInput
 style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}
   type="text"
   id="name"
   name="name"
   //value={data.email}
   placeholder="Enter Your Username"
   className="w-full p-2 rounded border border-gray-200"
   isFocused={true}
  // onChange={(e) => setData('email', e.target.value)}
   required
 />
</div>
             )}
                    <div className="flex-1 animate-fadeIn animate-slideUp">
                      <label htmlFor="email" className="block text-[#000f1d] text-sm font-medium mb-1">
                        Email
                      </label>
                      <TextInput
                      style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        placeholder="Email"
                        className="w-full p-2 rounded border border-gray-200"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex-1 animate-fadeIn animate-slideUp">
                      <label htmlFor="passwd" className="block text-[#000f1d] text-sm font-medium mb-1">
                        Password
                      </label>
                      <TextInput
                        type="password"
                        id="passwd"
                        name="passwd"
                        style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}
                        value={data.password}
                        placeholder="*********"
                        className="w-full p-2 rounded border border-gray-200"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                                                required
                      />
                    </div>
                 {
                    isLogin && (  <div className="flex-1  flex animate-fadeIn">
                        <Checkbox
                    name="remember"
                    checked={data.remember}

                    onChange={(e:any) => setData('remember', e.target.checked)}
                  />
                  <span className="ms-2 text-sm text-[#000f1d] ">
                    Remember me
                  </span>
                  <div className="ms-2 flex items-center justify-end right-0">
                          {canResetPassword && (
                              <Link
                                  href={route('password.request')}
                                  className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                              >
                                  Forgot your password?
                              </Link>
                          )}
                          </div>
                          </div>)
                 }
                    {!isLogin && (
          <div className="animate-fadeIn animate-slideUp flex flex-col gap-4">
            {/* Confirm Password Field */}
            <div className="flex-1">
                      <label htmlFor="passwd" className="block text-[#000f1d] text-sm font-medium mb-1">
                        Confirme Password
                      </label>
                      <TextInput
                        type="password"
                        id="passwd"
                        name="passwd"
                        style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}
                        //value={data.password}
                        placeholder="********"
                        className="w-full p-2 rounded border border-gray-200"
                        autoComplete="current-password"
                        //onChange={(e) => setData('password', e.target.value)}
                                                required
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="inst" className="block text-[#000f1d] text-sm font-medium mb-1">
                      Institute
                      </label>
                      <TextInput
                        type="Text"
                        id="inst"
                        name="institut_education"
                        style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}
                       // value={data.password}
                        placeholder="Enter Your Institute"
                        className="w-full p-2 rounded border border-gray-200"
                        autoComplete="current-password"
                        //onChange={(e) => setData('password', e.target.value)}
                                                required
                      />
                    </div>
                    <div className="flex-1">
                        <CountryChooser></CountryChooser>
                        </div>
            {/* Student-specific fields */}
            {userType === 'student' && (
                <>

<div className="flex-1 animate-fadeIn animate-slideUp">
                      <label htmlFor="grade" className="block text-[#000f1d] text-sm font-medium mb-1">
                      Grade
                      </label>
                      <TextInput
                        type="text"
                        id="grade"
                        name="grade"
                        style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}
                       // value={data.password}
                        placeholder="Enter your Grade"
                        className="w-full p-2 rounded border border-gray-200"
                        autoComplete="current-password"
                       // onChange={(e) => setData('password', e.target.value)}
                                                required
                      />
                    </div>
                </>
            )}


</div>
        )}

                  </div>



                    <InputError message={errors.password} className="mt-2" />

                  <div className="flex  mt-12 items-center justify-center">
                  <button  disabled={processing} className="transform transition-all duration-300 light-pixel-button px-4 py-2 rounded-md flex justify-center !text-white !bg-[#ff5734] w-1/2 !text-center" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn" ,}}><p>{isLogin ? "Login":"Sign Up"}</p></button>

                  </div>
                </form>
              </div>
              <div className="bg-[#ffe7df] h-[55em] p-0 w-1/2 flex items-center overflow-hidden"  >
              <img className="relative -left-1/2 block max-w-none"src="./img/login-boy.webp" />
              </div>
              </div>

            </div>

            </main>
            </div>
    </>
  );
}

