import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-3 px-5 flex justify-between items-center bg-white shadow-md text-black">
      <div className="flex items-center gap-6">
        <img
          src="/logoipsum-371.svg"
          width={70}
          height={70}
          alt="Logo"
          className="object-contain"
        />

        {/* Home Link as Text */}
       <Link
  to="/"
  className="
    relative
    flex
    items-center
    h-full
    text-black
    text-base
    font-semibold
    px-4
    cursor-pointer
    select-none
    transition-colors
    duration-300
    hover:text-zinc-700
  "
>
  Home
  <span
    className="
      absolute
      bottom-0
      left-0
      w-0
      h-[2px]
      bg-black
      transition-all
      duration-300
      group-hover:w-full
    "
  />
</Link>


      </div>

      <div className="flex gap-2 items-center">
        {/* Career Help Button */}
        <Link to="/dashboard/career-help">
          <Button
            className="bg-black text-white text-sm uppercase py-2 px-4 font-semibold transition duration-300 ease-in-out hover:bg-zinc-800 rounded-md"
          >
            Career Help
          </Button>
        </Link>

        {/* Conditional Rendering Based on User's Sign-in Status */}
        {isSignedIn ? (
          <div className="flex gap-2 items-center">
            <Link to="/dashboard">
              <Button
                variant="outline"
                className="border-black text-black text-lg hover:bg-gray-100"
              >
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <Link to="/auth/sign-in">
            <Button className="bg-black hover:bg-zinc-800 text-white">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
