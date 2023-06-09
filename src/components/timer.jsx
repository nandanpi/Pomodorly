import React , {useEffect , useState} from "react";
import axios from "axios";
import {RxReset} from "react-icons/rx";
import {IoPlayOutline , IoPauseOutline , IoSettingsOutline} from "react-icons/io5";
import {BsFullscreen} from "react-icons/bs";
import {AiOutlineClose} from "react-icons/ai";
import {TbTriangleFilled , TbTriangleInvertedFilled} from "react-icons/tb";
import Emoji from "../assets/Emoji.png";


const Timer = () => {
    const [isRunning , setIsRunning] = useState(false);
    const [pomores , setPomores] = useState(false);
    // const [timerLengths , setTimerLengths] = useState(0);
    const [sessionTimerLength, setSessionTimerLength] = useState(10);
    const [restTimerLength, setRestTimerLength] = useState(5)
    const [currentTimer , setCurrentTimer] = useState(0);
    const [prevTimer, setPrevTimer] = useState(0);
    const [nextTimer, setNextTimer] = useState(0);
    const [showReset , setShowReset] = useState(false);
    const [currentSessionNumber, setCurrentSessionNumber] = useState(0);
    const [prevSessionNumber, setPrevSessionNumber] = useState(1);
    const [nextSessionNumber, setNextSessionNumber] = useState(1);
    const [currentRestNumber, setCurrentRestNumber] = useState(1);
    const [prevRestNumber, setPrevRestNumber] = useState(1);
    const [nextRestNumber, setNextRestNumber] = useState(1);
    const [showPermission, setShowPermission] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [focusMode, setFocusMode] = useState(false);
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [button, setButton] = useState(false);
    let interval = null;

    function toggleTimer() {
        setIsRunning(!isRunning);
    }

    function resetTimer() {
        setCurrentTimer(nextTimer === sessionTimerLength ? restTimerLength : sessionTimerLength);
        setIsRunning(false);
        setShowReset(false);
    }

    function inc(){
        if(currentTimer !== 0){
            if(button)
                setRestTimerLength(restTimerLength + 60);
            else
                setSessionTimerLength(sessionTimerLength + 60);
        }
    }

    function dec(){
        if(button){
            setRestTimerLength(restTimerLength - 60);
        }
        else{
            setSessionTimerLength(sessionTimerLength - 60);
        }
    }

    function pad(d){
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    useEffect(() => {
        setShowReset(false);
        if(isRunning){
            // eslint-disable-next-line react-hooks/exhaustive-deps
            interval = setInterval(() => {
                setCurrentTimer((seconds) => seconds - 1);
            }, 1000);
        } else if (!isRunning && currentTimer !== 0) {
            clearInterval(interval);
        }
        if(currentTimer < (sessionTimerLength || restTimerLength))
            setShowReset(true);
        if(currentTimer === 0){
            setPomores(!pomores);
            setPrevTimer(currentTimer);
            setCurrentTimer(nextTimer);
            setNextTimer(nextTimer === restTimerLength ? sessionTimerLength : restTimerLength);
            if(nextTimer === sessionTimerLength){
                setCurrentRestNumber((prevNumber) => prevNumber +1 );
                setNextRestNumber(currentRestNumber + 1);
                setShowPermission(true);
            }
            else{
                setCurrentSessionNumber((prevNumber) => prevNumber +1);
                setNextSessionNumber(currentSessionNumber + 1 );
            }
            setPrevSessionNumber(currentSessionNumber);
            setPrevRestNumber(currentRestNumber);

        }
        return () => clearInterval(interval);
    }, [isRunning, pomores, currentTimer, sessionTimerLength, restTimerLength, nextTimer, currentSessionNumber, nextSessionNumber, currentRestNumber, nextRestNumber, prevSessionNumber, prevRestNumber]);

    useEffect(() => {
        if(currentRestNumber !== 1){
            clearInterval(interval);
            setFocusMode(false);
        }
    },[currentRestNumber, interval])

    function Continue(){
        setShowPermission(false);
        setIsRunning(!isRunning);
    }

    function notContinue(){
        setShowPermission(false);
        setCurrentTimer(10);
        setIsRunning(false);
        setShowReset(false);
        setCurrentSessionNumber(1);
        setCurrentRestNumber(1);
        setPrevSessionNumber(0);
        setPrevRestNumber(1);
        setNextSessionNumber(1);
        setNextRestNumber(1);
    }

    function toggleSettings(){
        setShowSettings(!showSettings);
        if(isRunning)
            setIsRunning(!isRunning);
    }

    function toggleFocusMode(){
        setFocusMode(!focusMode);
    }

    const quoteAPI = async () =>{
        let arrayOfQuotes = [];
        try{
            const data = axios.get("https://api.quotable.io/random?tags=motivational&maxLength=100");
            arrayOfQuotes = (await (data)).data;
            console.log(data);
        }catch (error){
            console.log(error);
        }
        try{
            setQuote(arrayOfQuotes.content);
            setAuthor(arrayOfQuotes.author);
        }catch (error){
            console.log(error);
        }

    }
    useEffect(() => {
        quoteAPI();
        setCurrentTimer(sessionTimerLength);
        setNextTimer(restTimerLength);
    },[restTimerLength, sessionTimerLength])

    function changeToSession(){
      setButton(false);
    }

    function changeToRest(){
        setButton(true);
    }

    function resetTodefault(){
        window.location.reload();
    }

    return(
        <>
            <div>
                <div className="justify-center items-center hidden md:flex bg-white ">
                    <div className="w-screen justify-between items-center grid grid-cols-3 bg-white ">
                        <div className="fixed top-[33%] left-[-6%] bg-white ">
                            <div className={prevRestNumber ===1 && prevSessionNumber === 0 ? "hidden" : "h-[400px] w-[400px] border-2 rounded-full items-center flex justify-center bg-white "}>
                                <div className="grid-rows-2 text-center">
                                    <div>
                                        <span className="text-6xl font-bold text-gray-400">{pad(Math.floor(prevTimer/60))}:{pad(prevTimer%60)}</span>
                                    </div>
                                    <div className="text-3xl text-gray-400">
                                        {nextTimer === restTimerLength ? <span>Rest {prevRestNumber}</span> : <span>Session {prevSessionNumber}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fixed top-[33%] left-[36%]">
                            <div className="h-[400px] w-[400px] border-2 rounded-full items-center flex justify-center shadow-2xl bg-white text-black ">
                                <div className="grid-rows-2 text-center">
                                    <div>
                                        <span className="text-6xl font-bold">{pad(Math.floor(currentTimer/60))}:{pad(currentTimer%60)}</span>
                                    </div>
                                    <div className="text-3xl">
                                        {nextTimer === restTimerLength ? <span>Session {currentSessionNumber}</span> : <span>Rest {currentRestNumber}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fixed top-[33%] left-[80%]">
                            <div className="h-[400px] w-[400px] border-2 rounded-full items-center flex justify-center bg-white ">
                                <div className="grid-rows-2 text-center">
                                    <div>
                                        <span className="text-6xl font-bold text-gray-400">{pad(Math.floor(nextTimer/60))}:{pad(nextTimer%60)}</span>
                                    </div>
                                    <div className="text-3xl text-gray-400">
                                        {nextTimer === restTimerLength ? <span>Rest {nextRestNumber}</span> : <span>Session {nextSessionNumber}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="justify-center items-center flex md:hidden mx-12 z-10">
                    <div className="w-screen justify-between items-center grid grid-rows-3">
                        <div className="fixed top-[30%] ">
                            <div className="h-[300px] w-[300px] border-2 rounded-full items-center flex justify-center shadow-2xl">
                                <div className="grid-rows-2 text-center">
                                    <div>
                                        <span className="text-6xl font-bold">{pad(Math.floor(currentTimer/60))}:{pad(currentTimer%60)}</span>
                                    </div>
                                    <div className="text-3xl">
                                        {nextTimer === restTimerLength ? <span>Session {currentSessionNumber}</span> : <span>Rest {currentRestNumber}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fixed top-[75%]">
                            <div className="h-[300px] w-[300px] border-2 rounded-full items-center flex justify-center ">
                                <div className="grid-rows-2 text-center">
                                    <div>
                                        <span className="text-6xl font-bold text-gray-400">{pad(Math.floor(nextTimer/60))}:{pad(nextTimer%60)}</span>
                                    </div>
                                    <div className="text-3xl text-gray-400">
                                        {nextTimer === restTimerLength ? <span>Rest {nextRestNumber}</span> : <span>Session {nextSessionNumber}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-rows-2 justify-center items-center bg-white pt-3 space-y-1">
                    <div className="flex justify-center items-center">
                        <ul className="flex space-x-4">
                            <li><button onClick={toggleTimer} className={!focusMode ? "block" : "hidden"}>{isRunning ?<IoPauseOutline size={40} className="text-black "/> : <IoPlayOutline size={40} className="text-black "/>}</button></li>
                            <li><button onClick={resetTimer} className={showReset && !focusMode ? 'block' : 'hidden'}><RxReset size={35} className="pt-1 mr-2 text-black "/></button></li>
                            <li><button onClick={toggleSettings} className={!focusMode ? "block" : "hidden"}><IoSettingsOutline size={38} className="text-black "/></button></li>
                            <li><button onClick={toggleFocusMode} className={!focusMode ? "block" : "hidden"}><BsFullscreen size={32} className="pt-1 ml-4 text-black "/></button></li>
                        </ul>
                    </div>
                    <div className="flex justify-center items-center text-center text-gray-400 space-x-4 text-sm mx-4">
                        <div>
                            <p>"{quote}" - {author}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={focusMode ? "block absolute h-screen w-screen top-0 right-0 bg-opacity-40 backdrop-blur-sm z-[99999]" : "hidden" }>
                <div className="fixed top-[33%] left-[36%] hidden md:flex">
                    <div className="h-[400px] w-[400px] border-2 rounded-full items-center flex justify-center shadow-2xl">
                        <div className="grid-rows-2 text-center">
                            <div className="bg-black p-3 rounded-2xl">
                                <span className="text-7xl font-bold text-white">{pad(Math.floor(currentTimer/60))}:{pad(currentTimer%60)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={toggleFocusMode} className={focusMode ? "block top-0 right-0 m-5" : "hidden"}><AiOutlineClose size={50}/></button>
                </div>
                <div className="fixed left-[12%] top-[28%] flex md:hidden">
                    <div className="h-[300px] w-[300px] border-2 rounded-full items-center flex justify-center shadow-2xl">
                        <div className="grid-rows-2 text-center">
                            <div className="bg-black p-3 rounded-2xl">
                                <span className="text-5xl font-bold text-white">{pad(Math.floor(currentTimer/60))}:{pad(currentTimer%60)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={showSettings ? "block absolute h-screen w-screen top-0 right-0 bg-opacity-40 backdrop-blur-sm z-[99999]" : "hidden" }>
                <div className="flex justify-center items-center h-screen">
                    <div className="bg-white shadow-2xl rounded-xl grid space-y-5 p-5  ">
                        <div>
                            <div className="float-left">
                                <AiOutlineClose onClick={toggleSettings} size={40} className="cursor-pointer text-black "/>
                            </div>
                        </div>
                        <div>
                            <p className="text-xl font-bold text-black ">
                                Change Timer Length:
                            </p>
                        </div>
                        <div>
                            <ul className="space-x-3  p-2 rounded-full flex justify-center items-center">
                                <li onClick={changeToSession} className={!button ? "bg-blue-300 text-black rounded-full p-2 font-bold duration-200 text-sm md:text-lg cursor-pointer" : "p-2 text-sm md:text-lg cursor-pointer text-black "}>Session</li>
                                <li onClick={changeToRest} className={button ? "bg-blue-300 text-black rounded-full p-2 font-bold duration-200 text-sm md:text-lg cursor-pointer" : "p-2 text-sm md:text-lg cursor-pointer text-black "}>Rest</li>
                            </ul>
                        </div>
                        <div className="items-center justify-center flex">
                            <TbTriangleFilled onClick={inc} className="text-black "/>
                        </div>
                        <div className={!button ? "items-center justify-center flex text-black " : "hidden"}>
                            {pad(Math.floor(sessionTimerLength/60))}:{pad(sessionTimerLength%60)}
                        </div>
                        <div className={button ? "items-center justify-center flex text-black " : "hidden"}>
                            {pad(Math.floor(restTimerLength/60))}:{pad(restTimerLength%60)}
                        </div>
                        <div className="items-center justify-center flex text-black ">
                            <TbTriangleInvertedFilled onClick={dec}/>
                        </div>
                        <div onClick={resetTodefault} className="items-center justify-center flex cursor-pointer text-red font-bold">
                            Reset all the Sessions
                        </div>
                    </div>
                </div>
            </div>

            <div  className={showPermission ? "block absolute h-screen w-screen top-0 right-0 bg-opacity-40 backdrop-blur-sm z-[99999]" : "hidden" }>
                <div className="flex justify-center items-center h-screen">
                    <div className="bg-white shadow-2xl rounded-xl grid space-y-5 p-5 m-10 md:m-auto">
                        <div className="flex justify-center items-center">
                            <img src={Emoji} alt="#"/>
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="text-3xl font-bold">Good Job!</p>
                        </div>
                        <div>
                            <p className="text-2xl max-w-sm justify-center items-center text-center">
                                You've completed {Math.floor(sessionTimerLength/60)} minutes of focus today.
                            </p>
                        </div>
                        <div>
                            <button onClick={Continue} className="text-white w-full bg-purple p-2 rounded-xl text-xl">Next Session!</button>
                        </div>
                        <div>
                            <button onClick={notContinue} className="text-white w-full bg-red p-2 rounded-xl text-xl">Abandon Streak :(</button>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}
export default Timer;


