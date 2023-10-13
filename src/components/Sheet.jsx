import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import SingleFiles from './SingleFiles';

export default function Sheet() {
  const [imageUpload, setImageUpload] = useState(null);
  const [fileSet, setFileSet] = useState(new Set());
  const [uploading, setuploading] = useState(false);
  const fileListRef = ref(storage, 'files/');

  const uploadImage = () => {

    setuploading(true);
    if (imageUpload == null) return;
    const imageRef = ref(storage, 'files/' + v4() + imageUpload.name);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileSet((prev) => new Set(prev.add(url)));
      });
      alert('File Uploaded Successfully');
      setuploading(false)
    });
  };

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileSet((prev) => new Set(prev.add(url))); // Add the URLs from storage to the Set
        });
      });
    });
  }, []);

  const fileList = Array.from(fileSet); 

  return (
    <div className='flex flex-col justify-center items-center' >
      <div className='flex flex-row'>
      <input type="file" className='btn btn-secondary mx-4 my-4' onChange={(event) => setImageUpload(event.target.files[0])} />
    {uploading?<button type="button" className='btn btn-warning' >
    <div class="spinner-border text-danger" role="status">
  <span class="visually-hidden">Loading...</span>
</div> UPLOADING ...
      </button>:
      <button type="button" className='btn btn-secondary' onClick={uploadImage}>
        Upload File
      </button>}
      </div>
      <div className='flex-direction'>
      {fileList.map((url, index) => (
              <SingleFiles key={index} url={url}/>
              ))}
      </div>
     
      </div>
  );
}
