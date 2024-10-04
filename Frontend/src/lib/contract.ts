import { Web3 } from "web3";
import axios from "axios";

const web3 = new Web3(import.meta.env.VITE_SEPOLIA_NODE_URL);
// console.log("private key is ", import.meta.env.PRIVATE_KEY_ACCOUNT1);
const account = web3.eth.accounts.wallet.add(import.meta.env.VITE_PRIVATE_KEY_ACCOUNT1 || "");

const contractAddress = `0xa1F765C330bFA63F038fdaE9Ce578b46549f7a79`;

const abi = JSON.parse(`[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "CharityDonation__AmountCannotBeZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharityDonation__AmountGreaterThanDonation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharityDonation__InvalidDonorAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharityDonation__InvalidDonorId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharityDonation__InvalidOrganizationId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharityDonation__NotOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharityDonation__OnlyOrganizationOwnerCanWithrdaw",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CharityDonation__WithdrawalFailed",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "donor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "organization",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "CharityDonation_Donated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "CharityDonation_FundsWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "ownerOrganization",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "timeStamp",
        "type": "uint256"
      }
    ],
    "name": "CharityDonation_OrganizationCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "CharityDonation_OwnerCalled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "newDonor",
        "type": "address"
      }
    ],
    "name": "CharityDonation_donorAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "donorAddress",
        "type": "address"
      }
    ],
    "name": "addDonor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "contractName",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "organizationOwner",
        "type": "address"
      }
    ],
    "name": "addOrganization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "donorId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "organizationId",
        "type": "uint256"
      }
    ],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "organizationId",
        "type": "uint256"
      }
    ],
    "name": "getOrganizationOwnerByOrganizationId",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "organizationId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]`)

const actualContract = new web3.eth.Contract(abi, contractAddress);

async function getBlockNumber() {
  const blockNumber = await web3.eth.getBlockNumber();
  console.log(blockNumber);
  return blockNumber;

}

async function getBalance(address: string) {
  console.log("type of ", typeof (address));
  console.log("the address in contract js is ", address);
  const accountBalance = await web3.eth.getBalance(address);
  // console.log("accountBalance in contract", accountBalance);
  // console.log("accountBalance in ether is ", web3.utils.fromWei(accountBalance, "ether"));
  // console.log("account eth sepolia 1 is ")
  return web3.utils.fromWei(accountBalance, "ether");
}

async function getUserDetails(address: string) {
  const response = await axios.post("http://localhost:3000/api/v1/user/getUserDetails", {
    address: address,
  });
  console.log(response);
}


async function sendEth() {
  console.log("account in sendEth is ", account);
  const tx = {
    from: account[0].address,
    to: contractAddress,
    value: web3.utils.toWei('0.2', 'ether')
  }

  const txReceipt = await web3.eth.sendTransaction(tx);

  console.log('Tx hash: ', txReceipt.transactionHash);

}

async function getOwnerFronContract() {
  const owner = await actualContract.methods.getOwner().call();
  console.log("owner is ", owner);

  return owner;
}


export { getBlockNumber, getBalance, sendEth, getOwnerFronContract, actualContract };






