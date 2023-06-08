import React, {useState} from "react";
import {Link} from "react-router-dom";
const Navbar = () => {
    const [button,setButton] = useState(true);

    function toggleButton() {
        if(window.location.pathname === "/"){
            setButton(true);
        }
        else if(window.location.pathname === "/tasks"){
            setButton(false);
        }
    }

    return(
        <>
            <div className="sticky w-full z-[1000] top-0 bg-transparent ">
                <div className="bg-white dark:bg-black flex justify-center p-3">
                    <h1 className="text-black dark:text-white font-bold text-2xl md:text-3xl">Pomodorly</h1>
                </div>
                <div>
                    <div className="flex justify-center bg-white dark:bg-black py-2">
                        <ul className="flex space-x-3 bg-blue-200 p-2 rounded-full">
                            <li onClick={toggleButton} className={!button ? "p-2 text-sm md:text-lg" : "bg-black text-white rounded-full p-2 font-bold duration-200 text-sm md:text-lg"}><Link to="/">Pomodoro</Link></li>
                            <li onClick={toggleButton} className={button ? "p-2 text-sm md:text-lg" : "bg-black text-white rounded-full p-2 font-bold duration-200 text-sm md:text-lg"}><Link to="/tasks">Tasks</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )

}
export default Navbar;