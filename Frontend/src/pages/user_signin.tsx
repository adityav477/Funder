import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import UserSignInCard from "./signin/userSignInCard"
import OrganizationSignInCard from "./signin/organizationSignInCard"

declare global {
  interface Window {
    ethereum: any
  }
}

export default function Signin() {

  return (
    <div className="w-full h-screen flex justify-center">
      <Tabs defaultValue="user" className="w-[400px] mt-36">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="organisation">Organisation</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <UserSignInCard />
        </TabsContent>
        <TabsContent value="organisation">
          <OrganizationSignInCard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
