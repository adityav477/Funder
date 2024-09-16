import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// import { useRecoilValue } from "recoil"
// import { publicKeyAtom, providerAtom } from "../../atoms/recoil";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import web3 from "web3";




export default function UserTransactionTable() {
  const [transactions, setTransactions] = useState([]);

  const publicKey = sessionStorage.getItem("publicKey");

  useEffect(() => {
    getTransactions();
  }, [])

  const getTransactions = async () => {
    // const response = await axios.get(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${publicKey}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`)
    // console.log(response.data.result);
    // setTransactions(response.data.result);
    // console.log("done with setting transactions");
  }
  // console.log("transactions is ", transactions);

  return (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-semibold text-black ">From</TableHead>
          <TableHead className="font-semibold text-black">To</TableHead>
          <TableHead className="text-right font-semibold text-black">Amount</TableHead>
          <TableHead className="text-black font-semibold">BlockHash</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: any) => (
          <TableRow key={transaction.blockNumber}>
            <TableCell className="">{transaction.from}</TableCell>
            {/* <TableCell>{transaction.paymentStatus}</TableCell> */}
            <TableCell>{transaction.to}</TableCell>
            <TableCell className="text-left">{web3.utils.fromWei(transaction.value, "ether")} ETH</TableCell>
            <TableCell >{transaction.blockHash}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  )
}
