export const getNested = (obj, ...args) => {
  return args.reduce((obj, level) => obj && obj[level], obj)
};

export const checkNested = (obj, level,  ...rest) => {
  if (obj === undefined) return false;
  if (rest.length == 0 && obj.hasOwnProperty(level)) return true;
  return checkNested(obj[level], ...rest);
};

export const generateId = () => Math.round(Math.random() * 100000000);

export const buildNewReview = (name, comment) => ({
  id: generateId(),
  comment,
  user: {
    id: generateId(),
    name,
    url: null,
  },
});
