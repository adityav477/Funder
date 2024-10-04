import CardComponent from "./user_card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import { Link, useLocation } from "react-router-dom";

import { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { getBalance } from "@/lib/contract";

export default function UserLayout() {

  const location = useLocation();
  const { pathname } = location;

  // const publicKey = localStorage.getItem("publicKey") || "";
  const [balance, setBalance] = useState<string>("");
  let publicKey: string;

  useLayoutEffect(() => {
    publicKey = localStorage.getItem("publicKey") || "";
    console.log("useEffect is called ");
    getBalanceUser(publicKey);
  }, [balance])

  const getBalanceUser = async (address: string) => {
    // console.log("inside getBalanceUser");
    console.log("publicKey is ", publicKey);
    const newBalance = await getBalance(address);
    console.log("newBalance is ", newBalance);
    setBalance(newBalance);
  }

  return (
    <div>
      <div className="flex justify-between p-5 space-x-4">
        <CardComponent title="Amount" content={balance} />
        <CardComponent title="Donations" content="$34524" />
        <CardComponent title="Organisations You Donated" content="20+" />
        <CardComponent title="Organisations Listed" content="500+" />
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/user/dashboard">
                <NavigationMenuLink
                  className={`text-base font-semibold ${(pathname == "/user/dashboard") ? 'bg-slate-200' : ""} ${navigationMenuTriggerStyle()}`}
                >
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/user/organisation">
                <NavigationMenuLink
                  className={`text-base font-semibold ${(pathname == "/user/organisation") ? 'bg-slate-200' : ""} ${navigationMenuTriggerStyle()}`}
                >
                  Organisations
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/user/transactions">
                <NavigationMenuLink
                  className={`text-base font-semibold ${(pathname == "/user/transactions") ? 'bg-slate-200' : ""} ${navigationMenuTriggerStyle()}`}
                >
                  Transactions
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
