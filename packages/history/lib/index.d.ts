import { AnyObject } from "@spax/core";
import { History, Location } from "history";
/**
 * @example
 * const [{ pathname }, navigate] = useLocation();
 * navigate("/login");
 */
export declare function useLocation(history?: History): [Location, (pathname: string, params?: AnyObject, search?: AnyObject, hash?: AnyObject, replace?: boolean) => void];
export declare function usePathname(history?: History): [string, any];
export declare function useSearch(history?: History): [AnyObject, any];
export declare function useHash(history?: History): [AnyObject, any];
