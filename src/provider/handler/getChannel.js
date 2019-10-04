import axios from 'axios';

export default (params) => {
  const { category, slug, token } = params;
  const url = `https://api.myspotlight.tv/channels/US/${category}/${slug}?token=${token}`;
  return axios.get(url)
  .then((response) => {
    console.log(response.data);
    return handleChannelResponse(response.data, params);
  })
  .catch(e => Promise.reject(e));
};

function handleChannelResponse(response, params) {
  const channel = response.channels[0];

  const returnObj = {
    id: channel._id,
    title: channel.title,
    summary: channel.description,
    media_group: [],
    type: {
      value: 'feed'
    }
  };

  if (channel.spotlight_poster) {
    returnObj.media_group.push({
      "type": "image",
      "media_item": [
          {
              "type": "image",
              "key": "key_art",
              "src": channel.spotlight_poster
          }
      ]
    })
  }

  if (channel.poster) {
    returnObj.media_group.push({
      "type": "image",
      "media_item": [
          {
              "type": "image",
              "key": "poster",
              "src": channel.poster
          }
      ]
    })
  }



  // single channel could contain one or multiple videos
  if (channel.playlist && channel.playlist.length) {
    const videos = channel.playlist.map(video => parseVideo(video, params));
    returnObj.entry = videos;
    return returnObj;
  } else {
    const parsedVideo = parseVideo(channel.video);
    returnObj.entry = parsedVideo;
    return returnObj;
  }
}

function parseVideo(video, params) {
  const { _id, title, description, thumb, company_id } = video;
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
                    "key": "image_base",
                    "src": "https://images.dotstudiopro.com/" + thumb
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

