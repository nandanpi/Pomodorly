import React , {useEffect , useState} from "react";
import axios from "axios";

const Timer = () => {
    const [isRunning , setIsRunning] = useState(false);
    const [pomores , setPomores] = useState(false);
    const [timerLengths , setTimerLengths] = useState(25*60);
    const [currentTimer , setCurrentTimer] = useState(timerLengths);
    const [prevTimer, setPrevTimer] = useState(0);
    const [nextTimer, setNextTimer] = useState(5*60);
    const [showReset , setShowReset] = useState(false);
    const [currentSessionNumber, setCurrentSessionNumber] = useState(1);
    const [prevSessionNumber, setPrevSessionNumber] = useState(1);
    const [nextSessionNumber, setNextSessionNumber] = useState(1);
    const [currentRestNumber, setCurrentRestNumber] = useState(1);
    const [prevRestNumber, setPrevRestNumber] = useState(1);
    const [nextRestNumber, setNextRestNumber] = useState(1);
    const [showPermission, setShowPermission] = useState(false);
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [showSettings, setShowSettings] = useState(false);
    const [focusMode, setFocusMode] = useState(false);
    let interval = null;


    function toggleTimer() {
        setIsRunning(!isRunning);
        quoteAPI();
    }

    function resetTimer() {
        setCurrentTimer(timerLengths);
        setIsRunning(false);
        setShowReset(false)
    }

    function inc(){
        if(currentTimer !== 0){
            if(!isRunning){
                setTimerLengths(currentTimer + 60);
                setCurrentTimer(currentTimer+60);
            }
            else
                setCurrentTimer(currentTimer+60);
        }
    }

    function dec(){
        if(!(currentTimer<=60)){
            if(!isRunning){
                setTimerLengths(currentTimer - 60);
                setCurrentTimer(currentTimer - 60);
            }
            else
                setCurrentTimer(currentTimer-60);
        }
    }

    function pad(d){
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    useEffect(() => {
        if(isRunning){
            // eslint-disable-next-line react-hooks/exhaustive-deps
            interval = setInterval(() => {
                setCurrentTimer((seconds) => seconds - 1);
            }, 1000);
        } else if (!isRunning && currentTimer !== 0) {
            clearInterval(interval);
        }
        if(currentTimer < timerLengths)
            setShowReset(true);
        if(currentTimer === 0){
            setPomores(!pomores);
            setPrevTimer(currentTimer);
            setCurrentTimer(nextTimer);
            setNextTimer(nextTimer === 10 ? 30 : 10);
            if (nextTimer === 10) {
                setCurrentSessionNumber((prevNumber) => prevNumber + 1);
            } else {
                setCurrentRestNumber((prevNumber) => prevNumber + 1);
            }
            setPrevSessionNumber(currentSessionNumber);
            setCurrentSessionNumber(nextSessionNumber);
            setNextSessionNumber(currentSessionNumber + 1);
            setPrevRestNumber(currentRestNumber);
            setCurrentRestNumber(nextRestNumber);
            setNextRestNumber(currentRestNumber + 1);
        }
        return () => clearInterval(interval);
    }, [isRunning, pomores, currentTimer, timerLengths, nextTimer, currentSessionNumber, nextSessionNumber, currentRestNumber, nextRestNumber, prevSessionNumber, prevRestNumber]);

    useEffect(() => {
        if(currentRestNumber !== 1){
            setShowPermission(true);
            clearInterval(interval);
            setFocusMode(false);
        }
    },[currentRestNumber, interval])

    function Continue(){
        console.log("Continue");
        setShowPermission(false);
        setIsRunning(!isRunning);
    }

    function notContinue(){
        console.log("Not Continue");
        setShowPermission(false);
        setCurrentTimer(timerLengths);
        setIsRunning(false);
        setShowReset(false);
        setCurrentSessionNumber(1);
        setCurrentRestNumber(1);
        setPrevSessionNumber(1);
        setPrevRestNumber(1);
        setNextSessionNumber(1);
        setNextRestNumber(1);
    }

    const quoteAPI = async () =>{
        let arrayOfQuotes = [];
        try{
            const data = axios.get("https://api.quotable.io/random?tags=motivational");
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
        const onLoad = () => {
            quoteAPI();
        };
        window.addEventListener('load', onLoad);

        return () => {
            window.removeEventListener('load', onLoad);
        };
    }, []);

    function toggleSettings(){
        setShowSettings(!showSettings);
    }

    function toggleFocusMode(){
        setFocusMode(!focusMode);
    }

    return(
        <>
            <div className={currentSessionNumber && nextSessionNumber === 1 ? "hidden" : "block"}>
                {pad(Math.floor(prevTimer/60))}:{pad(prevTimer%60)}
                {nextTimer !== 10 ? <span>Session {prevSessionNumber}</span> : <span>Rest {prevRestNumber}</span>}
            </div>
            <div>
                {pad(Math.floor(currentTimer/60))}:{pad(currentTimer%60)}
                {nextTimer === 10 ? <span>Session {currentSessionNumber}</span> : <span>Rest {currentRestNumber}</span>}
            </div>
            <div>
                {pad(Math.floor(nextTimer/60))}:{pad(nextTimer%60)}
                {nextTimer !== 10 ? <span>Session {nextSessionNumber}</span> : <span>Rest {nextRestNumber}</span>}
            </div>
            <div>
                <button onClick={toggleTimer} className={!focusMode ? "block" : "hidden"}>{isRunning ? 'Stop' : 'Start'}</button>
            </div>
            <div>
                <button onClick={resetTimer} className={showReset && !focusMode ? 'block' : 'hidden'}>Reset</button>
            </div>
            <div className={showPermission ? "block" : "hidden"}>
                <button onClick={Continue}>
                    Yes
                </button>
                <button onClick={notContinue}>
                    No
                </button>
            </div>
            <div>
                <button onClick={toggleSettings} className={!focusMode ? "block" : "hidden"}>Settings</button>
            </div>
            <div className={showSettings ? "block" : "hidden"}>
                <div>
                    <button onClick={inc}>+</button>
                </div>
                <div>
                    <button onClick={dec}>-</button>
                </div>
                <div>
                    <button onClick={toggleSettings}>X</button>
                </div>
            </div>

            <div>
                <button onClick={toggleFocusMode} className={!focusMode ? "block" : "hidden"}>Focus Mode</button>
            </div>
            <div>
                <button onClick={toggleFocusMode} className={focusMode ? "block" : "hidden"}>X</button>
            </div>


            <div className={!focusMode ? "block" : "hidden"}>
                <span>{quote}</span>
                <span> - {author}</span>
            </div>

        </>

    )
}
export default Timer;