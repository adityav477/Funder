import zod from "zod";
import web3 from "web3";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import Web3 from "web3";
import { useState } from "react";

//components
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react";

//recoil
import { useSetRecoilState } from "recoil";
import { publicKeyAtom } from "../../../atoms/recoil.ts";

type InputSchema = {
  organizationName: String,
  publicKey: String,
  password: String
}

const zodInputSchema = zod.object({
  organizationName: zod.string().min(2, "Name length sould be 2 or more "),
  publicKey: zod.string().refine((publicKey) => {
    try {
      return Web3.utils.toChecksumAddress(publicKey);
    } catch (e) {
      console.log(e);
    }
  }, {
    message: "Invalid public Key"
  }),
  password: zod.string().min(6, "Password Length should be atleast 6"),
})


function OrganizationSignInCard() {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  //signin logic
  const navigate = useNavigate();

  const setPublicKey = useSetRecoilState(publicKeyAtom);

  const { register, handleSubmit, formState: { errors }, setError } = useForm<InputSchema>({
    resolver: zodResolver(zodInputSchema),
  });

  const onSubmit: SubmitHandler<InputSchema> = async (data) => {
    console.log(data)
    try {
      const response = await axios.post("http://localhost:3000/api/v1/organization/signin", {
        organizationName: data.organizationName,
        publicKey: data.publicKey,
        password: data.password,
      })
      console.log("response of organization is ", response);

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
      console.log("erors in signin frotned is ", e);
      if (e.status === 401) {
        setError("root", {
          message: "Invalid format NOt found",
        });
      } else if (e.status === 402) {
        alert("User Doesn't Exists please Signup");
        // navigate("/signup");
      } else if (e.status === 403) {
        setError("password", {
          message: "Incorrect Password",
        })
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>SignIn As Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="organizationName">Name of Organization</Label>
              <input id="organizationName" type="text" placeholder="Disha Foundation"
                className="rounded-md border border-gray-300 focus:border-gray-500 focus:outline-none w-full h-10 px-2"
                {...register("organizationName")}
              />
              {errors.organizationName &&
                <p className="text-sm bg-red-50 text-red-500 rounded-lg p-2">{errors.organizationName.message}</p>
              }
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicKey">Public-key</Label>
              <input id="publickey" type="text" placeholder="Enter your Public-key"
                className="w-full h-10 border rounded-md focus:outline-none focus:border-gray-500 px-2"
                {...register("publicKey")}
              />
              {errors.publicKey &&
                <p className="text-sm bg-red-50 text-red-500 rounded-lg p-2">{errors.publicKey.message}</p>
              }
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex w-full h-10 justify-normal border rounded-lg"
              >
                <input id="password" type={showPassword ? "text" : "password"} placeholder="sisiphus"
                  {...register("password")}
                  className=" focus:outline-none w-full p-2 "
                />
                <button className="py-2 px-3"
                  type="button"
                  onClick={handleShowPassword}>
                  {showPassword ?
                    <Eye size={16} />
                    :
                    <EyeOff size={16} />
                  }</button>
              </div>

              {errors.password &&
                <p className="text-sm bg-red-50 text-red-500 rounded-lg p-2">{errors.password.message}</p>
              }
            </div>
            <Button
              type='submit'
              className='w-full text-center'
            >SignIn</Button>

            {errors.root && <p>{errors.root.message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrganizationSignInCard
