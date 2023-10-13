import React from 'react';

const onError = (e) => {
  console.log(e, "error in file-viewer");
};

export default function SingleFiles({ url }) {
  
  const isWebPage = url.startsWith('http') || url.startsWith('https');
  const isPDF = url.endsWith('.pdf');
  const isImage = /\.(jpeg|jpg|png|gif|bmp)$/i.test(url);
  const isVideo = /\.(mp4|avi|mov|wmv)$/i.test(url);
  const supportedFileExtensions = /\\(jpg|jpeg|png|gif|bmp|svg|mp4|ogg|webm|pdf)\\?/i.test(url);
  // const supportedFileExtensions = /\.(jpg|jpeg|png|gif|bmp|svg|mp4|ogg|webm|pdf)$/i.test(url);
  // const supportedFileExtensions = /https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/vishal-6ccf0\.appspot\.com\/o\/files%2F[^?]+(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.svg|\.mp4|\.ogg|\.webm|\.pdf)\?alt=media&token=[^&]+$/
  const keywords = ['jpg','jpeg','png','gif','bmp','svg','mp4','ogg','webm','pdf'];
  const pattern = new RegExp(keywords.join('|'), 'i'); 
  
  const nameretriver=(url)=>{
    let newname="";
    for(var i=151;i<url.length;i++){
      if(url[i]==='?'){
        return newname;
      }
      newname+=url[i];

    }
    // console.log(url)
    return newname;
  }
  if(!pattern.test(url)){
    return (
      <div key={url} className="my-4 mx-4 flex flex-col">
        <a href={url} style={{ color: "white" }}><img src='./file.svg' width={"80vh"} height={"80vh"}/> <p className='text-xs'>{nameretriver(url)}</p> </a>
      </div>
    );
  }
  // transactions_data%20Backend.csv?alt=media&token=1feeafb5-ec4b-4d84-95f5-88200b9d3fa5
  if (isWebPage) {
    return (
      <div className='single-file-box'>
        <iframe
          src={url}
          title="Web Page Preview"
          onError={onError}
        ></iframe>
      </div>
    );
  }else {
    return (
      <div key={url} className="my-4 mx-4">
        <a href={url} style={{ color: "white" }}><p>{url}</p></a>
      </div>
    );
  }
}
