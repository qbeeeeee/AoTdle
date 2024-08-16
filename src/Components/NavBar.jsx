import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const NavBar = ({winBool}) => {

    const navigate = useNavigate();
    
  return (
    <div>
        <div onClick={()=>navigate("/")} className='text-white text-9xl hover:scale-105 cursor-pointer flex justify-center ease-in duration-150'>
          AoTdle
        </div>
        <div className='relative'>
            <div className="absolute inset-0 bg-white h-1 top-16"></div>
            <div className='flex flex-row items-center gap-3 px-5 pt-10'>
                {winBool
                ?<button onClick={()=>navigate('/classic')} className='w-20 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
                    Classic
                    <img className='w-4 h-4 absolute right-1 bottom-1' src={assets.check} alt="" />
                </button>
                :<button onClick={()=>navigate('/classic')} className='w-20 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
                Classic
                </button>
                }
                <button onClick={()=>navigate('/classic')} className='w-20 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
                    Quote
                </button>
                <button onClick={()=>navigate('/classic')} className='w-20 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
                    eyeys
                </button>
                <button onClick={()=>navigate('/classic')} className='w-20 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
                    Classic
                </button>
            </div>
        </div>
    </div>
  )
}

export default NavBar