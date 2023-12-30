"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session, status } = useSession();
  const [mobileNavDropDown, setMobileNavDropDown] = useState(false);
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setupProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={32}
          height={32}
          className="object-contain"
        />
        <p className="logo_text"> Promptopia </p>
      </Link>

      {console.log({ session })}
      {console.log({ providers })}
      {/* desktop nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <img
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile Image"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="outline_btn"
                >
                  Sign In with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <img
              src={session?.user?.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setMobileNavDropDown((prev) => !prev)}
            />

            {mobileNavDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setMobileNavDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setMobileNavDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-1 w-full black_btn"
                  onClick={() => {
                    setMobileNavDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(e);
                    signIn(provider.id);
                  }}
                  className="outline_btn"
                >
                  Sign In with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
