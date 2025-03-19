import Link from "next/link";

const linkStyle = " rounded-sm px-3 py-1.5 text-slate-100 ";

const AuthLinks = () => {
  return (
    <div className="flex text-sm gap-1.5 items-center">
      <Link
        className={`${linkStyle} bg-green-800 hover:bg-green-900`}
        href={"/register"}
      >
        Register
      </Link>

      <Link
        className={`${linkStyle} bg-blue-600 hover:bg-blue-700`}
        href={"/login"}
      >
        Log in
      </Link>
    </div>
  );
};

export default AuthLinks;
