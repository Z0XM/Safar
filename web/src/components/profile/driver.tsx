import Image from "next/image";
import Link from "next/link";

const DriverProfile = () => {
  return (
    <main className="flex h-[90vh] w-screen flex-row text-sm">
      <div className="flex w-[40vw] flex-col gap-8 overflow-y-scroll border-r-2 border-r-gray-200 p-8">
        <div className="">
          <div className="mb-2 ml-4 text-joy-green">My Details</div>
          <div className="flex w-full flex-row justify-between gap-4">
            <div className="flex flex-1 flex-row items-center rounded-lg border-2 border-gray-200 p-4">
              <Image
                src="/png/driver-photo.png"
                alt="driver"
                width={94}
                height={94}
              />
              <div className="ml-8 flex flex-1 flex-col">
                <div>Naruto Uzumaki</div>
                <div className="text-xs text-gray-400">
                  Your account has been verified
                </div>
              </div>
              <div className="flex flex-row justify-center gap-4">
                <div className="flex flex-col items-center justify-evenly gap-2">
                  <div className="text-4xl text-joy-green">4.3</div>
                  <div>Rating</div>
                </div>
                <div className="flex flex-col items-center justify-evenly gap-2 ">
                  <Link href="https://tarunjain0751-joyride-app-vd5ywa.streamlit.app/">
                    <Image
                      src="/svg/user-icon.svg"
                      alt="user"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <div>Profile</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="mb-2 ml-4 text-joy-green">Earnings</div>
          <div className="flex w-full flex-row justify-between gap-4">
            <div className="flex flex-1 flex-row items-center justify-between rounded-lg border-2 border-gray-200 p-4">
              <div>
                Total Earnings{" "}
                <span className="font-bold text-joy-green">₹2400</span>
              </div>
              <div>
                Debited Money{" "}
                <span className="font-bold text-joy-green">₹1600</span>
              </div>
              <div>
                Remaining Earnings{" "}
                <span className="font-bold text-joy-green">₹800</span>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="mb-2 ml-4 text-joy-green">My Details</div>
          <div className="flex w-full flex-row justify-between gap-4">
            <div className="flex flex-1 flex-row items-center rounded-lg border-2 border-gray-200 p-4">
              <Image
                src="/png/driver-car.png"
                alt="driver"
                width={94}
                height={94}
              />
              <div className="ml-8 flex flex-1 flex-col">
                <div>Leyland Mini - Green</div>
                <div className="text-xs text-gray-400">KA 69 EH 9999</div>
              </div>
              <div className="flex flex-col items-center justify-evenly gap-2">
                <div className="text-4xl text-joy-green">75</div>
                <div>Total Rides</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row justify-between gap-4">
          <div>
            <div className="mb-2 ml-4 text-joy-green">Earnings</div>
            <div className="flex w-full flex-row justify-between gap-4">
              <div className="flex flex-1 flex-row items-center justify-between gap-4 rounded-lg border-2 border-gray-200 p-4">
                <div>
                  Basic Fair{" "}
                  <span className="font-bold text-joy-green">₹20</span>
                </div>
                <div>
                  Per Km <span className="font-bold text-joy-green">₹12</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-2 ml-4 text-joy-green">Availablity</div>
            <div className="flex w-full flex-row justify-between gap-4">
              <div className="flex flex-1 flex-row items-center justify-between gap-4 rounded-lg border-2 border-gray-200 p-4">
                <div>Monday-Friday</div>
                <div>8:00 AM - 9:00</div>
              </div>
            </div>
          </div>
        </div>
        <button className="flex w-full flex-row items-center justify-center gap-4 rounded-lg bg-joy-green px-4 py-4 text-joy-white">
          <div>Let&apos;s joy ride</div>
          <Image
            src="/png/arrow-r.png"
            alt="right arrow"
            width={15}
            height={10}
          />
        </button>
      </div>
      <div className="flex w-[60vw] flex-col">
        <div className="h-[50%] overflow-x-auto overflow-y-hidden border-b-2 border-b-gray-200 p-8">
          <div className="text-joy-green">Verified documents</div>
          <div className="mt-4 flex flex-row justify-evenly">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/png/driving-license.png"
                alt="driving"
                width={140}
                height={240}
                className="flex-1"
              />
              <div>Driving License</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/png/insurance.png"
                alt="driving"
                width={140}
                height={240}
                className="flex-1"
              />
              <div>Insurance Report</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/png/aadhar.png"
                alt="driving"
                width={140}
                height={240}
                className="flex-1"
              />
              <div>Aadhar Card</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/png/motor.png"
                alt="driving"
                width={140}
                height={240}
                className="flex-1"
              />
              <div>Motor Vehicle Record</div>
            </div>
          </div>
        </div>
        <div className="h-[50%] overflow-y-auto p-8">
          <div className="mb-4 text-joy-green">Previous rides</div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between rounded-lg border-2 border-gray-200 p-4">
              <div className="flex flex-col items-start">
                <div>Shahrukh Khan </div>
                <div className="text-xs text-gray-400">
                  Mannat house, Bandra West - MoMo cafe, Andheri West...
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div>Total distance - 12 km</div>
                <div className="text-xs text-gray-400">
                  Time travelled in 45 mins
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-joy-green">₹360</div>
                <div className="text-xs text-gray-400">Ride fare</div>
              </div>
            </div>
            <div className="flex flex-row justify-between rounded-lg border-2 border-gray-200 p-4">
              <div className="flex flex-col items-start">
                <div>Shahrukh Khan </div>
                <div className="text-xs text-gray-400">
                  Mannat house, Bandra West - MoMo cafe, Andheri West...
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div>Total distance - 12 km</div>
                <div className="text-xs text-gray-400">
                  Time travelled in 45 mins
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-joy-green">₹360</div>
                <div className="text-xs text-gray-400">Ride fare</div>
              </div>
            </div>
            <div className="flex flex-row justify-between rounded-lg border-2 border-gray-200 p-4">
              <div className="flex flex-col items-start">
                <div>Shahrukh Khan </div>
                <div className="text-xs text-gray-400">
                  Mannat house, Bandra West - MoMo cafe, Andheri West...
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div>Total distance - 12 km</div>
                <div className="text-xs text-gray-400">
                  Time travelled in 45 mins
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-joy-green">₹360</div>
                <div className="text-xs text-gray-400">Ride fare</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DriverProfile;
