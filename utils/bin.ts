// utils for bin/
import { resolve } from "path";
import cookie from "../cookie.txt";

export const projectRoot = resolve(import.meta.dir, "..");
export const getYearFromCwd = () =>
    parseInt(process.cwd().match(/years\/(\d{4})\/\d{2}$/)?.[1] ?? "");
export const getDayFromCwd = () =>
    parseInt(process.cwd().match(/years\/\d{4}\/(\d{2})$/)?.[1] ?? "");

export const cookieHeader = { headers: { Cookie: cookie } };
