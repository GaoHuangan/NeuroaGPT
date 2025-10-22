import ImageKit from "imagekit";

const publicKey = process.env.IMAGE_PUBLIC_KEY;
const privateKey = process.env.IMAGE_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGE_URL_ENDPOINT;

if (!publicKey || !privateKey || !urlEndpoint) {
  throw new Error("ImageKit enviroment default key was wrong");
}

const imagekit = new ImageKit({
  publicKey: publicKey,
  privateKey: privateKey,
  urlEndpoint: urlEndpoint
});

export default imagekit;