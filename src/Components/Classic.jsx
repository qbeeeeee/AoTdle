import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { charactersData } from '../assets/assets';
import ResetTime from './ResetTime';

const Classic = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [charactersPicked, setCharactersPicked] = useState([]);
    const [delayedCharacters, setDelayedCharacters] = useState([]);
    const [winMessage, setWinMessage] = useState('');
    const [winBool,setWinBool] = useState(false);
    
    const todaysCharacter = charactersData[0];
    
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
        addCharacterWithDelay(item);
    }

    const addCharacterWithDelay = (item) => {
        setDelayedCharacters((prev) => [...prev, { ...item, displayedFields: [] }]);
        const fields = ['gender', 'race', 'skills', 'attribute','military_branch'];
        
        fields.forEach((field, index) => {
            setTimeout(() => {
                setDelayedCharacters((prev) =>
                    prev.map((char) =>
                        char.id === item.id
                            ? { ...char, displayedFields: [...char.displayedFields, field] }
                            : char
                    )
                );
            }, index * 500);
        });
    }

    useEffect(() => {
        delayedCharacters.forEach((item) => {
            if (item.displayedFields.length === 4 && 
                item.gender === todaysCharacter.gender &&
                item.race === todaysCharacter.race &&
                item.skills === todaysCharacter.skills &&
                item.attribute === todaysCharacter.attribute &&
                item.military_branch === todaysCharacter.military_branch) {
                setWinMessage(`Congratulations! You've guessed today's character: ${item.character}!!!`);
                setWinBool(true);
            }
        });
    }, [delayedCharacters, todaysCharacter]);

    useEffect(() => {
        const savedWinBool = localStorage.getItem('winBool') === 'true';
        const savedTimestamp = localStorage.getItem('winTimestamp');
        const savedWinMessage = localStorage.getItem('winMessage') || '';

        if (savedTimestamp) {
            const savedDate = new Date(parseInt(savedTimestamp));
            const today = new Date();

            if (savedDate.getDate() !== today.getDate() || 
                savedDate.getMonth() !== today.getMonth() || 
                savedDate.getFullYear() !== today.getFullYear()) {
                setWinBool(false);
                setWinMessage('');
                localStorage.removeItem('winBool');
                localStorage.removeItem('winTimestamp');
                localStorage.removeItem('winMessage');
                localStorage.removeItem('storeCharacters');
                setDelayedCharacters([]);
            } else {
                setWinBool(savedWinBool);
                setWinMessage(savedWinMessage);
            }
        } else {
            setWinBool(false);
            setWinMessage('');
        }
    }, []);

    useEffect(() => {
        const storedCharacters = localStorage.getItem('storeCharacters');
        const storedWinBool = localStorage.getItem('winBool');
        const storedWinMessage = localStorage.getItem('winMessage');

        if (storedCharacters) {
            setDelayedCharacters(JSON.parse(storedCharacters));
        }
        if (storedWinBool) {
            setWinBool(storedWinBool === 'true');
        }
        if (storedWinMessage) {
            setWinMessage(storedWinMessage);
        }
    }, []);

    useEffect(() => {
        if (winBool) {
            const now = new Date();
            localStorage.setItem('winBool', 'true');
            localStorage.setItem('winTimestamp', now.getTime().toString());
            localStorage.setItem('winMessage', winMessage);
            localStorage.setItem('storeCharacters', JSON.stringify(delayedCharacters));
        } else {
            localStorage.setItem('winBool', 'false');
            localStorage.removeItem('winTimestamp');
            localStorage.removeItem('winMessage');
            localStorage.removeItem('storeCharacters');
        }
    }, [winBool, winMessage, delayedCharacters]);

    //localStorage.removeItem('winBool');

    return (
        <div className='flex flex-col items-center'>
            <NavBar/>
            <div className="mt-5 bg-[#606060] rounded-2xl p-5 max-w-96">
                <div className="text-4xl semi-bold font-custom">
                    Guess today's character from Attack On Titan! Type any character to begin.
                </div>
            </div>
            {winBool
            ?<div className="flex flex-col items-center justify-center pt-10"><div className='font-custom text-white text-xl w-96 p-10 rounded-full bg-[#3b2f2f]'>{winMessage}</div> <ResetTime/></div>
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
            <div className="flex flex-col mt-4">
                {charactersPicked.length === 0
                ? null
                :
                <div className="flex justify-between gap-4">
                    <div className="flex-1 p-2 w-16 h-16 backdrop-blur-lg items-center justify-center flex rounded-md text-center text-white">Character</div>
                    <div className="flex-1 p-2 w-16 h-16 backdrop-blur-lg items-center justify-center flex rounded-md text-center text-white">Gender</div>
                    <div className="flex-1 p-2 w-16 h-16 backdrop-blur-lg items-center justify-center flex rounded-md text-center text-white">Race</div>
                    <div className="flex-1 p-2 w-16 h-16 backdrop-blur-lg items-center justify-center flex rounded-md text-center text-white">Skills</div>
                    <div className="flex-1 p-2 w-16 h-16 backdrop-blur-lg items-center justify-center flex rounded-md text-center text-white">Attribute</div>
                    <div className="flex-1 p-2 w-16 h-16 backdrop-blur-lg items-center justify-center flex rounded-md text-center text-white">military_branch</div>
                </div>
                }
                <ul>
                {delayedCharacters.slice().reverse().map((item) => (
                    <li key={item.id} className="flex gap-5 py-1.5">
                        <img src={item.image} alt={item.character} className="w-16 h-16 object-cover object-bottom rounded-xl" />
                        {item.displayedFields.includes('gender') && (
                            <div className={`p-2 w-16 h-16 ${item.gender === todaysCharacter.gender ? "bg-green-600" : "bg-red-600"} items-center justify-center flex rounded-md text-center text-white`}>{item.gender}</div>
                        )}
                        {item.displayedFields.includes('race') && (
                            <div className={`p-2 ${item.race === todaysCharacter.race ? "bg-green-600" : "bg-red-600"} w-16 h-16 items-center justify-center flex rounded-md text-center text-white`}>{item.race}</div>
                        )}
                        {item.displayedFields.includes('skills') && (
                            <div className={`p-2 ${item.skills === todaysCharacter.skills ? "bg-green-600" : "bg-red-600"} w-16 h-16 items-center justify-center flex rounded-md text-center text-white`}>{item.skills}</div>
                        )}
                        {item.displayedFields.includes('attribute') && (
                            <div className={`p-2 ${item.attribute === todaysCharacter.attribute ? "bg-green-600" : "bg-red-600"} w-16 h-16 items-center justify-center flex rounded-md text-center text-white`}>{item.attribute}</div>
                        )}
                        {item.displayedFields.includes('military_branch') && (
                            <div className={`p-2 ${item.military_branch === todaysCharacter.military_branch ? "bg-green-600" : "bg-red-600"} w-16 h-16 items-center justify-center flex rounded-md text-center text-white`}>{item.military_branch}</div>
                        )}
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default Classic
