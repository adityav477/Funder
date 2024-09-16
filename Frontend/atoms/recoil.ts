import { atom } from "recoil";

const publicKeyAtom = atom({
    key: "publicKey",
    default: " "
})

const providerAtom = atom({
    key: "provider",
    default: {}
})

export { publicKeyAtom, providerAtom }