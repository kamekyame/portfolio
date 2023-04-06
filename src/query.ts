import { ParsedUrlQuery } from "querystring";

export function getQueryAsString<T extends string = string>(
  value: ParsedUrlQuery[string]
) {
  if (typeof value === "string") {
    return value as T;
  } else if (Array.isArray(value)) {
    return value[0] as T;
  } else {
    return undefined;
  }
}
