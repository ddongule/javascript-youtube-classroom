
import { CLASS, ERROR_MESSAGE } from '../constants/constant.js';

export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const parseDOMFromString = string => {
  const parser = new DOMParser();
  return parser.parseFromString(string, 'text/html').body.firstElementChild;
};

export const setJSONToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(ERROR_MESSAGE.FAILED_SET_ITEM);

  }
};

export const getJSONFromLocalStorage = key => {
  try {
    const json = JSON.parse(localStorage.getItem(key));
    if (json === null) return [];

    if (!json) {
      throw new Error(ERROR_MESSAGE.FAILED_GET_ITEM);
    }
    return json;
  } catch (error) {
    console.error(error);

  }
};

export const isScrollUnfinished = (args, scrollTop) => {
  return (
    scrollTop <
    Math.max(args.scrollHeight, args.offsetHeight) - args.clientHeight
  );
};

export const convertDateFormat = publishedDate => {
  const date = new Date(publishedDate);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const toggleSelectorClass = (selector, className, force = null) => {
  if (force === null) {
    selector.classList.toggle(className);
    return;
  }
  selector.classList.toggle(className, force);
};

const removeSkeleton = event => {
  const article = event.target.closest('article');
  article.classList.remove(CLASS.SKELETON);
};

export const handleVideoLoad = iframe => {
  iframe.addEventListener('load', event => removeSkeleton(event));
};

export const handleVideosLoad = iframes => {
  iframes.forEach(iframe => handleVideoLoad(iframe));
};

