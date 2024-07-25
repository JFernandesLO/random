import { pinFileWithPinata, pinJsonWithPinata } from "./pinata";

async function testPinataFunctions() {
  const file = new File(["Hello world!"], "test.txt", { type: "text/plain" });
  const fileIpfsUrl = await pinFileWithPinata(file);
  console.log("File IPFS URL:", fileIpfsUrl);

  const json = { test: "data" };
  const jsonIpfsUrl = await pinJsonWithPinata(json);
  console.log("JSON IPFS URL:", jsonIpfsUrl);
}

testPinataFunctions();
