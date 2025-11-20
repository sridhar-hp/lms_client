import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Reusable Input Component ---
const AuthInput = ({ type = 'text', placeholder }) => (
  <div className="w-full mb-6">
    <input
      type={type}
      placeholder={placeholder}
      // Added subtle background lift (bg-white/95) and rounded corners
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 text-gray-700 shadow-sm bg-white/95"
      required
    />
  </div>
);

// --- Form Components ---
const LogInForm = ({ handlelogin }) => (
  <form className="w-full max-w-sm text-center" onSubmit={handlelogin}>
    {/* (e) => e.preventDefault()  */}
    <h1 className="text-3xl font-extrabold mb-10 text-gray-900 tracking-tight">Welcome Back</h1>
    <AuthInput placeholder="Email or ID" />
    <AuthInput type="password" placeholder="Password" />

    <div className="text-right mb-6 -mt-3">
      <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 transition duration-200 font-medium">Forgot Password?</a>
    </div>

    <button
      type="submit"
      // Enhanced button style for professionalism
      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl hover:opacity-95 transition duration-300 transform hover:-translate-y-0.5"

    >
      LOG IN
    </button>
  </form>
);



const SignUpForm = () => (
  <form className="w-full max-w-sm text-center" onSubmit={(e) => e.preventDefault()}>
    {/*  */}
    <h1 className="text-3xl font-extrabold mb-10 text-gray-900 tracking-tight">Create Account</h1>
    <AuthInput placeholder="Name" />
    <AuthInput placeholder="Email" />
    <AuthInput type="password" placeholder="Password" />
    <button
      type="submit"
      // Enhanced button style for professionalism
      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl hover:opacity-95 transition duration-300 transform hover:-translate-y-0.5"
    >
      SIGN UP
    </button>
  </form>
);

// --- Main LoginPage Component (Symmetrical Sliding Overlay Logic) ---
export default function LoginPage({ }) {
  const [isLogInActive, setIsLogInActive] = useState(true);

  const swapToSignUp = () => setIsLogInActive(false);
  const swapToLogIn = () => setIsLogInActive(true);
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    navigate('/DMenuBar');
  };

  // 1. Controls the position of the 50% wide Colored Overlay Panel.
  const overlayTransform = isLogInActive ? 'translate-x-0' : 'translate-x-[-100%]';

  // 2. CONTROLS THE POSITION OF THE INTERNAL 200% CONTENT.
  const contentTransform = isLogInActive ? 'translate-x-0' : '-translate-x-1/2';

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-inter"
      style={{
        // *** PROFESSIONAL GRADIENT BACKGROUND ADDED HERE ***
        // Subtle, modern gradient from a warm, off-white to a cool, light-blue off-white.
        background: 'linear-gradient(to bottom right, #f7f8f9, #f2f6fa)'
      }}
    >
      <div
        // Increased shadow for a more premium, floating effect
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl min-h-[600px] flex relative"
      >

        {/* --- LEFT FORM CONTAINER (LOG IN) --- */}
        <div
          className={`w-1/2 p-12 flex justify-center items-center absolute top-0 left-0 h-full transition-opacity duration-700 ease-in-out ${isLogInActive ? 'z-20 opacity-100' : 'z-10 opacity-0'}`}
        >
          <LogInForm handlelogin={handlelogin} />
        </div>

        {/* --- RIGHT FORM CONTAINER (SIGN UP) --- */}
        <div
          className={`w-1/2 p-12 flex justify-center items-center absolute top-0 right-0 h-full transition-opacity duration-700 ease-in-out ${!isLogInActive ? 'z-20 opacity-100' : 'z-10 opacity-0'}`}
        >
          <SignUpForm />
        </div>

        {/* ----------------------------------------------------- */}
        {/* --- COLORED SLIDING OVERLAY PANEL (The Animation) --- */}
        {/* ----------------------------------------------------- */}
        <div
          // The sliding panel is fixed to the right side of the main box, then slides left.
          className={`absolute top-0 right-0 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${overlayTransform}`}
        >
          {/* Internal Content Wrapper (200% width, holds both info panels) */}
          <div
            // Made the overlay gradient richer and used class names from the buttons for consistency
            className={`bg-gradient-to-r from-indigo-700 to-purple-700 text-white h-full flex transition-transform duration-700 ease-in-out w-[200%] ${contentTransform}`}
          >
            {/* Overlay LEFT Content (Prompts to Sign Up) */}
            <div className="w-1/2 flex-shrink-0 flex flex-col justify-center items-center p-10 text-center">
              <h2 className="text-4xl font-extrabold mb-4">Hello, Friend!</h2>
              <p className="text-lg mb-10 opacity-90 leading-relaxed">Enter your details and join our community!</p>
              <button
                className="bg-transparent border-2 border-white text-white py-2.5 px-10 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-white hover:text-indigo-700 transition duration-300 shadow-xl"
                onClick={swapToSignUp}
              >
                Create Account
              </button>
            </div>

            {/* Overlay RIGHT Content (Prompts to Log In) */}
            <div className="w-1/2 flex-shrink-0 flex flex-col justify-center items-center p-10 text-center">
              <h2 className="text-4xl font-extrabold mb-4">Welcome Back!</h2>
              <p className="text-lg mb-10 opacity-90 leading-relaxed">Log in to keep connected and continue your work.</p>
              <button
                className="bg-transparent border-2 border-white text-white py-2.5 px-10 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-white hover:text-indigo-700 transition duration-300 shadow-xl"
                onClick={swapToLogIn}
              >
                Go to Log In
              </button>
            </div>
          </div>
        </div>

        {/* --- Fixed Bottom Buttons (Optional, for mobile/quick swap) --- */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex z-40 space-x-0.5 md:hidden">
          <button
            className={`px-6 py-2 rounded-l-lg font-semibold text-sm transition duration-300 shadow-lg 
                            ${!isLogInActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={swapToSignUp}
          >
            Sign Up
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg font-semibold text-sm transition duration-300 shadow-lg 
                            ${isLogInActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={swapToLogIn}
          >
            Log In
          </button>
        </div>

      </div>
    </div>
  );
}



// ----------------------------------- above desigen is waiting list -----------------------------------