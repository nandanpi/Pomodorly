 import React from "react";
 import {GrGithub, GrInstagram, GrLinkedinOption} from "react-icons/gr";

const Footer = () => {
    return(
        <>
            <div className="pt-12 bottom-0">
                <div className="pt-7">
                    <div>
                        <ul className="flex justify-center space-x-6">
                            <li className="bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded-3xl p-2 hover:scale-110"><a
                                href="https://www.linkedin.com/in/nandan-pai-990a23252/" target="_blank" rel="noreferrer"><GrLinkedinOption size={25}/></a></li>
                            <li className="bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded-3xl p-2 hover:scale-110"><a
                                href="https://github.com/nandanpi" target="_blank" rel="noreferrer"><GrGithub size={25}/></a></li>
                            <li className="bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded-3xl p-2 hover:scale-110"><a
                                href="https://www.instagram.com/nandanpi__/" target="_blank" rel="noreferrer"><GrInstagram size={25}/></a></li>
                        </ul>
                    </div>
                    <p className="text-center p-3 text-gray-400 dark:text-gray-700">© 2023 Nandan R Pai. All Rights Reserved.</p>
                </div>
            </div>
        </>
    )
}
export default Footer;