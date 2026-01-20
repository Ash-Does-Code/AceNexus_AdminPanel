"use client"
import React, { useState, useEffect ,use  } from 'react'

import { collection, getDocs ,query, where } from 'firebase/firestore'
import { db } from "../../../../config"; 
import { useRouter } from 'next/navigation';

export default  function page({ params }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { clusterID } = use(params);
  const router = useRouter();
  const handleClick=()=>{
    router.push('/');
  }
   useEffect(() => {
    if (clusterID) {
      fetchData()
    }
  }, [clusterID]) 
  const fetchData = async () => {
  try {
    setLoading(true)
    
    const q = query(
      collection(db, 'submissions'),
      where('eventId', '==', clusterID)
    )
    
    const querySnapshot = await getDocs(q)
    
    const fetchedData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    setData(fetchedData)
    setLoading(false)
  } catch (err) {
    setError('Failed to fetch data: ' + err.message)
    setLoading(false)
  }
}
  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#0b0f1a]'>
        <div className='text-yellow-300 text-xl'>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#0b0f1a]'>
        <div className='text-red-400 text-xl'>{error}</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#0b0f1a] p-8'>
      <h1 className='bg-blue-500 w-fit p-2 text-xl rounded cursor-pointer' onClick={handleClick}>Logout</h1>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-yellow-300 mb-6 text-center'>
          Registrations
        </h1>
        
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-800 text-white'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                    Register No.
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                    Name
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                    Email
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                    Department
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                    Phone
                  </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                    Year
                  </th>
                  {/* Add more headers based on your data structure */}
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="6" className='px-6 py-4 text-center text-gray-500'>
                      No data available
                    </td>
                  </tr>
                ) : (
                  data.map((row) => (
                    <tr key={row.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {row.registerNumber}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {row.name || 'N/A'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {row.email || 'N/A'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {row.department || 'N/A'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {row.phoneNumber || 'N/A'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {row.year || 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={fetchData}
          className='mt-6 mx-auto block bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded-md hover:bg-yellow-500 transition-colors'
        >
          Refresh Data
        </button>
      </div>
    </div>
  )
}

