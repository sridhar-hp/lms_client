import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// --- 1. ICON COMPONENTS (Inline SVGs for professionalism without external libraries) ---
const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);
const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);
const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
);
const IdCardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884.896 1.676 2 2.12 1.104-.444 2-1.236 2-2.12"></path></svg>
);
const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);


// --- 2. UPDATED INPUT COMPONENT ---
const AuthInput = ({ type='text', placeholder, name, icon: Icon, value, onChange }) => (
  
  <div className="w-full mb-5 relative group">
    {/* Icon Container - Absolute positioned inside the input wrapper */}
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200">
      {Icon && <Icon />}
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete="current-password"
      // Added pl-10 (padding-left) to make room for the icon
      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm outline-none"
      required
    />
  </div>
);

// --- 3. LOGIN FORM (With Icons) ---
const LogInForm = ({ handlelogin, id, setId, pass, setPass }) => (

      
  <form className="w-full max-w-xs sm:max-w-sm text-center" onSubmit={handlelogin}>
    <h1 className="text-3xl font-extrabold mb-2 text-gray-800">Welcome Back</h1>
    <p className="text-gray-500 mb-8 text-sm">Enter your credentials to access your account.</p>
    

      
    <AuthInput 
    name="identifier"
     placeholder="ID"
      icon={UserIcon} 
     value={id}  
     onChange={e =>setId(e.target.value)}  />

    <AuthInput 
    name="password" 
    type="password" 
    placeholder="Password"
     icon={LockIcon}
      value={pass} 
      onChange={e=> setPass(e.target.value)}
      />

    <div className="text-right mb-6">
      <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold tracking-wide">FORGOT PASSWORD?</a>
    </div>

    <button
      type="submit"
      className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5"
    >
      LOG IN
    </button>
  </form>
);

// --- 4. PROFESSIONAL SIGN UP FORM (With Segmented Toggle) ---
const SignUpForm = () => {
  const [role, setRole] = useState('student');

  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const finalPayload = { ...data, role };
    alert(`Registered as: ${role.toUpperCase()}\nData: ${JSON.stringify(finalPayload)}`);
  };



  return (
    <form className="w-full max-w-xs sm:max-w-sm text-center" onSubmit={handleSignUp}>
      <h1 className="text-3xl font-extrabold mb-2 text-gray-800">Create Account</h1>
      <p className="text-gray-500 mb-6 text-sm">Join us and start your journey.</p>

      {/* --- PROFESSIONAL SEGMENTED TOGGLE CONTROL --- */}
      <div className="flex p-1 mb-6 bg-gray-100 rounded-xl relative shadow-inner">
        {/* Sliding Background Pill (Optional advanced CSS, but here we use conditional classes for simplicity) */}
        
        <button
          type="button"
          onClick={() => setRole('student')}
          className={`flex-1 flex items-center justify-center py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
            role === 'student'
              ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="mr-2"><UserIcon /></span>
          Student
        </button>
        
        <button
          type="button"
          onClick={() => setRole('staff')}
          className={`flex-1 flex items-center justify-center py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
            role === 'staff'
              ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="mr-2"><BriefcaseIcon /></span>
          Staff
        </button>
      </div>

      {/* --- INPUTS --- */}
      <AuthInput name="name" placeholder="Full Name" icon={UserIcon} />

      {/* Conditional Render with Animation Effect logic */}
      <div className="animate-fade-in-up"> 
        {role === 'student' ? (
          <AuthInput name="regNo" placeholder="Register Number" icon={IdCardIcon} />
        ) : (
          <AuthInput name="staffId" placeholder="Staff ID" icon={IdCardIcon} />
        )}
      </div>

      <AuthInput name="email" placeholder="Email Address" icon={MailIcon} />
      <AuthInput name="password" type="password" placeholder="Password" icon={LockIcon} />

      <button
        type="submit"
        className="w-full py-3 mt-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5"
      >
        SIGN UP
      </button>
    </form>
  );
};

