import Link from "next/link";
import AuthLinks from "./AuthLinks";
import NavBar from "./NavBar";
import RoundedUser from "@/components/shared/RoundedUser";

import { TypeJWTPayload } from "@/types";

const Header = ({ user }: { user: TypeJWTPayload | null }) => {
  return (
    <header className="bg-white/50 shadow shadow-sky-200 bg_glassy sticky top-0 z-[999]">
      <div className="container flex justify-between gap-3 items-center main-props py-2">
        <div className="justify-start hidden items-center md:basis-1/5 md:flex">
          <Link href="/">
            <h1 className="flex h-[55px] text-2xl text-slate-700 font-extrabold items-center">
              DE<span className="text-blue-600">V</span>O
            </h1>
          </Link>
        </div>

        <NavBar user={user} />
        
        <div className="flex justify-end items-center md:basis-1/5">
          {!user ? <AuthLinks /> : <RoundedUser user={user} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
