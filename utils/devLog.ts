/**
 * This function logs it's params to the console if the app env is development.
 * @param params
 */
export const devLog = (...params: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...params);
  }
};
