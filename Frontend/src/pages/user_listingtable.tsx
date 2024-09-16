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


const invoices = [
  {
    invoice: "1",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Ajit",
  },
  {
    invoice: "2",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "Aditya",
  },
  {
    invoice: "3",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Dashrath",
  },
  {
    invoice: "4",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Akhilesh",
  },
  {
    invoice: "5",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "Aman",
  },
  {
    invoice: "6",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "kanishk",
  },
  {
    invoice: "7",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Rahul",
  },
]

export function UserListingTable() {
  return (
    <Table>
      <TableCaption>A list of top Donors</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">From</TableHead>
          {/* <TableHead>Status</TableHead> */}
          <TableHead>To</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            {/* <TableCell>{invoice.paymentStatus}</TableCell> */}
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

