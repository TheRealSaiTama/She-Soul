import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Import auth from your Firebase config
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,      // Import GoogleAuthProvider
  signInWithPopup          // Import signInWithPopup
} from 'firebase/auth';
import { toast } from "sonner"; // Import toast from sonner

// Placeholder for a 3D-ish lightning bolt icon (SVG or component)
const LightningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-orange-500">
    <path fillRule="evenodd" d="M14.615 1.585a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.14z" clipRule="evenodd" />
  </svg>
);


const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg"><path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/><path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/><path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/><path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/></svg>
);

const AuthPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // For signup
  const [confirmPassword, setConfirmPassword] = useState(''); // For signup
  const navigate = useNavigate();

  const backgroundImageUrl = '/loginpage.jpg'; 
  const gridPatternUrl = "url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h20v20H0V0zM1%201v18h18V1H1z%22%20fill%3D%22%23e5e7eb%22%20fill-opacity%3D%220.1%22%20stroke%3D%22%23d1d5db%22%20stroke-width%3D%220.2%22%2F%3E%3C%2Fsvg%3E')";

  const toggleMode = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsLoginMode(!isLoginMode);
    setEmail('');
    setPassword('');
    setFullName('');
    setConfirmPassword('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoginMode) { // Sign Up Mode
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.", { duration: 7000 });
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Optionally update profile with fullName here if needed, though not directly supported by createUserWithEmailAndPassword
        // For example: await updateProfile(userCredential.user, { displayName: fullName });
        console.log("User signed up:", userCredential.user);
        toast.success("Sign up successful! Please log in.", { duration: 5000 });
        setIsLoginMode(true); // Switch to login mode after successful signup
        // Clear form fields
        setEmail('');
        setPassword('');
        setFullName('');
        setConfirmPassword('');
        // navigate('/'); // Or to a dashboard page
      } catch (err: any) {
        toast.error(err.message || "Sign up failed. Please try again.", { duration: 7000 });
        console.error("Sign up error:", err);
      }
    } else { // Login Mode
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        toast.success("Login successful!", { duration: 5000 });
        navigate('/select-dob'); // Navigate to /select-dob after login
      } catch (err: any) {
        toast.error(err.message || "Login failed. Please check your credentials.", { duration: 7000 });
        console.error("Login error:", err);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in with Google:", result.user);
      toast.success("Google Sign-in successful!", { duration: 5000 });
      navigate('/select-dob'); // Navigate to /select-dob after Google sign-in
    } catch (err: any) {
      console.error("Google Sign-in error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        toast.info('Google Sign-in popup was closed before completing.', { duration: 7000 });
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        toast.error('An account already exists with this email using a different sign-in method.', { duration: 7000 });
      } else {
        toast.error(err.message || 'Could not sign in with Google. Please try again.', { duration: 7000 });
      }
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Side - Background Image */}
      <div 
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="h-full flex flex-col justify-end p-8">
            <p className="text-xs text-white/70">&copy; She&Soul</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div 
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 bg-gray-50 relative"
        style={{ backgroundImage: gridPatternUrl }}
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-block mb-4 p-2 bg-orange-100 rounded-lg">
                <LightningIcon />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isLoginMode ? 'Log in to your account' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLoginMode ? 'Welcome back! Please enter your details.' : 'Let\'s get you started with a new account!'}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName} // Bind value to state
                    onChange={(e) => setFullName(e.target.value)} // Update state on change
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete={isLoginMode ? "email" : "off"} // "off" for new email in signup
                  required
                  value={email} // Bind value to state
                  onChange={(e) => setEmail(e.target.value)} // Update state on change
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLoginMode ? "current-password" : "new-password"}
                  required
                  value={password} // Bind value to state
                  onChange={(e) => setPassword(e.target.value)} // Update state on change
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="********"
                />
              </div>
            </div>

            {isLoginMode && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember for 30 days
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                    Forgot password
                  </a>
                </div>
              </div>
            )}

            {!isLoginMode && (
                 <div>
                 <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                   Confirm Password
                 </label>
                 <div className="mt-1">
                   <input
                     id="confirm-password"
                     name="confirm-password"
                     type="password"
                     autoComplete="new-password"
                     required
                     value={confirmPassword} // Bind value to state
                     onChange={(e) => setConfirmPassword(e.target.value)} // Update state on change
                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                     placeholder="Confirm your password"
                   />
                 </div>
               </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-shesoul-sunflower to-shesoul-bubblegum hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-shesoul-pastel transition-opacity duration-150"
              >
                {isLoginMode ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <GoogleIcon />
              Sign in with Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            {isLoginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
            <a href="#" onClick={toggleMode} className="font-medium">
              <span className="bg-gradient-to-r from-shesoul-sunflower to-shesoul-bubblegum bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-150">
                {isLoginMode ? 'Sign up' : 'Log in'}
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 