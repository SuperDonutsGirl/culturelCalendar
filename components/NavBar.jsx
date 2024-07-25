// components/NavBar.tsx
"use client"
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';


export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800 p-2 flex text-white space-x-4 content-center justify-between h-[50px] ">
      <ul className="flex space-x-4 self-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <div className='text-2xl sefl-center'>Calendrier culturel</div>

      <ul className="flex space-x-4 self-center">

        {session ? (
              <>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li onClick={() => signOut()}>
                  Sign Out
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}
        
      </ul>
    </nav>
  );
}
