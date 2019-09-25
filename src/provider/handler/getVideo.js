import axios from 'axios';

export default (params) => {
  const { id, token, cdn } = params;
  const url = `https://api.myspotlight.tv/video/play2/${id}?token=${token}`;
  return axios.get(url)
  .then((response) => {
    return handleVideoResponse(response.data, cdn);
  })
  .catch(e => Promise.reject());
};

function handleVideoResponse(response, cdn) {
  const entry = parseVideo(response, cdn);
  return {
    id: 'video',
    title: 'Video',
    type: {
      value: 'video'
    },
    entry: [ entry ]
  };
}

function parseVideo(video, cdn) {
  const { _id, title, description, company_id } = video;

  const url = `https://${cdn}/files/company/${company_id}/assets/videos/${_id}/vod/${_id}.m3u8`;

  return {
    type: {
      value: 'video'
    },
    id: _id,
    title,
    summary: description,
    media_group: [
        {
            "type": "image",
            "media_item": [
                {
                    "type": "image",
                    "key": "thumbnail",
                    "src": "https://images.dotstudiopro.com/" + video.thumb
                }
            ]
        }
    ],
    "content": {
        "type": "video/hls",
        "src": url 
    }
  };
}