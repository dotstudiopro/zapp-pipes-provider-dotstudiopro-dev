import axios from 'axios';

export default (params) => {
  const { id, token } = params;
  const url = `https://api.myspotlight.tv/video/play2/${id}?token=${token}`;
  return axios.get(url)
  .then((response) => {
    return handleVideoResponse(response.data, params);
  })
  .catch(e => Promise.reject(e));
};

function handleVideoResponse(response, params) {
  const entry = parseVideo(response, params);
  return {
    id: 'video',
    title: 'Video',
    type: {
      value: 'video'
    },
    entry: [ entry ]
  };
}

function parseVideo(video, params) {
  const { _id, title, description, company_id } = video;
  const { cdn, deviceWidth, deviceHeight, platform, device_ifa } = params;

  const url = `https://${cdn}/files/company/${company_id}/assets/videos/${_id}/vod/${_id}.m3u8`;

  const vmap_url = `https://api.myspotlight.tv/vmap/${_id}/${deviceWidth}/${deviceHeight}?device_type=${platform}&device_ifa=${device_ifa}`;

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
                    "src": video.thumb
                }
            ]
        }
    ],
    "content": {
        "type": "video/hls",
        "src": url 
    },
    "extensions": {
      "video_ads": vmap_url
    }
  };
}