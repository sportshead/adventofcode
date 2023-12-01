// utils for bin/
import { resolve } from "path";
import cookie from "../cookie.txt";
import { promisify } from "util";
import { exec as _exec } from "child_process";

export const projectRoot = resolve(import.meta.dir, "..");
export const getYearFromCwd = () =>
    parseInt(process.cwd().match(/years\/(\d{4})\/\d{2}$/)?.[1] ?? "");
export const getDayFromCwd = () =>
    parseInt(process.cwd().match(/years\/\d{4}\/(\d{2})$/)?.[1] ?? "");

export const cookieHeader = { headers: { Cookie: cookie } };

export const exec = promisify(_exec);
