import { readAndCompressImage } from 'browser-image-resizer';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { storage } from 'boot/firebase';

export async function uploadImage(file: File) {
  const filename = `images/${uuidv4()}.${getExtension(file.name)}`;

  const storageRef = ref(storage, filename);

  const thumbnail = await compressImage(file);
  const uploadResult = await uploadBytes(storageRef, thumbnail);

  // const downloadURL = await getDownloadURL(storageRef);
  const downloadURL = await getDownloadURL(uploadResult.ref);

  console.log('filename: ', filename);
  console.log('downloadURL: ', downloadURL);
  return downloadURL;
}

function getExtension(filename: string) {
  return filename.split('.').pop();
}

async function compressImage(file: File) {
  return readAndCompressImage(file, {
    quality: 0.8,
  });
}
