import { auth, signOut, signIn } from "@/auth";
import Link from "next/link";
import React from "react";

async function Navbar() {
  const session = await auth();
  
  return (
    <header className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <img src="/logo.png" alt="logo" width={144} height={32} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <div className="flex items-center gap-5">
              <Link href={"/startup/create"} className="text-black-100 font-semibold">
                <span className="max-sm:hidden">Create</span>
                <span className="sm:hidden"><i className='bx bx-plus-circle text-3xl' ></i></span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                  <button type="submit" className="cursor-pointer max-sm:hidden text-primary font-semibold">LogOut</button>
                  <span className="sm:hidden"><i className='bx bx-log-out text-primary text-3xl'></i></span>
              </form>

              <Link href={`/user/${session.id}`}>
                <span>
                  <img src={session?.user.image} alt="avatar" width={46} height={46} className="rounded-full"/>
                </span>
              </Link>
            </div>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="cursor-pointer">
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
