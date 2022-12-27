interface WasaviData {
  restaurant?: object;
  user?: object;
}

export const updateWasaviData = (newData: WasaviData) => {
  let oldData = JSON.parse(
    localStorage.getItem("wasavi_data") ||
      JSON.stringify({
        user: {},
        restaurant: {},
      })
  );
  localStorage.setItem(
    "wasavi_data",
    JSON.stringify({ ...oldData, ...newData })
  );
};
