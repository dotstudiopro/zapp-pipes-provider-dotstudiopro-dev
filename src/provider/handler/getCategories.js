import axios from 'axios';

export default (params) => {
  const { token } = params;
  console.log("CATEGORY PARAMS ", params);
  const url = `https://api.myspotlight.tv/categories/US?platform=applicaster&token=${token}`;
  return axios.get(url).then(handleCategoriesResponse).catch(e => Promise.reject());
};

function handleCategoriesResponse(response) {
  const rawData = response.data.categories;
  const categories = rawData.map(category => parseCategory(category));
  return {
    id: 'categories',
    title: 'Categories',
    type: {
      value: 'feed'
    },
    entry: categories
  };
}

function parseCategory(category) {
  const { _id, name, slug } = category;

  return {
    type: {
      value: 'feed'
    },
    id: _id,
    title: name,
    media_group: [],
    extensions: {},
    content: {
      type: 'atom',
      rel: 'self',
      src: `dotstudiopro://fetchData?type=channels&category=${slug}` //formatted url to retrieve this category's channels inside the Zapp app
    }
  };
}