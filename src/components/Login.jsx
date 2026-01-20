import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authorizedUsers } from '../../data'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showErrorBox, setShowErrorBox] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
   const cred = await signInWithEmailAndPassword(auth, email, password)
      const userEmail = cred.user.email

      // 2️⃣ Check if this email is authorized in your app
      const user = authorizedUsers.find(u => u.email === userEmail)

      if (!user) {
        setError('Invalid email or password')
        setShowErrorBox(true)
        return
      }
      
      console.log('Login successful!')
      console.log('Cluster ID:', user.clusterID)
      
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        clusterID: user.clusterID
      }))
      
      setEmail('')
      setPassword('')
      router.push(`/DataTable/${user.clusterID}`);

      
            
    } catch (error) {
      console.error(err)

      let message = "Login failed. Please try again."

      if (err.code === "auth/user-not-found") {
        message = "No account found with this email."
      } else if (err.code === "auth/wrong-password") {
        message = "Incorrect password."
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email format."
      } else if (err.code === "auth/too-many-requests") {
        message = "Too many failed attempts. Try again later."
      }

      setError(message)
      setShowErrorBox(true)
    }
  }
  
  return (
    <div className='bg-[#181818] w-full max-w-md mx-auto text-center p-6 mt-10 rounded-lg shadow-lg'>
      <form onSubmit={handleSubmit}>
        <h1 className='text-2xl font-bold mb-6 text-white'>Login</h1>
        
        <div className='mb-4'>
          <input 
            type="text" 
            placeholder='Sastra Email' 
            required 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400'
          />
        </div>
        
        <div className='mb-6'>
          <input 
            type="password"  
            placeholder='Password' 
            required 
            value={password}
            onChange={e => setPassword(e.target.value)}          
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 '
          />
        </div>
        
        <button 
          type="submit" 
          className='w-full bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors'
        >
          Login
        </button>
      </form>
      
      {showErrorBox && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] px-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowErrorBox(false)}
          />
          <div className="relative flex flex-col p-6 border border-white/40 rounded-xl bg-black/60 backdrop-blur-sm shadow-xl max-w-xs w-full">
            <div className="text-sm text-white mb-4 text-center">{error}</div>
            <button
              onClick={() => setShowErrorBox(false)}
              className="mx-auto bg-yellow-300 cursor-pointer text-black font-bold text-xs py-2 px-6 rounded hover:bg-yellow-400 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login