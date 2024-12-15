"use client";

import Link from "next/link";
import Image from "next/image";
import LogoWhite from "/public/ngivent-logo.png";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react"; // Import session hooks from next-auth

const NavBar = () => {
    const [isClick, setIsClick] = useState(false);
    const { data: session } = useSession(); // Get session data
    const toggleNavbar = () => setIsClick(!isClick);

    return (
        <>
            <nav className="bg-green-800">
                <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 bg-[#132620]">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex shrink-0">
                                <Image src={LogoWhite} width={60} height={60} alt="logo" />
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center space-x-4 ">
                                <Link href="/" className="text-white hover:bg-white hover:text-[#232323] rounded-lg p-2 ease-in-out duration-300 transition">Home</Link>
                                
                                {/* Show "Create Event" only if the role is ORGANIZER */}
                                {session?.user.roles?.includes("ORGANIZER") && (
                                    <Link href="/register/organizer" className="text-white hover:bg-white hover:text-[#232323] rounded-lg p-2 ease-in-out duration-300 transition">Create Event</Link>
                                )}
                                
                                {/* Show Login/Register if not logged in */}
                                {!session && (
                                    <>
                                        <Link href="/login" className="text-white hover:bg-white hover:text-[#232323] rounded-lg p-2 ease-in-out duration-300 transition">Login</Link>
                                        <Link href="/register" className="text-white hover:bg-white hover:text-[#232323] rounded-lg p-2 ease-in-out duration-300 transition">Register</Link>
                                    </>
                                )}

                                {/* Show Logout button if logged in */}
                                {session && (
                                    <button
                                        onClick={() => signOut()}
                                        className="text-white hover:bg-white hover:text-[#232323] rounded-lg p-2 ease-in-out duration-300 transition"
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>
                        </div>
                        <button
                            className="md:hidden inline-flex items-center justify-center p-2 text-white hover:text-white "
                            onClick={toggleNavbar}
                        >
                            {isClick ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className={`md:hidden ${isClick ? "block" : "hidden"}`}>
                    <Link href="/" className="block text-white hover:bg-white hover:text-[#232323] rounded-lg p-2">Home</Link>
                    
                    {/* Show "Create Event" only if the role is ORGANIZER */}
                    {session?.user.roles?.includes("ORGANIZER") && (
                        <Link href="/register/organizer" className="block text-white hover:bg-white hover:text-[#232323] rounded-lg p-2">Create Event</Link>
                    )}
                    
                    {/* Show Login/Register if not logged in */}
                    {!session && (
                        <>
                            <Link href="/login" className="block text-white hover:bg-white hover:text-[#232323] rounded-lg p-2">Login</Link>
                            <Link href="/register" className="block text-white hover:bg-white hover:text-[#232323] rounded-lg p-2">Register</Link>
                        </>
                    )}

                    {/* Show Logout button if logged in */}
                    {session && (
                        <button
                            onClick={() => signOut()}
                            className="block text-white hover:bg-white hover:text-[#232323] rounded-lg p-2"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavBar;
