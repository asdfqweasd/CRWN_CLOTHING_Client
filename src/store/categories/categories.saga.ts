import { takeLatest, all, call, put } from "typed-redux-saga";
import axios from "axios";
// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";
import BASE_URL from "../../config";

// const productTypes = ["hats", "jackets", "sneakers", "womens", "mens"];

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const endpoint = "/products/all";
  const url = BASE_URL + endpoint;
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
};

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(
      getCategoriesAndDocuments,
      "categories"
    );
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
