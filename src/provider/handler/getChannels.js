import axios from 'axios';

export default (params) => {
  const { category , token } = params;
  const url = `https://api.myspotlight.tv/channels/US/${category}?token=${token}`;
  return axios.get(url)
  .then((response) => {
    return handleChannelsResponse(response.data, category);
  })
  .catch(e => Promise.reject(e));
};

function handleChannelsResponse(response, category) {
  const channels = response.channels.map(channel => {

    if (channel.childchannels.length) {
      // case 1 - parent so need to get children individually
      channel.childchannels.forEach((child) => {
        return parseChannel(child, category);
      })
    } else if (channel.playlist.length) {
      // case 2 - channel with a playlist
      return parseChannel(channel, category);
    } else if (channel.video) {
      return parseVideoChannel(channel);
    }
    
  })

  return {
    id: 'channels',
    title: 'Channels',
    type: {
      value: 'feed'
    },
    entry: channels
  };
}

function parseChannel(channel, category) {
  const { _id, title, slug } = channel;

  return {
    type: {
      value: 'feed'
    },
    id: _id,
    title,
    media_group: [{
        type: 'image',
        media_item: [{
          src: channel.spotlight_poster || channel.poster,
          key: 'image_base',
          type: 'image'
        }]
    }],
    extensions: {},
    content: {
      type: 'atom',
      rel: 'self',
      src: `dotstudiopro://fetchData?type=channel&category=${category}&slug=${slug}`
    },
    link: {
      rel: 'self',
      href: `dotstudiopro://fetchData?type=channel&category=${category}&slug=${slug}`
    }
  };
}

function parseVideoChannel(channel) {
  const { _id, title, description } = channel;
  const video_id = channel.video._id;

  return {
    type: {
      value: 'program'
    },
    id: _id,
    title,
    summary: description,
    media_group: [{
        type: 'image',
        media_item: [{
          src: channel.spotlight_poster || channel.poster,
          key: 'image_base',
          type: 'image'
        }]
    }],
    extensions: {},
    "content": {
      "type": "video/hls",
      "src": `dotstudiopro://fetchData?type=video&id=${video_id}`
    },
    link: {
      rel: "self",
      href: `dotstudiopro://fetchData?type=video&id=${video_id}`
    }
  };
}

