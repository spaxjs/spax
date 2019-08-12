import { AnyObject } from "@wugui/core";
import { createHashHistory, History, Location } from "history";
import pathToRegexp from "path-to-regexp";
import queryString from "query-string";
import { useEffect, useState } from "react";

const hashHistory = createHashHistory();

/**
 * @example
 * const [{ pathname }, navigate] = useLocation();
 * navigate("/login");
 */
export function useLocation(history: History = hashHistory): [Location, (
  pathname: string,
  params?: AnyObject,
  search?: AnyObject,
  hash?: AnyObject,
  replace?: boolean,
) => void] {
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    return history.listen((_location) => {
      setLocation(_location);
    });
  }, []);

  return [
    location,
    (
      pathname: string,
      params?: AnyObject,
      search?: AnyObject,
      hash?: AnyObject,
      replace?: boolean,
    ) => {
      let url = pathToRegexp.compile(pathname)(params);
      if (search) {
        const searchStr = queryString.stringify(search);
        if (searchStr) {
          url += `${url.indexOf("?") === -1 ? "?" : "&"}${searchStr}`;
        }
      }
      if (hash) {
        const hashStr = queryString.stringify(hash);
        if (hashStr) {
          url += `${url.indexOf("#") === -1 ? "#" : "&"}${hashStr}`;
        }
      }
      if (replace) {
        history.replace(url);
      } else {
        history.push(url);
      }
    },
  ];
}

export function usePathname(history?: History): [string, any] {
  const [{ pathname }, navigate] = useLocation(history);
  return [
    pathname,
    navigate,
  ];
}

export function useSearch(history?: History): [AnyObject, any] {
  const [{ pathname, search }, navigate] = useLocation(history);
  return [
    queryString.parse(search),
    (searchObj: AnyObject) => {
      navigate(pathname, undefined, searchObj);
    },
  ];
}

export function useHash(history?: History): [AnyObject, any] {
  const [{ pathname, hash }, navigate] = useLocation(history);
  return [
    queryString.parse(hash),
    (hashObj: AnyObject) => {
      navigate(pathname, undefined, undefined, hashObj);
    },
  ];
}
