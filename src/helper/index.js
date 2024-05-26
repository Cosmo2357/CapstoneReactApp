export function generateCategory(menuData) {
  const categoryArray = menuData.map((item) => item.category);
  const uniqueCategory = [...new Set(categoryArray)];
  return uniqueCategory;
}

/**
 * Organize raw menu data to make easyy to handle menudata
 *
 * @param   menuData  raw menu data
 * @returns organized data that is easy to handle
 */
export function organizeMenu(menuData) {
  const organizedData = [];
  menuData.forEach((item) => {
    const index = organizedData.findIndex((data) => data.category === item.category);
    if (index === -1) {
      organizedData.push({ category: item.category, data: [item] });
    } else {
      organizedData[index].data.push(item);
    }
  });
  return organizedData;
}

/**
 * create Filtered Menu data with provided value
 *
 * @param   rawMenuData  raw menu data
 * @param   selectedCategory  rselectedCategory
 * @param   searchKey  searchKey
 * @returns filter rawMenuData with selectedCategory and searchKey
 */
export   function filterMenu (rawMenuData, selectedCategory, searchKey) {
  let filteredDatabyCategory = []
  if (selectedCategory.length === 0 ){
    filteredDatabyCategory = rawMenuData
  } else {
   filteredDatabyCategory = rawMenuData.filter((item) => selectedCategory.includes(item.category))
  }
  const filteredDataKey = filteredDatabyCategory.filter((item) =>
    item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
    item.category.toLowerCase().includes(searchKey.toLowerCase()) ||
    item.description.toLowerCase().includes(searchKey.toLowerCase()))
    return filteredDataKey
}

export   function generateSelectedCategory(pressedCategory, selectedCategories, allCategories ){
  if (selectedCategories.includes(pressedCategory) && selectedCategories.length === allCategories.length) {
    return [pressedCategory]
  } else if  (selectedCategories.includes(pressedCategory) && selectedCategories.length > 1) {
    return selectedCategories.filter((item) => item !== pressedCategory)
  } else if (selectedCategories.includes(pressedCategory) && selectedCategories.length === 1) {
    return []
  } else {
    return [ ...selectedCategories, pressedCategory]
  }
}