const { run } = require("hardhat")

async function verify(contractAddress, args) {
    console.log("Verifiying Contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log("Verified...")
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified..")
        }
    }
}

module.exports = { verify }
