// Used to encrypt private key
const ethers = require("ethers");
const fs = require("fs-extra");

require("dotenv").config(); // To process .env file
async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey); // Stores encrypted key
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
