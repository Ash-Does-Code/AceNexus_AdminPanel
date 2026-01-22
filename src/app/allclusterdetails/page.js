'use client'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { db } from '../../../config'
import React from 'react'
import * as XLSX from 'xlsx'

export default function Page () {
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [data4, setData4] = useState([])
  const [data5, setData5] = useState([])
  const [data6, setData6] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const handleClick = () => {
    router.push('/')
  }
  const downloadExcel = (data) => {
    if(data.length === 0) return
  const excelData = data.map(row => ({
    'Register No.': Array.isArray(row.registerNumber) ? row.registerNumber.join(', ') : row.registerNumber || 'N/A',
    'Name': Array.isArray(row.name) ? row.name.join(', ') : row.name || 'N/A',
    'Email': row.email || 'N/A',
    'Department': row.department || 'N/A',
    'Phone': row.phoneNumber || 'N/A',
    'Year': row.year || 'N/A'
  }))
  const worksheet = XLSX.utils.json_to_sheet(excelData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations')
  const max_width = excelData.reduce((w, r) => Math.max(w, r['Department']?.length || 0), 10)
  worksheet['!cols'] = [
    { wch: 20 },
    { wch: 25 },
    { wch: 30 }, 
    { wch: max_width }, 
    { wch: 15 }, 
    { wch: 8 }  
  ]
  const exportName = data[0]?.eventName || 'export'
  XLSX.writeFile(workbook, `registrations_${exportName}_${new Date().toISOString().split('T')[0]}.xlsx`)
}
  const fetchData = async () => {
    try{
      setLoading(true)
      const q1 = query(collection(db, "submissions"), where("eventId","==","hapl0likkHjaHcdv8GaL")) //aiml
      const querySnapshot1 = await getDocs(q1)
      const fetchedData1 = querySnapshot1.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data()
      }))
      setData1(fetchedData1)
      const q2 = query(collection(db, "submissions"), where("eventId","==","u027zjGnaC6WfRs1mpru")) //webdev
      const querySnapshot2 = await getDocs(q2)
      const fetchedData2 = querySnapshot2.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data()
      }))
      setData2(fetchedData2)
      const q3 = query(collection(db, "submissions"), where("eventId","==","oDXbHtfvPnce1RCSJyMj")) //cp
      const querySnapshot3 = await getDocs(q3)
      const fetchedData3 = querySnapshot3.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data()
      }))
      setData3(fetchedData3)
      const q4 = query(collection(db, "submissions"), where("eventId","==","DxUpCiPK5hMEI0dT5Hn2")) //iot
      const querySnapshot4 = await getDocs(q4)
      const fetchedData4 = querySnapshot4.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data()
      }))
      setData4(fetchedData4)
      const q5 = query(collection(db, "submissions"), where("eventId","==","b64lXT4CX3K7eZCGZV26")) //appdev
      const querySnapshot5 = await getDocs(q5)
      const fetchedData5 = querySnapshot5.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data()
      }))
      setData5(fetchedData5)
      const q6 = query(collection(db, "submissions"), where("eventId","==","lGBwKKNGcupaTlEs4uyA")) //cyber
      const querySnapshot6 = await getDocs(q6)
      const fetchedData6 = querySnapshot6.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data()
      }))
      setData6(fetchedData6)
    }
    catch(error){
      setError('Failed to fetch data: ' + error.message)
      setLoading(false)
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  },[])
  if (loading) {
    return (
       <div className='flex items-center justify-center gap-3 min-h-screen bg-[#0b0f1a]'>
        <div className="w-8 h-8 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
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
    <>
    <div className='min-h-screen bg-[#0b0f1a] p-8'>
      <h1 className='bg-yellow-400 rounded-full w-fit px-6 py-2 font-bold mb-5 text-xs rounded cursor-pointer hover:bg-yellow-200 duration-300 transition-all ease-in-out' onClick={handleClick}>Logout</h1>
      <button
        onClick={() => downloadExcel(data1)}
        disabled={data1.length === 0}
        className='bg-yellow-400 mb-5 text-black rounded-full px-6 py-2 font-bold text-xs cursor-pointer hover:bg-yellow-200 duration-300 transition-all ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Download Excel
      </button>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-[200] text-white mb-6 text-center'>
          Registrations {data1.length > 0 ? `for ${data1[0].eventName}` : ""}
        </h1>
        
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='overflow-x-auto max-h-[65vh] overflow-y-auto'>
            <p className='text-black p-2'>{data1.length} records</p>
            <table className='w-full'>
              <thead className='bg-gray-800 text-white sticky top-0'>
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
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data1.length === 0 ? (
                  <tr>
                    <td colSpan="6" className='px-6 py-4 text-center text-gray-500'>
                      No data available
                    </td>
                  </tr>
                ) : (
                  data1.map((row) => (
                    <tr key={row.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.registerNumber) ? row.registerNumber.join(', ') : row.registerNumber || 'N/A'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.name) ? row.name.join(', ') : row.name || 'N/A'}
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
      </div>
    </div>
    <div className='min-h-screen bg-[#0b0f1a] p-8'>
      <button
        onClick={() => downloadExcel(data2)}
        disabled={data2.length === 0}
        className='bg-yellow-400 mb-5 text-black rounded-full px-6 py-2 font-bold text-xs cursor-pointer hover:bg-yellow-200 duration-300 transition-all ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Download Excel
      </button>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-[200] text-white mb-6 text-center'>
          Registrations {data2.length > 0 ? `for ${data2[0].eventName}` : ""}
        </h1>
        
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='overflow-x-auto max-h-[65vh] overflow-y-auto'>
            <p className='text-black p-2'>{data2.length} records</p>
            <table className='w-full'>
              <thead className='bg-gray-800 text-white sticky top-0'>
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
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data2.length === 0 ? (
                  <tr>
                    <td colSpan="6" className='px-6 py-4 text-center text-gray-500'>
                      No data available
                    </td>
                  </tr>
                ) : (
                  data2.map((row) => (
                    <tr key={row.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.registerNumber) ? row.registerNumber.join(', ') : row.registerNumber || 'N/A'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.name) ? row.name.join(', ') : row.name || 'N/A'}
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
      </div>
    </div>
    <div className='min-h-screen bg-[#0b0f1a] p-8'>
      <button
        onClick={() => downloadExcel(data3)}
        disabled={data3.length === 0}
        className='bg-yellow-400 mb-5 text-black rounded-full px-6 py-2 font-bold text-xs cursor-pointer hover:bg-yellow-200 duration-300 transition-all ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Download Excel
      </button>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-[200] text-white mb-6 text-center'>
          Registrations {data3.length > 0 ? `for ${data3[0].eventName}` : ""}
        </h1>
        
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='overflow-x-auto max-h-[65vh] overflow-y-auto'>
            <p className='text-black p-2'>{data3.length} records</p>
            <table className='w-full'>
              <thead className='bg-gray-800 text-white sticky top-0'>
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
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data3.length === 0 ? (
                  <tr>
                    <td colSpan="6" className='px-6 py-4 text-center text-gray-500'>
                      No data available
                    </td>
                  </tr>
                ) : (
                  data3.map((row) => (
                    <tr key={row.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.registerNumber) ? row.registerNumber.join(', ') : row.registerNumber || 'N/A'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.name) ? row.name.join(', ') : row.name || 'N/A'}
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
      </div>
    </div>
    <div className='min-h-screen bg-[#0b0f1a] p-8'>
      <button
        onClick={() => downloadExcel(data4)}
        disabled={data4.length === 0}
        className='bg-yellow-400 mb-5 text-black rounded-full px-6 py-2 font-bold text-xs cursor-pointer hover:bg-yellow-200 duration-300 transition-all ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Download Excel
      </button>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-[200] text-white mb-6 text-center'>
          Registrations {data4.length > 0 ? `for ${data4[0].eventName}` : ""}
        </h1>
        
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='overflow-x-auto max-h-[65vh] overflow-y-auto'>
            <p className='text-black p-2'>{data4.length} records</p>
            <table className='w-full'>
              <thead className='bg-gray-800 text-white sticky top-0'>
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
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data4.length === 0 ? (
                  <tr>
                    <td colSpan="6" className='px-6 py-4 text-center text-gray-500'>
                      No data available
                    </td>
                  </tr>
                ) : (
                  data4.map((row) => (
                    <tr key={row.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.registerNumber) ? row.registerNumber.join(', ') : row.registerNumber || 'N/A'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.name) ? row.name.join(', ') : row.name || 'N/A'}
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
      </div>
    </div>
    <div className='min-h-screen bg-[#0b0f1a] p-8'>
      <button
        onClick={() => downloadExcel(data5)}
        disabled={data5.length === 0}
        className='bg-yellow-400 mb-5 text-black rounded-full px-6 py-2 font-bold text-xs cursor-pointer hover:bg-yellow-200 duration-300 transition-all ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Download Excel
      </button>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-[200] text-white mb-6 text-center'>
          Registrations {data5.length > 0 ? `for ${data5[0].eventName}` : ""}
        </h1>
        
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='overflow-x-auto max-h-[65vh] overflow-y-auto'>
            <p className='text-black p-2'>{data5.length} records</p>
            <table className='w-full'>
              <thead className='bg-gray-800 text-white sticky top-0'>
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
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data5.length === 0 ? (
                  <tr>
                    <td colSpan="6" className='px-6 py-4 text-center text-gray-500'>
                      No data available
                    </td>
                  </tr>
                ) : (
                  data5.map((row) => (
                    <tr key={row.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.registerNumber) ? row.registerNumber.join(', ') : row.registerNumber || 'N/A'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.name) ? row.name.join(', ') : row.name || 'N/A'}
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
      </div>
    </div>
    <div className='min-h-screen bg-[#0b0f1a] p-8'>
      <button
        onClick={() => downloadExcel(data6)}
        disabled={data6.length === 0}
        className='bg-yellow-400 mb-5 text-black rounded-full px-6 py-2 font-bold text-xs cursor-pointer hover:bg-yellow-200 duration-300 transition-all ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Download Excel
      </button>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-[200] text-white mb-6 text-center'>
          Registrations {data6.length > 0 ? `for ${data6[0].eventName}` : ""}
        </h1>
        
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='overflow-x-auto max-h-[65vh] overflow-y-auto'>
            <p className='text-black p-2'>{data6.length} records</p>
            <table className='w-full'>
              <thead className='bg-gray-800 text-white sticky top-0'>
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
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data6.length === 0 ? (
                  <tr>
                    <td colSpan="6" className='px-6 py-4 text-center text-gray-500'>
                      No data available
                    </td>
                  </tr>
                ) : (
                  data6.map((row) => (
                    <tr key={row.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.registerNumber) ? row.registerNumber.join(', ') : row.registerNumber || 'N/A'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {Array.isArray(row.name) ? row.name.join(', ') : row.name || 'N/A'}
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
          className='mt-10 mx-auto block bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded-full font-bold ease-in-out duration-300 text-xs cursor-pointer hover:bg-yellow-200 transition-colors'
        >
          Refresh Data
        </button>
      </div>
    </div>
    </>
  )
}
