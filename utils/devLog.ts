import { NODE_ENV } from "./Load_Envs";

/**
 * This function logs it's params to the console if the app env is development.
 * @params {unknown[]} - ...props (Msg to be logged to the console)
 * @example devLog("Hello, world to ", AfuhFlynn);
 */

export function devLog(...props: unknown[]) {
  if (NODE_ENV === "development") {
    console.log(...props);
  }
}
