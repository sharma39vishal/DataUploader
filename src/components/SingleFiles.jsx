import React from 'react';

const onError = (e) => {
  console.log(e, "error in file-viewer");
};

export default function SingleFiles({ url }) {
  
  const isWebPage = url.startsWith('http') || url.startsWith('https');
  const isPDF = url.endsWith('.pdf');
  const isImage = /\.(jpeg|jpg|png|gif|bmp)$/i.test(url);
  const isVideo = /\.(mp4|avi|mov|wmv)$/i.test(url);
  
  if(isWebPage){
    return "Valid";
  }
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
  } else if (isPDF) {
    return (
      <div className='single-file-box'>
        <object
          data={url}
          type="application/pdf"
          onError={onError}
        >
          PDF Viewer is not supported in this browser. You can{' '}
          <a href={url} download>download the PDF</a> instead.
        </object>
      </div>
    );
  } else if (isImage) {
    return (
      <div className='single-file-box'>
        <img
          src={url}
          alt="Image Preview"
          style={{ maxWidth: '100%', height: 'auto' }}
          onError={onError}
        />
      </div>
    );
  } else if (isVideo) {
    return (
      <div className='single-file-box'>
        <video
          controls
          onError={onError}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  } else {
    return (
      <div key={url} className="my-4 mx-4">
        <a href={url} style={{ color: "white" }}><p>{url}</p></a>
      </div>
    );
  }
}
