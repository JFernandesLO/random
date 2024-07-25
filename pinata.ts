const PINATA_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmN2E2MGZlOS04ZmM0LTRlZGQtYmVjMi0xYzcxMWFlM2NjNDciLCJlbWFpbCI6Imp1LmZsaW1hLm9saXZlaXJhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI0OWM0ZjllZTg5OTBlYTM1ZDI4NSIsInNjb3BlZEtleVNlY3JldCI6IjE0ZmI4ZDc0NWE2NTQ2YTY1MmZjZTVhZWUzNWU4MTNhYjRjOTJhYzdkNWRiMDA4ZDc3NDdlMzRiYWRkNjdlMGQiLCJleHAiOjE3NTM0MDI1OTN9.I-_S4n8tLd5i1AiHuElsLKTz6znymPYJmoGGPjgxmI0";

export async function pinFileWithPinata(file: File) {
  const data = new FormData();
  data.append("file", file);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: data,
  });

  const result = (await res.json()) as { IpfsHash: string };

  return `ipfs://{result.IpfsHash}`;
}

export async function pinJsonWithPinata(json: object) {
  const data = JSON.stringify({
    pinataContent: json,
    pinataMetadata: {
      name: "metadata.json",
    },
  });

  const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: data,
  });

  const result = (await res.json()) as { IpfsHash: string };

  return `ipfs://{result.IpfsHash}`;
}

export async function createMetadataJson({
  imageIpfsHash,
  mediaIpfsHash,
  name,
  description,
  mimeType,
  traitType,
  traitValue,
}: {
  imageIpfsHash: string;
  mediaIpfsHash: string;
  name: string;
  description: string;
  mimeType: string;
  traitType: string;
  traitValue: string;
}) {

  const metadata = {
    name: name,
    description: description,
    image: `ipfs://${imageIpfsHash}`,
    animation_url: `ipfs://${mediaIpfsHash}`,
    content: {
      mime: mimeType,
      uri: `ipfs://${mediaIpfsHash}`,
    },
    attributes: {
      trait_type: traitType,
      value: traitValue,
    },
  };

  const jsonMetadataUri = await pinJsonWithPinata(metadata);

  return jsonMetadataUri;
}
