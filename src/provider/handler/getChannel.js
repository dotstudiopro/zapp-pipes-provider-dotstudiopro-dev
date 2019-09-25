import axios from 'axios';

export default (params) => {
  const { category, slug, token } = params;
  const url = `https://api.myspotlight.tv/channels/US/${category}/${slug}?token=${token}`;

  return axios.get(url).then(handleChannelResponse).catch(e => Promise.reject());
};

function handleChannelResponse(response) {
  const channel = response.data.channels[0];

  // single channel could contain one or multiple videos
  if (channel.playlist && channel.playlist.length) {
    const videos = channel.playlist.map(video => parseVideo(video));

    return {
      id: channel._id,
      title: channel.title,
      type: {
        value: 'feed'
      },
      entry: videos
    };
  } else {
    const parsedVideo = parseVideo(channel.video);
    return {
      id: channel._id,
      title: channel.title,
      type: {
        value: 'feed'
      },
      entry: parsedVideo
    };
  }
}

function parseVideo(video) {
    const { _id, title, description, thumb } = video;

    return {
      type: {
        value: 'feed'
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
                      "src": "https://images.dotstudiopro.com/" + thumb
                  }
              ]
          }
      ],
      content: {
        type: 'atom',
        rel: 'self',
        src: `dotstudiopro://fetchData?type=video&id=${_id}`
      }
    };
}

