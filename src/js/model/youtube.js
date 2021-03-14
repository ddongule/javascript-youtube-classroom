import { api } from '../api/youtubeAPI.js';
import { SEARCH } from '../constants/constant.js';

class YoutubeModel {
  #searchedVideos;
  #nextPageToken;

  constructor() {
    this.#searchedVideos = [];
    this.#nextPageToken = '';
  }

  getVideosBySearch = async ({ query, max = SEARCH.FETCH_VIDEO_LENGTH }) => {
    const nextPageToken = this.#nextPageToken;
    const json = await api.fetchVideoItems({ query, nextPageToken, max });

    this.#nextPageToken = json.nextPageToken;
    this.#searchedVideos = json.map(item => {
      return {
        url: item.url,
        title: item.title,
        channelId: item.channelUrl,
        channelTitle: item.channelTitle,
        publishTime: item.publishTime,
      };
    });
  };

  resetNextPageToken() {
    this.#nextPageToken = '';
  }

  get searchedVideos() {
    return this.#searchedVideos;
  }

  get searchedCount() {
    return this.#searchedVideos.length;
  }
}

export default YoutubeModel;
