import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const logoutHandler = () => {
    localStorage.removeItem("username");
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push("/");
  };

  return (
    <div className="relative flex h-[10vh] flex-row justify-between border-b-2 border-gray-200 px-16 py-[1.5rem] ">
      <div className="flex flex-row gap-32">
        <Image src="/logo/joyride.png" alt="Joyride" width={103} height={25} />
        <div className=" flex flex-row gap-8">
          <div className="text-joy-green">COMMUTE</div>
          <div>MY RIDES</div>
          <div>SETTINGS</div>
        </div>
      </div>
      <button onClick={logoutHandler} className=" text-joy-green">
        LOGOUT
      </button>
    </div>
  );
};

export default Navbar;
