import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import UserSingUpCard from "./signup/userSingupCard"
import OrganisationSignupCard from "./signup/organisationSignupCard"


//recoil


//for window.ethereum to now throw error see stackoverflow 
declare global {
  interface Window {
    ethereum: any
  }
}

export default function Signup() {
  return (
    <div className="w-full h-screen flex justify-center gap-8 ">
      <Tabs defaultValue="user" className="w-[400px] mt-36">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="organisation">Organisation</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <UserSingUpCard />
        </TabsContent>
        <TabsContent value="organisation">
          <OrganisationSignupCard />
        </TabsContent>
      </Tabs>
    </div >
  )
}
