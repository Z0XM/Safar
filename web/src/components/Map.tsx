import { api } from "@/utils/api";
import Image from "next/image";

const Map = ({
  search,
  mode,
  origin,
  destination,
}: {
  mode: "search" | "directions" | "rider" | "journey";
  search: string;
  origin: string;
  destination: string;
}) => {
  if (mode === "search") {
    const searchResult = api.google.search.useQuery(
      {
        search,
      },
      { refetchOnMount: false, refetchOnWindowFocus: false }
    );
    if (!searchResult.data)
      return (
        <div className="flex h-full w-full items-center justify-center">
          <Image
            className="animate-spin"
            src="/svg/loading-green.svg"
            alt="loading"
            width={50}
            height={50}
          />
        </div>
      );
    return (
      <iframe
        className="h-full w-full border-none"
        loading="lazy"
        src={searchResult.data}
      ></iframe>
    );
  } else if (mode === "directions" || mode === "journey") {
    const route = api.google.route.useQuery(
      {
        origin: origin,
        destination: destination,
      },
      { refetchOnMount: false, refetchOnWindowFocus: false }
    );
    if (!route.data)
      return (
        <div className="flex h-full w-full items-center justify-center">
          <Image
            className="animate-spin"
            src="/svg/loading-green.svg"
            alt="loading"
            width={50}
            height={50}
          />
        </div>
      );
    return (
      <iframe
        className="h-full w-full border-none"
        loading="lazy"
        src={route.data}
      ></iframe>
    );
  } else if (mode === "rider") {
    const route = api.google.ride.useQuery(
      {
        origin: destination,
      },
      { refetchOnMount: false, refetchOnWindowFocus: false }
    );
    if (!route.data)
      return (
        <div className="flex h-full w-full items-center justify-center">
          <Image
            className="animate-spin"
            src="/svg/loading-green.svg"
            alt="loading"
            width={50}
            height={50}
          />
        </div>
      );
    return (
      <iframe
        className="h-full w-full border-none"
        loading="lazy"
        src={route.data}
      ></iframe>
    );
  }
  return <div>Error...</div>;
};

export default Map;
