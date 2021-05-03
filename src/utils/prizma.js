export const searchIn = (search = {}) => {
  const filters = Object.entries(search).filter(([key, value]) => !!value).map(([key, value]) => ({
    [key]: {
	  contains: value
    }
  }));

  if (filters.length === 0) {
    return {};
  }
  return {
    OR: filters,
  };
};