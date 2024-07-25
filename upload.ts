import { makeMediaTokenMetadata } from "@zoralabs/protocol-sdk";
import {
  pinFileWithPinata,
  pinJsonWithPinata,
  createMetadataJson,
} from "./pinata";

export async function makeImageTokenMetadata({
  imageFile,
  thumbnailFile,
}: {
  imageFile: File;
  thumbnailFile: File;
}) {
  // upload image and thumbnail to Pinata
  const mediaFileIpfsUrl = await pinFileWithPinata(imageFile);
  const thumbnailFileIpfsUrl = await pinFileWithPinata(thumbnailFile);

  // build token metadata json from the text and thumbnail file
  // ipfs urls
  const metadataJson = makeMediaTokenMetadata({
    mediaUrl: mediaFileIpfsUrl,
    thumbnailUrl: thumbnailFileIpfsUrl,
    name: imageFile.name,
  });
  // upload token metadata json to Pinata and get ipfs uri
  const jsonMetadataUri = await pinJsonWithPinata(metadataJson);

  return jsonMetadataUri;
}
const imageIpfsHash = "Qm...";
const mediaIpfsHash = "Qm...";
const name = "My NFT Image";
const description = "Description of my NFT image";
const mimeType = "image/png";
const traitType = "Background";
const traitValue = "Blue";

createMetadataJson({
  imageIpfsHash,
  mediaIpfsHash,
  name,
  description,
  mimeType,
  traitType,
  traitValue,
}).then((jsonMetadataUri) => {
  console.log("Metadata JSON URI:", jsonMetadataUri);
});
