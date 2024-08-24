export default defineEventHandler(() => {
  return {
    value: new Date().toISOString(),
  };
});
