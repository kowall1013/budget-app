import { ALL_CATEGORIES_GET } from "../constants";

import API from "data/fetch";

export const fetchAllCategories = () => {
  const promise = API.common.fetchAllCategories();

  return {
    type: ALL_CATEGORIES_GET,
    promise,
  };
};
