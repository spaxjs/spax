import { AnyObject } from "@wugui/core";
import { createHashHistory, Location } from "history";
import pathToRegexp from "path-to-regexp";
import queryString from "query-string";
import { useEffect, useState } from "react";

const hashHistory = createHashHistory();

/**
 * @example
 * const [{ pathname }, navigate] = useLocation();
 * navigate("/login");
 */
export function useLocation(): [Location, (
  pathname: string,
  params?: AnyObject,
  search?: AnyObject,
  hash?: AnyObject,
  replace?: boolean,
) => void] {
  const [location, setLocation] = useState(hashHistory.location);

  useEffect(() => {
    return hashHistory.listen((_location) => {
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
        hashHistory.replace(url);
      } else {
        hashHistory.push(url);
      }
    },
  ];
}

export function usePathname(): [string, any] {
  const [{ pathname }, navigate] = useLocation();
  return [
    pathname,
    navigate,
  ];
}

export function useSearch(): [AnyObject, any] {
  const [{ pathname, search }, navigate] = useLocation();
  return [
    queryString.parse(search),
    (searchObj: AnyObject) => {
      navigate(pathname, undefined, searchObj);
    },
  ];
}

export function useHash(): [AnyObject, any] {
  const [{ pathname, hash }, navigate] = useLocation();
  return [
    queryString.parse(hash),
    (hashObj: AnyObject) => {
      navigate(pathname, undefined, undefined, hashObj);
    },
  ];
}
