import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate();
    const [winBool, setWinBool] = useState(false);
    const [winBool2, setWinBool2] = useState(false);

    useEffect(() => {
        const storedWinBool = localStorage.getItem('winBool');
        const storedWinBool2 = localStorage.getItem('winBool2');
        if (storedWinBool !== null) {
            setWinBool(storedWinBool === 'true');
        }
        if (storedWinBool2 !== null) {
            setWinBool2(storedWinBool2 === 'true');
        }
    }, [localStorage.length]);
    
  return (
    <div className="font-custom max-w-[400px] flex-row items-center justify-center">
        <div onClick={()=>navigate("/")} className='text-white text-9xl hover:scale-105 cursor-pointer flex justify-center ease-in duration-150'>
          AoTdle
        </div>
        <div className='relative'>
            <div className="absolute inset-0 bg-white h-1 top-16"></div>
            <div className='flex flex-row items-center gap-3 px-5 pt-10'>
                <button onClick={()=>navigate('/classic')} className='w-20 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
                    Classic
                    {winBool
                    ?<img className='w-4 h-4 absolute right-1 bottom-1' src={assets.check} alt="" />
                    :null}
                </button>
                <button onClick={()=>navigate('/quote')} className='w-20 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
                    {winBool2
                    ?<img className='w-4 h-4 absolute right-1 bottom-1' src={assets.check} alt="" />
                    :null}
                    Quote
                </button>
                <button onClick={()=>navigate('/classic')} className='w-20 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
                    ??????
                </button>
                <button onClick={()=>navigate('/classic')} className='w-20 h-14 bg-[#3b2f2f] text-white rounded-lg text-xl hover:bg-[#524545] hover:scale-105 transition transform duration-200 ease-in-out'>
                    ??????
                </button>
            </div>
        </div>
    </div>
  )
}

export default NavBar