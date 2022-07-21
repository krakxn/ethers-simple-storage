const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()
async function main() {
    let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    // Following is the encryption
    /* const encryptedJson = fs.readFileSync("./.encryptedKey,json", "utf8")
       let wallet = new ethers.Wallet.fromEncryptedJsonSync(
         encryptedJson,
         process.env.PRIVATE_KEY_PASSWORD // Enter PRIVATE_KEY_PASSWORD=password in the terminal before running deploy.js
       ); 
       wallet = await wallet.connect(provider); */
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying contract... please wait.")
    const contract = await contractFactory.deploy()
    const deploymentReceipt = await contract.deployTransaction.wait(1) // Waits 1 block
    console.log(`Contract deployed to ${contract.address}`)
    const currentFavouriteNumber = await contract.retrieve() // Gets number: (0 as it is not initialized)
    console.log(
        `Current favourite number: ${currentFavouriteNumber.toString()}`
    )
    const transactionResponse = await contract.store("7") // 7 is stored in favouriteNumber
    const transactionReceipt = await transactionResponse.wait(1) // Waits 1 block
    // Gets updated number:
    const updatedFavouriteNumber = await contract.retrieve() // Stores 7
    console.log(
        `Updated favourite number: ${updatedFavouriteNumber.toString()}`
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
