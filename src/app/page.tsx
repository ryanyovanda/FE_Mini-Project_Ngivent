"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import NavBar from "./component/Navbar";


export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log(session);
    }
  }, [session]);
  return (
    <>
    <NavBar/>
    {session?.user.email}
    </>
  )
}