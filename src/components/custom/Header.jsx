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
          className="fill-current text-black"
        />

        {/* Home Link as Text */}
        <Link
          to="/"
          className="text-black text-sm font-medium hover:underline hover:text-zinc-800 transition duration-200"
        >
          Home
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        {/* Career Help Button */}
        <Link to="/dashboard/career-help">
          <button
            className="bg-black text-white text-sm py-2 px-4 font-semibold uppercase transition duration-300 ease-in-out transform hover:bg-zinc-800 rounded-md"
          >
            Career Help
          </button>
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
