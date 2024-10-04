import UserLayout from "./user_layout";
import { UserCardNotification } from "./user_notification";
import UserAppbar from "./user_appbar";
import { UserListingTable } from "./user_listingtable";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("http://localhost:3000/protected", {
          withCredentials: true,
        })
        console.log("response in user_layout is ", response);
      } catch (error: AxiosError | any) {
        // console.log("error in user_dashboard is ", error);
        if (error.status === 500) {
          navigate("/signin");
        }
        if (localStorage.getItem("publicKey") === undefined) {
          console.log(localStorage.getItem("publicKey"));
          alert("No Public Key login again");
          navigate("/signin");
        }
      }
    }

    checkLoggedIn();
  }, [navigate])


  return (
    <div>
      <div>
        <UserAppbar />
      </div>
      <div className="px-10 pb-10 pt-5">
        <div>
          <h1 className="text-2xl font-black">Dashboard</h1>
        </div>
        <div>
          <UserLayout />
        </div>
        <div className="grid grid-cols-4 gap-4 p-5">
          <div className="col-span-3">
            <UserListingTable />
          </div>
          <div>
            <UserCardNotification />
          </div>
        </div>
      </div>
    </div>
  );
}
