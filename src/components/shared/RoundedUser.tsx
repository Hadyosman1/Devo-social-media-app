"use client";

import { TypeJWTPayload } from "@/types";
import Image from "next/image";
import { useCallback, useState } from "react";
import Link from "next/link";
import SmallLoadingIndicator from "./SmallLoadingIndicator";
import { useRouter } from "next/navigation";
import { userLogOut } from "@/services/auth";
import { toast } from "react-toastify";
import { DropDown } from "./DropDown";
import EditUserBtn from "../profile/EditUserBtn";

//icons
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

type TProps = {
  user: TypeJWTPayload | null;
};

const RoundedUser = ({ user }: TProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const logOutHandler = async () => {
    setIsLoading(true);
    const res = await userLogOut();
    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    toast.success(res.message);
    router.replace("/");
    closeDropDown();
    router.refresh();
  };

  const closeDropDown = useCallback(() => {
    setIsDropDownOpen(false);
  }, []);

  return (
    <div className="flex justify-end text-sm gap-2.5 items-center ms-auto self-stretch">
      <div className="relative">
        <button
          onClick={() => setIsDropDownOpen((prev) => !prev)}
          className="align-middle rounded-full relative"
        >
          <Image
            className="bg-slate-100 border rounded-full shadow-sm w-12 aspect-square hover:shadow-inner object-cover object-top"
            src={user?.profilePicture ?? "/anonymous_user.svg"}
            alt={user?.userName ?? "user"}
            width={48}
            height={48}
            priority={true}
            sizes="(min-width: 0px) 48px"
            // quality={100}
            // unoptimized
          />

          <span className="bg-slate-100 border p-0.5 rounded-full shadow-md text-slate-700 text-sm absolute bottom-0 right-0 translate-y-0.5">
            {!isDropDownOpen ? <MdExpandMore /> : <MdExpandLess />}
          </span>
        </button>

        <DropDown
          position="bottom-left"
          closeDropDown={closeDropDown}
          isOpen={isDropDownOpen}
        >
          <DropDown.Header>{user?.userName}</DropDown.Header>

          <hr />

          <DropDown.Item onClick={closeDropDown} href={"/profile"} as={Link}>
            <FaCircleUser /> Profile
          </DropDown.Item>

          {user && <EditUserBtn user={user} inDropDown={true} />}

          <button
            disabled={isLoading}
            onClick={logOutHandler}
            className={`logout-btn flex items-center gap-1 whitespace-nowrap rounded-sm bg-red-700/80 px-3 py-1 text-slate-100 transition-all hover:bg-red-800/80 hover:indent-1`}
          >
            {isLoading ? <SmallLoadingIndicator size="sm" /> : <FaSignOutAlt />}{" "}
            Log out
          </button>
        </DropDown>
      </div>
    </div>
  );
};

export default RoundedUser;
