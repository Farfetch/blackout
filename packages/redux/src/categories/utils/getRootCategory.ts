import type { Category } from '@farfetch/blackout-client';

const getRootCategory = (
  categoryId: Category['id'],
  categories: Category[],
): Category | undefined => {
  const category = categories.find(({ id }) => id === categoryId);

  return category?.parentId
    ? getRootCategory(category.parentId, categories)
    : category;
};

export default getRootCategory;
