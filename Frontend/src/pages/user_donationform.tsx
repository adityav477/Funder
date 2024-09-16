import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
// import { actualContract } from "./../lib/contract";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { providerAtom, publicKeyAtom } from "../../atoms/recoil";
import { useRecoilValue } from "recoil";

export default function UserDonationForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const { search } = location

  const provider = useRecoilValue(providerAtom);
  console.log("provider in donationform", provider);
  const publicKey = useRecoilValue(publicKeyAtom);
  console.log(publicKey);

  async function handleClick() {
  }


  const encodedTitle = new URLSearchParams(search).get("title");
  // @ts-ignore
  const deCodedTitle = decodeURIComponent(encodedTitle)
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{deCodedTitle}</CardTitle>
          <CardDescription>Help for a Change</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">From</Label>
                <Input id="from" defaultValue={publicKey} placeholder="Enter your public-key" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">To</Label>
                <Input id="to" defaultValue={"0xE01B55a609B817A416c2b3b9a88F68b4973a86A6"} placeholder="Public-key of Organisation" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => { navigate("/user/organisation") }}>Cancel</Button>
          <Button onClick={handleClick}>Donate</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

