/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { api } from "@/utils/api";
import Map from "../Map";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Star from "@/utils/star";

const UserProfile = () => {
  const router = useRouter();
  const [timingState, setTimingState] = useState<"now" | "later">("now");
  const [paymentState, setPaymentState] = useState<
    "drop" | "phonepay" | "cash" | "wallet"
  >("cash");

  const [showRides, setShowRides] = useState<boolean>(false);
  const [rideState, setRideState] = useState<{
    carImg: string;
    caption: string;
    title: string;
  }>({
    carImg: "/svg/car.svg",
    title: "Joy Cab",
    caption: "Use this rides for you need upto 4 seats",
  });
  const [bookingState, setBookingState] = useState<
    "searching" | "booking" | "onway" | "journey" | "review" | "final"
  >("searching");

  const [timeoutState, setTimeoutState] = useState<
    NodeJS.Timeout | undefined
  >();

  const pickRef = useRef<HTMLInputElement>(null);
  const destRef = useRef<HTMLInputElement>(null);

  const chatRef = useRef<HTMLInputElement>(null);

  const [mapSearch, setMapSearch] = useState("Signature Brigade, Bangalore");
  const [mapMode, setMapMode] = useState<"search" | "directions">("search");

  const [showChat, setShowChat] = useState<boolean>(false);
  const [chats, setChats] = useState<
    { msg: string; self: boolean; translation?: string }[]
  >([
    {
      msg: "Hello, sir. I am on my way to pick you up at the address",
      self: false,
    },
    {
      msg: "Hello! okay. I am waiting for you at the pickup location.",
      self: true,
    },
  ]);
  const [translateState, setTranslateState] = useState<boolean>(false);

  const [starStates, setStarStates] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [myReview, setMyReview] = useState<string>("");

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

  const chatTranslate = api.google.chats.useQuery({
    chats: chats.map((v) => v.msg),
  });

  const reviews = api.google.rating.useQuery(
    { message: myReview },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const reviewJSON = reviews.data
    ? reviews.data
    : {
        scores: ["pos", "pos", "pos"],
        similar_message: "Similar Test",
        top_3_comments: ["Test Comment", "Test Comment", "Test Comment"],
      };

  return (
    <main className="flex h-[90vh] w-screen flex-row text-sm">
      {bookingState !== "review" && bookingState !== "final" && (
        <div className="flex w-[40vw] flex-col gap-8 overflow-y-scroll border-r-2 border-r-gray-200 p-8">
          <div className="">
            <div className="mb-2 ml-4 w-full text-joy-green">Trip Details</div>
            <div className="flex w-full flex-col gap-4 rounded-lg border-2 border-gray-200 p-4">
              <div className="flex w-full flex-col">
                <div className="mb-2 w-full text-xs text-gray-400">
                  Pickup Address
                </div>
                <div className="flex w-full flex-row justify-between gap-4">
                  <input
                    disabled={bookingState !== "searching"}
                    ref={pickRef}
                    className="w-full rounded-md border-2 border-gray-200 px-2 py-1 focus:outline-joy-green"
                  />
                  <button
                    disabled={bookingState !== "searching"}
                    onClick={() => {
                      if (!pickRef.current) return;
                      setMapMode("search");
                      setMapSearch(pickRef.current.value);
                    }}
                  >
                    <Image
                      src="/svg/gps.svg"
                      alt="gps"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
              <div className="flex w-full flex-col">
                <div className="mb-2 w-full text-xs text-gray-400">
                  Destination Address
                </div>
                <div className="flex w-full flex-row justify-between gap-4">
                  <input
                    disabled={bookingState !== "searching"}
                    ref={destRef}
                    className="w-full rounded-md border-2 border-gray-200 px-2 py-1 focus:outline-joy-green"
                  />
                  <button
                    disabled={bookingState !== "searching"}
                    onClick={() => {
                      if (!destRef.current) return;
                      setMapMode("directions");
                      setMapSearch(destRef.current.value);
                    }}
                  >
                    <Image
                      src="/svg/gps.svg"
                      alt="gps"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-2 ml-4 text-joy-green">Select a ride type</div>
            <div className="relative rounded-lg border-2 border-gray-200 bg-joy-white">
              <div className="flex flex-row justify-between p-4 ">
                <div className="flex flex-row gap-4">
                  <Image
                    src={rideState.carImg}
                    alt="car"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <div>{rideState.title}</div>
                    <div className="text-xs text-gray-400">
                      {rideState.caption}
                    </div>
                  </div>
                </div>
                <button
                  disabled={bookingState !== "searching"}
                  onClick={() => {
                    setShowRides((_) => !_);
                  }}
                >
                  <Image
                    className={`${
                      showRides ? "rotate-180" : ""
                    } rounded-full p-1 transition-[transform] duration-300 hover:border-2 hover:border-joy-green`}
                    src="/svg/arrow-d.svg"
                    alt="r"
                    width={25}
                    height={25}
                  />
                </button>
              </div>

              {showRides && (
                <div className="t-[100%] absolute z-10 flex w-full flex-col gap-4 rounded-lg border-2 border-gray-200 bg-joy-white p-4">
                  {[
                    {
                      carImg: "/svg/car.svg",
                      title: "Joy Cab",
                      caption: "Use this rides for you need upto 4 seats",
                    },
                    {
                      carImg: "/png/auto.png",
                      title: "Joy Auto",
                      caption: "Use this rides for you need upto 3 seats",
                    },
                    {
                      carImg: "/png/suv.png",
                      title: "Joy SUV",
                      caption: "Use this rides for you need upto 7 seats",
                    },
                  ]
                    .filter((v) => v.title !== rideState.title)
                    .map((v, i) => {
                      return (
                        <button
                          disabled={bookingState !== "searching"}
                          onClick={() => {
                            setRideState(v);
                            setShowRides(false);
                          }}
                          key={i}
                          className="group flex flex-row justify-between"
                        >
                          <div className="flex flex-row gap-4">
                            <Image
                              src={v.carImg}
                              alt="car"
                              width={40}
                              height={40}
                            />
                            <div className=" flex flex-col items-start">
                              <div className="group-hover:font-bold group-hover:text-joy-green">
                                {v.title}
                              </div>
                              <div className="text-xs text-gray-400">
                                {v.caption}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
          {bookingState === "searching" && (
            <div className="">
              <div className="mb-2 ml-4 text-joy-green">Select timings</div>
              <div className="flex w-full flex-row justify-between gap-4">
                <div className="flex flex-1 flex-row justify-between rounded-lg border-2 border-gray-200 p-4">
                  <div className="flex flex-col">
                    <div>Book it right away</div>
                    <div className="text-xs text-gray-400">
                      Pickup in 6 minutes
                    </div>
                  </div>
                  <input
                    disabled={bookingState !== "searching"}
                    onChange={() => {
                      setTimingState("now");
                    }}
                    checked={timingState === "now"}
                    type="checkbox"
                    className="w-[1rem] rounded-lg"
                  />
                </div>
                <div className="flex flex-1 flex-row justify-between rounded-lg border-2 border-gray-200 p-4">
                  <div className="flex flex-col">
                    <div>Schedule for later</div>
                    <div className="text-xs text-gray-400">
                      30 April 2023 5:00 PM
                    </div>
                  </div>
                  <input
                    disabled={bookingState !== "searching"}
                    onChange={() => {
                      setTimingState("later");
                    }}
                    checked={timingState === "later"}
                    type="checkbox"
                    className="w-[1rem] rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="">
            <div className="mb-2 ml-4 text-joy-green">Payment Details</div>
            <div className="flex flex-row gap-4 rounded-lg border-2 border-gray-200 p-4">
              <div className="flex w-full flex-col">
                <div className="mb-1">
                  Your fair for the ride is
                  <span className="font-bold text-joy-green"> ₹164</span>
                </div>
                <div className="text-xs text-gray-400">
                  Select payment method
                </div>
                <div className="flex w-full flex-row items-center gap-8">
                  <div className="flex flex-row items-center gap-2">
                    <input
                      disabled={bookingState !== "searching"}
                      onChange={() => {
                        setPaymentState("drop");
                      }}
                      checked={paymentState === "drop"}
                      name="pay-at-drop"
                      type="checkbox"
                      className="w-[1rem] rounded-lg"
                    />
                    <label htmlFor="pay-at-drop">Pay at drop</label>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <input
                      disabled={bookingState !== "searching"}
                      onChange={() => {
                        setPaymentState("phonepay");
                      }}
                      checked={paymentState === "phonepay"}
                      name="phonepay"
                      type="checkbox"
                      className="w-[1rem] rounded-lg"
                    />
                    <label htmlFor="phonepay">PhonePay</label>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <input
                      disabled={bookingState !== "searching"}
                      onChange={() => {
                        setPaymentState("cash");
                      }}
                      checked={paymentState === "cash"}
                      name="Cash"
                      type="checkbox"
                      className="w-[1rem] rounded-lg"
                    />
                    <label htmlFor="Cash">Cash</label>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <input
                      disabled={bookingState !== "searching"}
                      onChange={() => {
                        setPaymentState("wallet");
                      }}
                      checked={paymentState === "wallet"}
                      name="joywallet"
                      type="checkbox"
                      className="w-[1rem] rounded-lg"
                    />
                    <label htmlFor="joywallet">JoyWallet</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {bookingState === "onway" && (
            <div className="">
              <div className="flex flex-row justify-between gap-4 rounded-lg border-2 border-gray-200 p-4">
                <div>Your ride is on the way</div>
                <div className="text-joy-green">ETA 15 mins</div>
              </div>
            </div>
          )}
          {bookingState === "journey" && (
            <div className="">
              <div className="flex flex-row justify-between gap-4 rounded-lg border-2 border-gray-200 p-4">
                <div>On journey, reaching destination soon</div>
                <div className="text-joy-green">ETA 15 mins</div>
              </div>
            </div>
          )}
          {bookingState !== "journey" && (
            <button
              onClick={() => {
                if (bookingState === "searching") {
                  if (!pickRef.current?.value || !destRef.current?.value)
                    return;
                  setBookingState("booking");
                  setTimeoutState(
                    setTimeout(() => {
                      setBookingState("onway");
                      setTimeoutState(
                        setTimeout(() => {
                          setBookingState("journey");
                          setTimeoutState(
                            setTimeout(() => {
                              setShowChat(false);
                              setBookingState("review");
                            }, 20000)
                          );
                        }, 20000)
                      );
                    }, 10000)
                  );
                  return;
                } else if (bookingState === "booking") return;
                else if (bookingState === "onway") {
                  clearInterval(timeoutState);
                  setShowChat(false);
                  setBookingState("searching");
                }
              }}
              className="flex w-full flex-row items-center justify-center gap-4 rounded-lg bg-joy-green px-4 py-4 text-joy-white"
            >
              {bookingState === "searching" && <div>Book your Joy ride</div>}
              {bookingState === "booking" && <div>Searching...</div>}
              {bookingState === "onway" && <div>Cancel JoyRide</div>}
              {bookingState === "searching" ||
                (bookingState === "onway" && (
                  <Image
                    src="/png/arrow-r.png"
                    alt="right arrow"
                    width={15}
                    height={10}
                  />
                ))}
              {bookingState === "booking" && (
                <Image
                  className="animate-spin"
                  src="/svg/loading-white.svg"
                  alt="loading"
                  width={15}
                  height={15}
                />
              )}
            </button>
          )}
        </div>
      )}
      {bookingState === "review" && (
        <div className="flex w-[40vw] flex-col gap-8 overflow-y-scroll border-r-2 border-r-gray-200 p-8">
          <div>
            <div className="text-4xl font-bold text-joy-green">
              Journey Complete!
            </div>
            <div className="mt-4 text-gray-400">
              You have arrived at your destination
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex-1 rounded-lg border-2 border-gray-200 p-4">
              Your fair for the ride is{" "}
              <span className="font-bold text-joy-green">₹164</span>
            </div>
            <div className="flex flex-row items-center justify-center gap-4 rounded-lg bg-joy-green px-8 py-4">
              <div className="text-joy-white">Pay Now </div>
              <Image
                src="/png/arrow-r.png"
                alt="right arrow"
                width={15}
                height={10}
              />
            </div>
          </div>
          <div className="">
            <div className="mb-2 ml-4 w-full text-joy-green">
              Rate the journey
            </div>
            <div className="flex flex-row justify-between rounded-lg border-2 border-gray-200 p-4">
              <div className="flex flex-col">
                <div className="font-bold">How was your experience ? </div>
                <div className="text-xs">
                  Please leave a rating and a review. It would help a lot
                </div>
              </div>
              <div className="flex flex-row">
                <button
                  onClick={() =>
                    setStarStates((old) => [
                      !old[0]!,
                      old[1]!,
                      old[2]!,
                      old[3]!,
                      old[4]!,
                    ])
                  }
                >
                  <Star fill={starStates[0]!} />
                </button>
                <button
                  onClick={() =>
                    setStarStates((old) => [
                      true,
                      !old[1]!,
                      old[2]!,
                      old[3]!,
                      old[4]!,
                    ])
                  }
                >
                  <Star fill={starStates[1]!} />
                </button>
                <button
                  onClick={() =>
                    setStarStates((old) => [
                      true,
                      true,
                      !old[2]!,
                      old[3]!,
                      old[4]!,
                    ])
                  }
                >
                  <Star fill={starStates[2]!} />
                </button>
                <button
                  onClick={() =>
                    setStarStates((old) => [
                      true,
                      true,
                      true,
                      !old[3]!,
                      old[4]!,
                    ])
                  }
                >
                  <Star fill={starStates[3]!} />
                </button>
                <button
                  onClick={() =>
                    setStarStates((old) => [true, true, true, true, !old[4]!])
                  }
                >
                  <Star fill={starStates[4]!} />
                </button>
              </div>
            </div>
            <input
              className="mt-4 w-full rounded-lg border-2 border-gray-200 p-4 focus:outline-joy-green"
              placeholder="Write your review"
              value={myReview}
              onChange={(e) => {
                e.preventDefault();
                setMyReview(e.target.value);
              }}
            />
            <button
              onClick={() => {
                clearTimeout(timeoutState);
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                reviews.refetch();
                setBookingState("final");
              }}
              className="mt-8 flex w-full flex-row items-center justify-center gap-4 rounded-lg bg-joy-green px-4 py-4 text-joy-white"
            >
              Submit
              <Image
                src="/png/arrow-r.png"
                alt="right arrow"
                width={15}
                height={10}
              />
            </button>
          </div>
        </div>
      )}
      {bookingState === "final" && reviews.data && (
        <div className="flex w-[40vw] flex-col overflow-y-scroll border-r-2 border-r-gray-200 p-8">
          <div className="mb-4 text-3xl text-joy-green">
            Driver&apos;s Rating
          </div>
          <div className="mb-2 ml-4  mt-4 text-joy-green">My Review</div>
          <div className="flex flex-row justify-between rounded-lg border-2 border-gray-200 p-4">
            {myReview}
          </div>
          <div className="mb-2 ml-4 mt-4 text-joy-green">Similar Reviews</div>
          <div className="flex flex-row justify-between rounded-lg border-2 border-gray-200 p-4">
            {reviewJSON.similar_message}
          </div>
          <div className="mb-2 ml-4 mt-4 text-joy-green">Similar Reviews</div>
          <div className="flex flex-col gap-4 ">
            <div
              className={`flex flex-row justify-between rounded-lg border-2 border-gray-200 p-4 ${
                reviewJSON.scores[0] === "neg" ? "text-red" : "text-joy-green"
              }`}
            >
              {reviewJSON.top_3_comments[0]}
            </div>
            <div
              className={`flex flex-row justify-between rounded-lg border-2 border-gray-200 p-4 ${
                reviewJSON.scores[1] === "neg" ? "text-red" : "text-joy-green"
              }`}
            >
              {reviewJSON.top_3_comments[1]}
            </div>
            <div
              className={`flex flex-row justify-between rounded-lg border-2 border-gray-200 p-4 ${
                reviewJSON.scores[2] === "neg" ? "text-red" : "text-joy-green"
              }`}
            >
              {reviewJSON.top_3_comments[2]}
            </div>
          </div>
          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              setBookingState("searching");
            }}
            className="mt-8 flex w-full flex-row items-center justify-center gap-4 rounded-lg bg-joy-green px-4 py-4 text-joy-white"
          >
            Continue
            <Image
              src="/png/arrow-r.png"
              alt="right arrow"
              width={15}
              height={10}
            />
          </button>
        </div>
      )}
      <div className="relative w-[60vw]">
        {bookingState === "booking" && (
          <div className="absolute bottom-0 z-10 flex w-full flex-col items-center justify-center border-t-2 border-t-gray-200 bg-joy-white px-8 py-16">
            <Image
              className="animate-spin"
              src="/svg/loading-green.svg"
              alt="loading"
              width={25}
              height={25}
            />
            <div className="mt-4 text-3xl text-joy-green">
              Searching your JoyRide...
            </div>
            <div className="text-gray-400">
              Please wait while we find a comfortable ride for you
            </div>
            <button
              onClick={() => {
                clearInterval(timeoutState);
                setShowChat(false);
                setBookingState("searching");
              }}
              className="mt-4 flex flex-row items-center justify-center gap-4 rounded-lg bg-joy-green  px-16 py-4 text-joy-white"
            >
              Cancel
            </button>
          </div>
        )}
        {(bookingState === "onway" || bookingState === "journey") && (
          <div className="absolute top-0 z-10 flex w-full flex-col  justify-center border-b-2 border-b-gray-200 bg-joy-white px-8 py-8">
            <div className=" text-joy-green">Ride Information</div>
            <div className="mt-4 flex w-full flex-row justify-between gap-4">
              <div className="relative flex flex-row  gap-4">
                <Image
                  src="/png/driver-photo.png"
                  alt="driver"
                  width={60}
                  height={60}
                />
                <div className=" flex flex-col">
                  <div>Naruto Uzumaki</div>
                  <div className="text-xs text-gray-400">
                    102 trips with JoyRide
                  </div>
                </div>
              </div>
              <div className="relative flex flex-row  gap-4">
                <Image
                  src="/png/driver-car.png"
                  alt="driver"
                  width={60}
                  height={60}
                />
                <div className="flex flex-col">
                  <div>Leyland Mini - Green</div>
                  <div className="text-xs text-gray-400">KA 69 EH 9999</div>
                </div>
              </div>
              <div className="flex flex-row justify-center gap-4">
                <div className="mr-16 flex flex-col items-center justify-evenly gap-2">
                  <div className="text-4xl text-joy-green">4.3</div>
                  <div>Rating</div>
                </div>
                <div className="flex flex-col items-center justify-evenly  ">
                  <Link href="https://tarunjain0751-joyride-app-vd5ywa.streamlit.app/">
                    <Image
                      src="/svg/user-icon.svg"
                      alt="user"
                      width={25}
                      height={25}
                    />
                  </Link>
                  <div className="text-xs text-gray-400">Profile</div>
                </div>
                <div className="flex flex-col items-center justify-evenly  ">
                  <Image
                    src="/svg/call.svg"
                    alt="user"
                    width={25}
                    height={25}
                  />
                  <div className="text-xs text-gray-400">Call</div>
                </div>
                <div className="flex flex-col items-center justify-evenly  ">
                  <button
                    onClick={() => {
                      setShowChat((_) => !_);
                    }}
                  >
                    <Image
                      src="/svg/chat.svg"
                      alt="user"
                      width={25}
                      height={25}
                    />
                  </button>
                  <div className="text-xs text-gray-400">Chat</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!showChat && (
          <Map
            mode={
              bookingState === "onway"
                ? "rider"
                : bookingState === "journey"
                ? "journey"
                : mapMode
            }
            origin={pickRef.current?.value.replaceAll(" ", "%20") ?? ""}
            destination={destRef.current?.value.replaceAll(" ", "%20") ?? ""}
            search={mapSearch.replaceAll(" ", "%20")}
          />
        )}

        {showChat && (
          <div className="absolute bottom-0 z-10 flex w-full flex-col gap-4 p-8">
            {chats.map((v, i) => {
              return (
                <div
                  key={i}
                  className={`flex w-full ${
                    v.self ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`w-[70%] rounded-lg border-2 ${
                      v.self ? "border-joy-green" : "border-gray-200"
                    } p-4`}
                  >
                    {translateState ? v.translation : v.msg}
                  </div>
                </div>
              );
            })}

            <div className="mt-8 flex flex-row rounded-lg border-2 border-gray-200 focus:border-joy-green">
              <input
                ref={chatRef}
                className="h-full w-full flex-1 rounded-lg border-none p-4 outline-none focus:border-joy-green"
                placeholder="Type your message here"
              />
              <button
                onClick={() => {
                  if (chatRef.current?.value) {
                    setChats((old) => {
                      return [
                        ...old,
                        { msg: chatRef.current?.value || "Z0XM", self: true },
                      ];
                    });
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    chatTranslate.refetch();
                  }
                }}
              >
                <Image
                  src="/svg/msg.svg"
                  alt="send"
                  className="mr-8"
                  width={22}
                  height={22}
                />
              </button>
              <button
                onClick={() => {
                  setTranslateState((_) => !_);
                  if (!chatTranslate.data) return;
                  setChats((old) => {
                    return old.map((v, i) => {
                      return { ...v, translation: chatTranslate.data[i] };
                    });
                  });
                }}
              >
                <Image
                  src="/png/translate.png"
                  alt="send"
                  className="mr-8"
                  width={22}
                  height={22}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default UserProfile;
