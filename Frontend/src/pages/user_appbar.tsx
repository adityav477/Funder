import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserAppbar() {
  const navigate = useNavigate();

  const handleOnClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/logout", {
        withCrednetials: true,
      })
      console.log(response);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  return (
    <div className="grid grid-cols-2 border border-b-black">
      <div className="flex flex-col justify-center p-5 text-3xl font-black">
        <h1>CharityOnChain</h1>
      </div>
      <div className="flex justify-end p-5">
        <button onClick={handleOnClick} className="px-3 py-1 bg-gray-300 rounded-lg m-2">Logout</button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
