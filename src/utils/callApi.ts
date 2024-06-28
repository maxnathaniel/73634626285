export const callApi = async (url: string, options: RequestInit) => {
  const res = await fetch(url, options);
  return res.json();
};
