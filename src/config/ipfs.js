import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

export const ipfs = create({ url: 'http://127.0.0.1:5001/' });
const testIPFS = async () => {
    try {
        // Data to be uploaded to IPFS
        const data = "Hello, IPFS!";
        const buffer = Buffer.from(data);

        // Upload data to IPFS
        const added = await ipfs.add(buffer);
        console.log("Added file:", added);

        // Retrieve the file from IPFS using the CID
        const cid = added.path;
        const file = await ipfs.cat(cid);
        console.log("Retrieved file content:", file.toString());
    } catch (error) {
        console.error("Error uploading or retrieving file from IPFS:", error);
    }
};
// testIPFS();