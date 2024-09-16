import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  //   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

//react-hook-fork
import web3 from "web3";
import zod from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Web3 from "web3"

//recoil
import { useSetRecoilState } from "recoil"
import { publicKeyAtom } from "../../atoms/recoil"

type InputSchema = {
  name: string,
  publicKey: string,
  password: string,
}


const zodInputSchema = zod.object({
  name: zod.string().min(1),
  publicKey: zod.string().refine((publicKey) => {
    try {
      return web3.utils.toChecksumAddress(publicKey);
    } catch (e) {
      console.log(e);
    }
  }, {
    message: "Hakuna matata"
  }),
  password: zod.string().min(6),
})

//for window.ethereum to now throw error see stackoverflow 
declare global {
  interface Window {
    ethereum: any
  }
}

export default function Signup() {
  const navigate = useNavigate();

  const setPublicKey = useSetRecoilState(publicKeyAtom);

  const { register, handleSubmit, formState: { errors } } = useForm<InputSchema>({
    resolver: zodResolver(zodInputSchema)
  })

  const onSubmit: SubmitHandler<InputSchema> = async (data) => {
    // console.log("name is ", name);
    // console.log("publicKey is ", publicKey);
    // console.log("password is ", password);
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        name: data.name,
        publicKey: data.publicKey,
        password: data.password
      })

      console.log("response is ", response);
      console.log(data);

      if (response.status === 200) {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
          const web3 = new Web3(window.ethereum);

          console.log("web3 is ", web3);
          await window.ethereum.enable();

          const accounts = await web3.eth.getAccounts()

          console.log("accounts is ", accounts);
          setPublicKey(accounts[0]);
        }
        navigate("/user/dashboard");
      }
    } catch (e: AxiosError | any) {
      console.log("tyoe of error is ", typeof (e));
      console.log("erors in signup frotned is ", e);
      if (e.status === 401) {
        alert("Input format Not foound");
      } else if (e.status === 402) {
        alert("User Already Exists");
      }
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center gap-8">
      <Tabs defaultValue="user" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="organisation">Organisation</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <input id="name" placeholder="sisiphus"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("name", {
                      minLength: 1,
                    })}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name?.type === "minLength" && (<p>Name should be greaterd than 1</p>)}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="publicKey">Public-key</Label>
                  <input id="name" placeholder="Pedro Duarte"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("publicKey", {
                      required: "Enter Public Key",
                      minLength: 2
                    })}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.publicKey?.type === "Invalid" && "Invalid Public Key"}
                  {errors.publicKey?.type === "required" && "Please Enter Public Key"}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <input id="password" placeholder="Min 6 length"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("password", {
                      required: "Password is required",
                      minLength: 6
                    })}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  {errors.password?.type == "minLength" && "Password Minimum lenght should be 6"}
                  {errors.password?.type === "required" && "Please Enter Password"}
                </div>
                <Button type="submit" className="w-full text-center ">Signup</Button>
              </form>

            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="organisation">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Name of Organisation</Label>
                <Input id="current" type="text" placeholder="Disha Foundation" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Name</Label>
                <Input id="new" type="text" placeholder="sisiphus" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Public-key</Label>
                <Input id="new" type="text" placeholder="Enter your Public-key" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

    </div >
  )
}
