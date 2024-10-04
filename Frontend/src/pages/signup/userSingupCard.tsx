import axios, { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { publicKeyAtom } from "../../../atoms/recoil";
import zod from "zod";
import Web3 from "web3";

//react-hook-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type InputSchema = {
  name: string,
  publicKey: string,
  password: string,
}

const zodInputSchema = zod.object({
  name: zod.string().min(2, "Name length sould be 2 or more"),
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

function UserSingUpCard() {
  const navigate = useNavigate();

  const setPublicKey = useSetRecoilState(publicKeyAtom);

  const { register, handleSubmit, formState: { errors }, setError } = useForm<InputSchema>({
    resolver: zodResolver(zodInputSchema)
  })

  const onSubmit: SubmitHandler<InputSchema> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
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
        setError("root", {
          message: "Invalid format"
        })
      } else if (e.status === 402) {
        alert("User Already Exists");
        navigate("/signin");
      }
    }
  }

  return (
    <div>
      < Card >
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <input id="name" placeholder="sisiphus"
                className="w-full h-10 border rounded-md focus:outline-none focus:border-gray-500 px-2"
                {...register("name", {
                  minLength: 1,
                })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name &&
                <p className="text-xs  text-red-500 rounded-lg p-2">{errors.name.message}</p>
              }
            </div>

            <div className="space-y-1">
              <Label htmlFor="publicKey">Public-key</Label>
              <input id="publicKey" placeholder="Pedro Duarte"
                className="w-full h-10 border rounded-md focus:outline-none focus:border-gray-500 px-2"
                {...register("publicKey", {
                  required: "Enter Public Key",
                  minLength: 2
                })}
                aria-invalid={errors.publicKey ? "true" : "false"}
              />
              {errors.publicKey &&
                < p className="text-xs  text-red-500 rounded-lg p-2">{errors.publicKey.message}</p>
              }
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <input id="password" placeholder="Min 6 length"
                className="w-full h-10 border rounded-md focus:outline-none focus:border-gray-500 px-2"
                {...register("password", {
                  required: "Password is required",
                  minLength: 6
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password &&
                <p className="text-xs  text-red-500 rounded-lg p-2">{errors.password.message}</p>
              }
            </div>
            <Button type="submit" className="w-full text-center ">Signup</Button>
            {errors.root &&
              <p className="text-xs  text-red-50 rounded-lg p-2">{errors.root.message}</p>}
          </form>
        </CardContent>
      </Card >
    </div >
  )
}

export default UserSingUpCard;