// --- 5. MAIN LAYOUT (Refined Gradients & Shadows) ---
export default function LoginPage() {
  const [isLogInActive, setIsLogInActive] = useState(true);
  const [id,setId]= useState("");
const [pass,setPass]=useState("");
  const navigate = useNavigate();
  
  const swapToSignUp = () => setIsLogInActive(false);
  const swapToLogIn = () => setIsLogInActive(true);

  const handlelogin = async(e) => {
    e.preventDefault();
    try{
const res = await axios.post("http://localhost:5000/login",{id,pass})
if(res.data.success)
{
    navigate('/dashboard');

}
    }

    catch(err){
      console.log(err);
    }
  };

  const overlayTransform = isLogInActive ? 'translate-x-0' : 'translate-x-[-100%]';
  const contentTransform = isLogInActive ? 'translate-x-0' : '-translate-x-1/2';

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-sans"
      style={{
        // A cleaner, more subtle corporate gradient
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%)'
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl min-h-[640px] flex relative">

        {/* Log In Container */}
        <div className={`w-1/2 p-10 flex justify-center items-center absolute top-0 left-0 h-full transition-all duration-700 ease-in-out ${isLogInActive ? 'z-20 opacity-100 transform translate-x-0' : 'z-10 opacity-0 transform translate-x-10'}`}>
          <LogInForm 
  handlelogin={handlelogin}
  id={id}
  setId={setId}
  pass={pass}
  setPass={setPass}
/>

        </div>

        {/* Sign Up Container */}
        <div className={`w-1/2 p-10 flex justify-center items-center absolute top-0 right-0 h-full transition-all duration-700 ease-in-out ${!isLogInActive ? 'z-20 opacity-100 transform translate-x-0' : 'z-10 opacity-0 transform -translate-x-10'}`}>
          <SignUpForm />
        </div>

        {/* Overlay Panel */}
        <div className={`absolute top-0 right-0 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${overlayTransform}`}>
          <div className={`bg-gradient-to-br from-indigo-600 to-purple-700 text-white h-full flex transition-transform duration-700 ease-in-out w-[200%] ${contentTransform}`}>
            
            {/* Overlay Left */}
            <div className="w-1/2 flex flex-col justify-center items-center p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
              <p className="text-lg mb-8 opacity-90 font-light">Enter your personal details and start journey with us</p>
              <button
                className="bg-transparent border-2 border-white/80 text-white py-3 px-10 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-indigo-600 transition-all duration-300 shadow-lg backdrop-blur-sm"
                onClick={swapToSignUp}
              >
                Create Account
              </button>
            </div>

            {/* Overlay Right */}
            <div className="w-1/2 flex flex-col justify-center items-center p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-lg mb-8 opacity-90 font-light">To keep connected with us please login with your personal info</p>
              <button
                className="bg-transparent border-2 border-white/80 text-white py-3 px-10 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-indigo-600 transition-all duration-300 shadow-lg backdrop-blur-sm"
                onClick={swapToLogIn}
              >
                Sign In
              </button>
            </div>

          </div>
        </div>
        
        {/* Mobile Toggle (Visible only on small screens) */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex z-40 md:hidden bg-white/20 backdrop-blur-md p-1 rounded-full border border-white/30">
             <button onClick={swapToSignUp} className={`px-4 py-2 text-xs font-bold rounded-full transition ${!isLogInActive ? 'bg-white text-indigo-600 shadow' : 'text-indigo-800'}`}>Sign Up</button>
             <button onClick={swapToLogIn} className={`px-4 py-2 text-xs font-bold rounded-full transition ${isLogInActive ? 'bg-white text-indigo-600 shadow' : 'text-indigo-800'}`}>Sign In</button>
        </div>

      </div>
    </div>
  );
}


// // ----------------------------------- above desigen is waiting list -----------------------------------