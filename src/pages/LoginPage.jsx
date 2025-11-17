// import React, { useState } from 'react';

// // --- Reusable Sub-Components (Forms) ---

// const AuthInput = ({ type = 'text', placeholder }) => (
//   <div className="w-full mb-6">
//     <input
//       type={type}
//       placeholder={placeholder}
//       className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-600 focus:border-indigo-600 transition duration-200 text-gray-700 shadow-sm"
//       required
//     />
//   </div>
// );

// const LogInForm = () => (
//   <form className="w-full max-w-sm text-center" onSubmit={(e) => e.preventDefault()}>
//     <h1 className="text-2xl font-semibold mb-10 text-gray-800">Log In</h1>
//     <AuthInput placeholder="Email or ID" />
//     <AuthInput type="password" placeholder="Password" />
//     <button
//       type="submit"
//       className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-300"
//     >
//       LOG IN
//     </button>
//   </form>
// );

// const SignUpForm = () => (
//   <form className="w-full max-w-sm text-center" onSubmit={(e) => e.preventDefault()}>
//     <h1 className="text-2xl font-semibold mb-10 text-gray-800">Create Account</h1>
//     <AuthInput placeholder="Name" />
//     <AuthInput placeholder="Email" />
//     <AuthInput type="password" placeholder="Password" />
//     <button
//       type="submit"
//       className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-300"
//     >
//       SIGN UP
//     </button>
//   </form>
// );

// // --- Main LoginPage Component (Symmetrical Sliding Overlay Logic) ---

// function LoginPage() {
//   // SET TO TRUE: Log In is active by default, matching your initial image (Log In form visible).
//   const [isLogInActive, setIsLogInActive] = useState(true);

//   const swapToSignUp = () => setIsLogInActive(false);
//   const swapToLogIn = () => setIsLogInActive(true);

//   // 1. Controls the position of the 50% wide Colored Overlay Panel.
//   //    Log In Active (true): Overlay stays on the Right (translate-x-0).
//   //    Sign Up Active (false): Overlay slides LEFT (translate-x-[-100%]) to cover the Log In Form.
//   const overlayTransform = isLogInActive ? 'translate-x-0' : 'translate-x-[-100%]';

//   // 2. Controls the position of the content *inside* the 200%-wide Overlay Panel.
//   //    This swaps the "Welcome Back" and "Hello, Friend!" messages.
//   const contentTransform = isLogInActive ? 'translate-x-0' : 'translate-x-full';

//   return (
//     <div 
//         className="min-h-screen flex items-center justify-center p-4" 
//         style={{
//             backgroundImage: "url('/path-to-your-custom-background.jpg')", // Placeholder
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundColor: '#e6f7ff' 
//         }}
//     >
//       <div 
//         className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl min-h-[550px] flex relative" 
//       >

//         {/* --- LEFT FORM CONTAINER (LOG IN) --- */}
//         {/* The opacity ensures the Sign Up form underneath is invisible when Log In is active. */}
//         <div 
//           className={`w-1/2 p-12 flex justify-center items-center absolute top-0 left-0 h-full transition-opacity duration-700 ease-in-out ${isLogInActive ? 'z-20 opacity-100' : 'z-10 opacity-0'}`}
//         >
//           <LogInForm />
//         </div>

//         {/* --- RIGHT FORM CONTAINER (SIGN UP) --- */}
//         <div 
//           className={`w-1/2 p-12 flex justify-center items-center absolute top-0 right-0 h-full transition-opacity duration-700 ease-in-out ${!isLogInActive ? 'z-20 opacity-100' : 'z-10 opacity-0'}`}
//         >
//           <SignUpForm />
//         </div>

//         {/* ----------------------------------------------------- */}
//         {/* --- COLORED SLIDING OVERLAY PANEL (The Animation) --- */}
//         {/* ----------------------------------------------------- */}
//         <div 
//           // The sliding panel is fixed to the right side of the main box, then slides left.
//           className={`absolute top-0 right-0 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${overlayTransform}`}
//         >
//           {/* Internal Content Wrapper (200% width, holds both info panels) */}
//           <div 
//             className={`bg-gradient-to-r from-[#5068F4] to-[#9253F6] text-white h-full flex transition-transform duration-700 ease-in-out w-[200%] ${contentTransform}`}
//           >
//             {/* Overlay LEFT Content (Prompts to Sign Up) */}
//             <div className="w-1/2 flex-shrink-0 flex flex-col justify-center items-center p-8 text-center">
//               <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
//               <p className="text-lg mb-8 opacity-90">New here? Enter your details and start your journey.</p>
//               <button
//                 className="bg-white border-none text-[#5068F4] py-2 px-8 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
//                 onClick={swapToSignUp}
//               >
//                 Create Account
//               </button>
//             </div>

