import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { charactersData } from '../assets/assets';
import ResetTime from './ResetTime';

const Quote = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [winBool2,setWinBool2] = useState(false);
  const [charactersPicked, setCharactersPicked] = useState([]);
  const [winMessage2, setWinMessage2] = useState('');

  const todaysCharacter = charactersData[3];

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.length < 1) {
        setSuggestions([]);
        return;
    }

    const filteredSuggestions = charactersData.filter(item =>
        item.character.toLowerCase().startsWith(value)
    );

    setSuggestions(filteredSuggestions);
  };

  const addCharacter = (item) => {
    setCharactersPicked((prevCharacters) => [...prevCharacters, item]);
  }

  useEffect(() => {
    charactersPicked.forEach((item) => {
        if (item.character === todaysCharacter.character) {
            setWinMessage2(`Congratulations! You've guessed today's character: ${item.character}!!!`);
            setWinBool2(true);       
        }
    });
    }, [charactersPicked, todaysCharacter]);

    useEffect(() => {
        const savedWinBool = localStorage.getItem('winBool2') === 'true';
        const savedTimestamp = localStorage.getItem('winTimestamp2');
        const savedWinMessage = localStorage.getItem('winMessage2') || '';

        if (savedTimestamp) {
            const savedDate = new Date(parseInt(savedTimestamp));
            const today = new Date();

            if (savedDate.getDate() !== today.getDate() || 
                savedDate.getMonth() !== today.getMonth() || 
                savedDate.getFullYear() !== today.getFullYear()) {
                setWinBool2(false);
                setWinMessage2('');
                localStorage.removeItem('winBool2');
                localStorage.removeItem('winTimestamp2');
                localStorage.removeItem('winMessage2');
                localStorage.removeItem('storeCharacters2');
                setCharactersPicked([]);
            } else {
                setWinBool2(savedWinBool);
                setWinMessage2(savedWinMessage);
            }
        } else {
            setWinBool2(false);
            setWinMessage2('');
        }
    }, []);

    useEffect(() => {
        const storedCharacters = localStorage.getItem('storeCharacters2');
        const storedWinBool = localStorage.getItem('winBool2');
        const storedWinMessage = localStorage.getItem('winMessage2');

        if (storedCharacters) {
            setCharactersPicked(JSON.parse(storedCharacters));
        }
        if (storedWinBool) {
            setWinBool2(storedWinBool === 'true');
        }
        if (storedWinMessage) {
            setWinMessage2(storedWinMessage);
        }
    }, []);

    useEffect(() => {
        if (winBool2) {
            const now = new Date();
            localStorage.setItem('winBool2', 'true');
            localStorage.setItem('winTimestamp2', now.getTime().toString());
            localStorage.setItem('winMessage2', winMessage2);
            localStorage.setItem('storeCharacters2', JSON.stringify(charactersPicked));
        } else {
            localStorage.setItem('winBool2', 'false');
            localStorage.removeItem('winTimestamp2');
            localStorage.removeItem('winMessage2');
            localStorage.removeItem('storeCharacters2');
        }
    }, [winBool2, winMessage2, charactersPicked]);

    // localStorage.removeItem('winBool2');
    // localStorage.removeItem('storeCharacters2');
    // localStorage.removeItem('winBool');

  return (
    <div className='flex flex-col items-center'>
        <NavBar/>
        <div className="mt-5 bg-[#606060] rounded-2xl p-5 max-w-96 flex flex-col">
            <div className="text-3xl semi-bold font-custom items-center justify-center flex">
              Which Character says:
            </div>
            <div className="text-4xl mt-5 ml-5 semi-bold font-custom items-center justify-center flex">
              "{todaysCharacter.quote}"
            </div>
        </div>
        {winBool2
            ?<div className="flex flex-col items-center justify-center pt-10"><div className='font-custom text-white text-xl w-96 p-10 rounded-full bg-[#3b2f2f]'>{winMessage2}</div> <ResetTime/></div>
            :<div className="w-72 mt-5">
                <div className="relative">
                    <input type="text" placeholder="Search..." onChange={handleChange} value={searchTerm}
                        className="py-3 w-full px-4 pl-10 rounded-lg bg-[#2f2f2f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f2b636] border border-[#3b2f2f] shadow-md" />
                    <svg id="search-icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#f2b636]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </div>
                <div className="w-full mt-1 bg-[#2f2f2f] border border-[#3b2f2f] rounded-lg shadow-lg cursor-pointer overflow-auto max-h-72">
                    <ul>
                    {suggestions.map((item) => (
                        charactersPicked.includes(item) ? (
                            null
                        ) : (
                            <li key={item.id} onClick={() => addCharacter(item)} className="flex gap-5 py-2 items-center px-2 hover:bg-slate-600">
                                <img src={item.image} alt={item.character} className="w-14 h-14 object-cover object-bottom rounded-lg" />
                                <div className='text-xl'>{item.character}</div>
                            </li>
                        )
                    ))}
                    </ul>
                </div>
            </div>
            }
            <ul className='flex flex-col justify-center items-center mt-10 gap-3'>
                {charactersPicked.slice().reverse().map((item) => (
                    <li key={item.id} className={`flex flex-col ${item.character === todaysCharacter.character? "bg-green-500":  "bg-red-500"} w-[300px] h-[100px] rounded-xl items-center justify-center`}>
                        <img src={item.image} alt={item.character} className="w-16 h-16 object-cover object-bottom rounded-xl" />
                        <div className='text-white semi-bold'>{item.character}</div>
                    </li>
                ))}
                </ul>
    </div>
  )
}

export default Quote