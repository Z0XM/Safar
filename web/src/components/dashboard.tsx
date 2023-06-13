import { api } from "@/utils/api";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import UserProfile from "./profile/user";
import { UserType } from "@prisma/client";
import DriverProfile from "./profile/driver";
import Image from "next/image";

const Dashboard = () => {
  const router = useRouter();

  const localStorageUserName =
    typeof window !== "undefined" ? localStorage.getItem("username") : null;
  const user = localStorageUserName
    ? api.user.get.useQuery(
        {
          username: localStorageUserName,
        },
        { refetchOnMount: false, refetchOnWindowFocus: false }
      )
    : null;

  if (!user || user.isLoading || user.isFetching) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Image
          className="animate-spin"
          src="/svg/loading-green.svg"
          alt="loading"
          width={50}
          height={50}
        />
      </div>
    );
  }

  if (user.isError || !user.data) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push("/");
    return <div>Error...</div>;
  }

  return (
    <div className="h-screen w-screen">
      <Navbar />
      {user.data.type === UserType.USER && <UserProfile />}
      {user.data.type === UserType.DRIVER && <DriverProfile />}
    </div>
  );
};
export default Dashboard;