//             {/* Overlay RIGHT Content (Prompts to Log In) */}
//             <div className="w-1/2 flex-shrink-0 flex flex-col justify-center items-center p-8 text-center">
//               <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
//               <p className="text-lg mb-8 opacity-90">Already have an account? Log in to continue.</p>
//               <button
//                 className="bg-white border-none text-[#5068F4] py-2 px-8 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
//                 onClick={swapToLogIn}
//               >
//                 Go to Log In
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- Fixed Bottom Buttons --- */}
//         <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex z-40 space-x-0.5">
//             <button 
//                 className={`px-6 py-2 rounded-l-lg font-semibold text-sm transition duration-300 shadow-lg 
//                            ${!isLogInActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//                 onClick={swapToSignUp}
//             >
//                 Sign Up
//             </button>
//             <button 
//                 className={`px-6 py-2 rounded-r-lg font-semibold text-sm transition duration-300 shadow-lg 
//                            ${isLogInActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//                 onClick={swapToLogIn}
//             >
//                 Log In
//             </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';

// Load Tailwind CSS script (required for single-file HTML/JS/CSS setup)
const AuthInput = ({ type = 'text', placeholder }) => (
  <div className="w-full mb-6">
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-600 focus:border-indigo-600 transition duration-200 text-gray-700 shadow-sm"
      required
    />
  </div>
);

const LogInForm = () => (
  <form className="w-full max-w-sm text-center" onSubmit={(e) => e.preventDefault()}>
    <h1 className="text-2xl font-semibold mb-10 text-gray-800">Log In</h1>
    <AuthInput placeholder="Email or ID" />
    <AuthInput type="password" placeholder="Password" />
    <button
      type="submit"
      className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-300"
    >
      LOG IN
    </button>
  </form>
);

const SignUpForm = () => (
  <form className="w-full max-w-sm text-center" onSubmit={(e) => e.preventDefault()}>
    <h1 className="text-2xl font-semibold mb-10 text-gray-800">Create Account</h1>
    <AuthInput placeholder="Name" />
    <AuthInput placeholder="Email" />
    <AuthInput type="password" placeholder="Password" />
    <button
      type="submit"
      className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-300"
    >
      SIGN UP
    </button>
  </form>
);

// --- Main LoginPage Component (Symmetrical Sliding Overlay Logic) ---

function LoginPage() {
  const [isLogInActive, setIsLogInActive] = useState(true);

  const swapToSignUp = () => setIsLogInActive(false);
  const swapToLogIn = () => setIsLogInActive(true);

  // 1. Controls the position of the 50% wide Colored Overlay Panel.
  const overlayTransform = isLogInActive ? 'translate-x-0' : 'translate-x-[-100%]';

  // 2. CONTROLS THE POSITION OF THE INTERNAL 200% CONTENT.
  // FIX: -translate-x-1/2 shifts the 200% wide content LEFT by 50% of its own width, 
  // which brings the "Welcome Back" panel into the 50% viewport.
  const contentTransform = isLogInActive ? 'translate-x-0' : '-translate-x-1/2'; 

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 font-inter" 
      style={{
          backgroundColor: '#e6f7ff' 
      }}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl min-h-[550px] flex relative" 
      >

        {/* --- LEFT FORM CONTAINER (LOG IN) --- */}
        <div 
          className={`w-1/2 p-12 flex justify-center items-center absolute top-0 left-0 h-full transition-opacity duration-700 ease-in-out ${isLogInActive ? 'z-20 opacity-100' : 'z-10 opacity-0'}`}
        >
          <LogInForm />
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
            className={`bg-gradient-to-r from-[#5068F4] to-[#9253F6] text-white h-full flex transition-transform duration-700 ease-in-out w-[200%] ${contentTransform}`}
          >
            {/* Overlay LEFT Content (Prompts to Sign Up) */}
            <div className="w-1/2 flex-shrink-0 flex flex-col justify-center items-center p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
              <p className="text-lg mb-8 opacity-90">New here? Enter your details and start your journey.</p>
              <button
                className="bg-white border-none text-[#5068F4] py-2 px-8 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
                onClick={swapToSignUp}
              >
                Create Account
              </button>
            </div>

            {/* Overlay RIGHT Content (Prompts to Log In) */}
            <div className="w-1/2 flex-shrink-0 flex flex-col justify-center items-center p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-lg mb-8 opacity-90">Already have an account? Log in to continue.</p>
              <button
                className="bg-white border-none text-[#5068F4] py-2 px-8 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
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

export default LoginPage;