import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Arrows = ({ pageFlow, customButtonText }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const defaultPageFlow = {
        '/testing': '/camera',
        '/camera': '/analysis',
        '/analysis': '/demographics',
        '/demographics': '/summary',
        '/summary': '/dashboard'
    };
    
    const defaultButtonText = {
        '/testing': 'Proceed',
        '/camera': '',
        '/analysis': 'Get Summary',
        '/demographics': 'Summary',
        '/summary': 'Dashboard'
    };
    
    const currentPageFlow = pageFlow || defaultPageFlow;
    const currentButtonText = customButtonText || defaultButtonText;
    
    const getNextRoute = () => {
        return currentPageFlow[location.pathname] || '/summary';
    };
    
    const getButtonText = () => {
        return currentButtonText[location.pathname] || '';
    };
    
    const handleForwardClick = () => {
        const nextRoute = getNextRoute();
        navigate(nextRoute);
    };
    
    return (
        <div>
            <div className="pt-4 md:pt-12 pb-8 bg-white sticky md:static bottom-40 mb-0 md:mb-0">
                <div className="flex justify-between max-w-full mx-auto px-13 md:px-9">
                    <button onClick={() => navigate(-1)}>
                        <div className="group hidden sm:flex flex-row relative justify-center items-center">
                            <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300">
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.9] rotate-12 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                                    ▶
                                </span>
                            </div>
                            <span className="text-sm font-semibold hidden sm:block ml-6 uppercase">
                                back
                            </span>
                        </div>
                    </button>

                    <button onClick={handleForwardClick}>
                        <div className="group hidden sm:flex flex-row relative justify-center items-center">
                            <span className="text-sm font-semibold hidden sm:block mr-5 uppercase">
                                {getButtonText()}
                            </span>
                            <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300">
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.9] -rotate-45 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                                    ▶
                                </span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Arrows;