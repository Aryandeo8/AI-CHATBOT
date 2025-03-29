import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

export const Logincard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Make isLogin a state variable
  const navigate = useNavigate();
  const location = useLocation();

  // Update isLogin based on the current URL
  React.useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/login') {
      setIsLogin(true);
    } else if (location.pathname === '/register') {
      setIsLogin(false);
    }
  }, [location]);
  const handleGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    // Handle server-side logic if needed
    navigate('/display');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submission with:', { email, password });

    if (isLogin) {
      axios.post('http://localhost:4000/api/user/login', { email, password })
        .then(result => {
          console.log(result.data);
          if (result.data.success) {
            console.log('Login successful');
            navigate('/display');
          } else {
            console.log('Login failed');
          }
        })
        .catch(err => {
          console.log('Error:', err);
        })
    } else {
      axios.post('http://localhost:4000/api/user/register', { email, password })
        .then(result => {
          console.log(result.data);
          if (result.data.success) {
            console.log('Registration successful');
            navigate('/display');
          } else {
            console.log('Registration failed');
          }
        })
        .catch(err => {
          console.log('Error:', err);
        })
    }
  };
  const handleError = (error) => {
    console.error(error);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 border-2 border-white/20 shadow-lg">

        {/* title */}
        <h2 className="text-3xl font-bold text-white mb-8 text-center">{isLogin ? 'Login' : 'Register'}</h2>
        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>

          {/* enter email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          {/* enter password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >{showPassword ? '👁️' : '🗨️'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>

          {/* Social Login */}
          <div className="flex items-center justify-center">
              
              {/*<button onClick={googleSignin} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 hover:border-white/30 transition-all">
              
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">G</span>
              </div>
              <span className="text-white text-sm"><a href="/auth/google">Continue with Google</a> </span>
            </button>*/}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleError}
            />
              
              
            
            {isLogin ? (
              <p className="ml-4 mb-4 text-sm text-gray-300 mt-4 text-center">
                No account? <Link to="/register" className="text-white hover:text-black">Register</Link>
              </p>
            ) : (
              <p className="text-sm text-gray-300 mt-4 text-center">
                Already have an account? <Link to="/" className="text-white hover:text-black">Login</Link>
              </p>
            )}
          </div>

        </form>
      </div>
    </div>
  )
}
