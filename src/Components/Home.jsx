import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

  return (
    <div className='font-custom text-center'>
        <div className='text-white text-9xl hover:scale-105 cursor-pointer ease-in duration-150'>
          AoTdle
        </div>
        <div className='text-white text-6xl pt-2'>
          Guess Aot Characters
        </div>
        <div className='flex flex-col items-center space-y-6 pt-10'>
          <button onClick={()=>navigate('/classic')} className='w-40 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
            Classic
          </button>
          <button onClick={()=>navigate('/quote')} className='w-40 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
            Quote
          </button>
          <button className='w-40 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
            ?????
          </button>
          <button className='w-40 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
            ??????
          </button>
        </div>
      </div>
  )
}

export default Home