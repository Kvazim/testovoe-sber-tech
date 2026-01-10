export const generateOptions = () => {
  return Array.from({ length: 1000 }, (_, i) => {
    const value = String(i + 1);
    return { name: value, value };
  });
};