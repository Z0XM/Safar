import { api } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

const Login: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleLogin = () => {
    if (!usernameRef.current) return;
    const username = usernameRef.current.value;
    localStorage.setItem("username", username);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push("/dashboard");
  };
  return (
    <main className="grid h-screen grid-cols-2 bg-joy-white text-joy-black">
      <div className="m-8 flex flex-col items-start justify-between rounded-xl bg-joy-green-l p-8 pb-0 ">
        <Image src="/logo/joyride.png" alt="logo" width={112} height={27} />
        <div className="mt-16 text-5xl font-[600]">
          Trying to change the ride experience
        </div>
        <div className="mt-4">
          With our user-friendly interface, it&rsquo;s easy to search for a
          ride, book a seat, and pay securely online.
        </div>
        <div className="mt-4 flex w-full justify-center">
          <Image src="/png/hero.png" alt="hero" width={437} height={409} />
        </div>
      </div>
      <div className="ml-[4rem] mr-[6rem] flex flex-col items-center justify-center gap-4">
        <div className="text-3xl font-[600]">Start the journey</div>
        <div className="">
          Hey, Enter details to get sign in to your account
        </div>
        <input
          ref={usernameRef}
          className="mt-8 w-full rounded-md border-2 border-gray-200 px-4 py-4"
          placeholder="Enter Username"
        />
        <button
          onClick={handleLogin}
          className="flex w-full flex-row items-center  justify-center gap-4 rounded-md bg-joy-green px-4 py-4 text-joy-white"
        >
          Get Started{" "}
          <Image
            src="/png/arrow-r.png"
            alt="right arrow"
            width={20}
            height={15}
          />
        </button>
      </div>
    </main>
  );
};

export default Login;
