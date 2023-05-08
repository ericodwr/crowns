import { createSelector } from 'reselect';
import { CategoriesState } from './categories.reducer';
import { CategoriesMap } from './categories.types';
import { RootState } from '../store';

const selectCategoriesReducer = (state: RootState): CategoriesState =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories,
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoriesMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;

      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoriesMap),
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (slice) => slice.isLoading,
);
