import React, { useEffect, useState } from 'react'
import { storage } from '../firebase';
import {getDownloadURL, listAll, ref, uploadBytes} from 'firebase/storage';
import {v4} from 'uuid';

export default function Sheet() {
  const [imageUpload,setImageUpload]=useState(null);
  const [fileList,setFileList]=useState([]);
  const fileListRef=ref(storage,'files/');
  const uploadImage=()=> {
    if(imageUpload==null)return;
    const imageRef=ref(storage,'files/'+v4()+imageUpload.name);
    uploadBytes(imageRef,imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        setFileList((prev)=>[...prev,url]);
      })
      alert("File Uploaded Successfully ")
    })
  };
  
  useEffect(()=>{
    listAll(fileListRef).then((response)=>{
      response.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setFileList((prev)=>[...prev,url]);
        });
      })
    })
  },[]);
  
var i=1;
  return (
    <div>
      <input type="file" className='btn btn-secondary mx-4 my-4' onChange={(event)=>{setImageUpload(event.target.files[0])}} />
      <button  type="button"  className='btn btn-secondary' onClick={uploadImage}>Upload File</button>
       {fileList?.map((url)=>{
        return <div key={url} className="my-4 mx-4"> <a href={url} style={{color:"white"}}><p >{i++}) {url}</p></a></div>;
       })}
    </div>
  )
}
