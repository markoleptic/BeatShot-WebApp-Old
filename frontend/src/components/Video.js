import React from "react";

const Video = ({embedId}) => {
if (!embedId) {
    return;
}
  return (
    <div className="video-responsive">
      <iframe className="responsive-iframe"
        width="560"
        height="315"
        frameborder="0"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default Video;