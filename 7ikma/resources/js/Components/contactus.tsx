import { useState } from 'react';
import { Instagram, Linkedin, MessageCircle, Github } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    industry: '',
    message: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
<>

      {/* Main Content */}
      <main className="flex-grow px-2 py-8" id='contact'>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Contact Info */}
            <div className="w-full md:w-1/2">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
              <p className="text-gray-600 mb-8">
                Tell us a little bit about who you are, and we'll tell you a
                whole lot more about who we are.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">Talk to our team today</h2>
              <ol className="list-decimal list-inside space-y-2 mb-8">
                <li className="text-gray-600">Understanding how our product may fulfill you need</li>
                <li className="text-gray-600">Discover the capabilities and get answer to your questions</li>
                <li className="text-gray-600">Get a customized quote</li>
              </ol>

              <h2 className="text-xl font-bold text-gray-800 mb-4">Find Wellnessty Group</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#ff5734] rounded-lg flex items-center justify-center text-[#000f1d]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-gray-600"> 05 Ave Taha Hussein, Tunis 1008</span>
                </div>

                <div className="flex items-center">
                <div className="w-8 h-8 bg-[#ff5734] rounded-lg flex items-center justify-center text-[#000f1d]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-gray-600">(216) 21 149 057</span>
                </div>

                <div className="flex items-center">
                <div className="w-8 h-8 bg-[#ff5734] rounded-lg flex items-center justify-center text-[#000f1d]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="ml-2 text-gray-600">learnify@example.com</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full md:w-1/2">
              <div className="bg-[#fccc42] p-6 rounded-xl shadow-md" style={{    border: "3px solid #151313" ,boxShadow: "3px 3px 0px #151313"}}>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row gap-4 mb-4" >
                    <div className="flex-1">
                      <label htmlFor="firstName" className="block text-[#000f1d] text-sm font-medium mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                      style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter Your Name"
                        className="w-full p-2 rounded border border-gray-200"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="lastName" className="block text-[#000f1d] text-sm font-medium mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}

                        placeholder="Enter Your Name"
                        className="w-full p-2 rounded border border-gray-200"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-[#000f1d] text-sm font-medium mb-1">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Your Email"
                      style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}

                      className="w-full p-2 rounded border border-gray-200"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="companyName" className="block text-[#000f1d] text-sm font-medium mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}

                      placeholder="Enter Your Company Name"
                      className="w-full p-2 rounded border border-gray-200"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>



                  <div className="mb-6">
                    <label htmlFor="message" className="block text-[#000f1d] text-sm font-medium mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                                          style={{    border: "1px solid #151313" ,boxShadow: "1px 1px 0px #151313"}}

                      id="message"
                      name="message"
                      placeholder="Enter Your Message"
                      rows={4}
                      className="w-full p-2 rounded border border-gray-200"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="flex justify-center">
                  <button className=" light-pixel-button px-4 py-2 rounded-md flex items-center bg-[#ff5734]" style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>send</button>

                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#f7f7f5] text-[#000f1d] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-800 text-sm font-semibold">L</span>
              </div>
              <span className="ml-2 font-bold">Learnify</span>
            </div>
            <p className="text-sm text-gray-400 text-center">
            This website includes a main information screen about the platform, curated course collections, descriptions of popular platform categories, and an eye-catching call-to-action.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-800 hover:text-[#000f1d]">Home</a>
              <a href="#" className="text-gray-800 hover:text-[#000f1d]">Features</a>
              <a href="#" className="text-gray-800 hover:text-[#000f1d]">Courses</a>
            </nav>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <a href="#" className="w-10 h-10 bg-[#f7f7f5] rounded-full flex items-center justify-center hover:bg-[#f0f0f0]">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-[#f7f7f5] rounded-full flex items-center justify-center hover:bg-[#f0f0f0]">
              <Linkedin size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-[#f7f7f5] rounded-full flex items-center justify-center hover:bg-[#f0f0f0]">
              <MessageCircle size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-[#f7f7f5] rounded-full flex items-center justify-center hover:bg-[#f0f0f0]">
              <Github size={20} />
            </a>
          </div>

          <div className="border-t border-[#000f1d] pt-8">
            <p className="text-sm text-gray-400 text-center">
              Copyright © 2025 "fari9 5aliha ala alah"
            </p>
          </div>
        </div>
      </footer>
</>  );
}
