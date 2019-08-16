import { createHashHistory } from "history";
import pathToRegexp from "path-to-regexp";
import queryString from "query-string";
import { useEffect, useState } from "react";
const hashHistory = createHashHistory();
/**
 * @example
 * const [{ pathname }, navigate] = useLocation();
 * navigate("/login");
 */
export function useLocation(history = hashHistory) {
    const [location, setLocation] = useState(history.location);
    useEffect(() => {
        return history.listen((_location) => {
            setLocation(_location);
        });
    }, []);
    return [
        location,
        (pathname, params, search, hash, replace) => {
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
            }
            else {
                history.push(url);
            }
        },
    ];
}
export function usePathname(history) {
    const [{ pathname }, navigate] = useLocation(history);
    return [
        pathname,
        navigate,
    ];
}
export function useSearch(history) {
    const [{ pathname, search }, navigate] = useLocation(history);
    return [
        queryString.parse(search),
        (searchObj) => {
            navigate(pathname, undefined, searchObj);
        },
    ];
}
export function useHash(history) {
    const [{ pathname, hash }, navigate] = useLocation(history);
    return [
        queryString.parse(hash),
        (hashObj) => {
            navigate(pathname, undefined, undefined, hashObj);
        },
    ];
}
