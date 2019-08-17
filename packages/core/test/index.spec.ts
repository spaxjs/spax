import "jest";
import { run, useParsed, useRendered } from "../src";

// tslint:disable: react-hooks-nesting

describe("useParsed", () => {
  test("call before run", () => {
    const [parsed] = useParsed();
    expect(parsed).toBe(undefined);
  });

  test("call after run", async () => {
    await run([], { scope: "useParsed" });
    const [parsed] = useParsed();
    expect(parsed).toBe(undefined);
  });
});

describe("useRendered", () => {
  test("call before run", () => {
    const [rendered] = useRendered();
    expect(rendered).toBe(undefined);
  });

  test("call after run", async () => {
    await run([], { scope: "useRendered" });
    const [rendered] = useRendered();
    expect(rendered).toBe(undefined);
  });
});

describe("run", () => {
  describe("returns", () => {
    test("null", async () => {
      const ret = await run([], {
        scope: "ret",
      });
      expect(ret).toEqual(null);
    });
    test("[]", async () => {
      const ret1 = await run([], {
        scope: "ret1",
        modules: [],
      });
      expect(ret1).toEqual([]);
    });
    test("[{...}]", async () => {
      const ret2 = await run([], {
        scope: "ret2",
        modules: [{title: "hello"}],
      });
      expect(ret2).toEqual([{title: "hello"}]);
    });
  });

  test("scope", async () => {
    expect(await run([], {})).toBe(null);
    // should show error
    expect(await run([], {})).toBe(undefined);
  });

  describe("plugins", () => {
    test("ordering", async () => {
      let index = 0;
      await run([(hooks) => {
        hooks.init.tap("Test", () => {
          expect(index++).toBe(0);
        }, () => {
          expect(index++).toBe(3);
        });
        hooks.init.tap("Test2", () => {
          expect(index++).toBe(1);
        }, () => {
          expect(index++).toBe(2);
        });
      }], {
        scope: "ordering",
        modules: [],
      });
    });

    test("dependency", async () => {
      let index = 0;
      await run([(hooks) => {
        hooks.init.tap("Test", () => {
          expect(index++).toBe(1);
        }, () => {
          expect(index++).toBe(2);
        }, ["Test2"]);
        hooks.init.tap("Test2", () => {
          expect(index++).toBe(0);
        }, () => {
          expect(index++).toBe(3);
        });
      }], {
        scope: "dependency",
        modules: [],
      });
    });

    test("init", async () => {
      await run([(hooks) => {
        hooks.init.tap("Test", (option) => {
          expect(option.foo).toBe("bar");
        }, (option) => {
          expect(option.foo).toBe("bar");
        });
      }], {
        scope: "init",
        plugins: {
          test: {
            foo: "bar",
          },
        },
        modules: [],
      });
    });

    test("parse", async () => {
      await run([(hooks) => {
        hooks.parse.tap("Test", (current, parent, option) => {
          expect(option.foo).toBe("bar");
          expect(current).toEqual({title: "hello"});
          expect(parent).toEqual({});
          return {
            ...current,
            baz: "qux",
          };
        }, (current, parent, option) => {
          expect(option.foo).toBe("bar");
          expect(current).toEqual({title: "hello", baz: "qux"});
          expect(parent).toEqual({});
        });
      }], {
        scope: "parse",
        plugins: {
          test: {
            foo: "bar",
          },
        },
        modules: [{title: "hello"}],
      });
    });

    test("render", async () => {
      await run([(hooks) => {
        hooks.render.tap("Test", (modules, option) => {
          expect(option.foo).toBe("bar");
          expect(modules).toEqual([{title: "hello"}]);
          return JSON.stringify(modules);
        }, (modules, option) => {
          expect(option.foo).toBe("bar");
          expect(modules).toBe(JSON.stringify([{title: "hello"}]));
        });
      }], {
        scope: "render",
        plugins: {
          test: {
            foo: "bar",
          },
        },
        modules: [{title: "hello"}],
      });
    });
  });

  describe("modules", () => {
    test("async", async () => {
      const scope = "async";
      const rawValue = [{path: "/"}];
      const modules = [Promise.resolve(rawValue), import("./fixtures/home")];
      await run([], {
        scope,
        modules,
      });
      const [parsed] = useParsed(scope);
      expect(parsed).toEqual(rawValue.concat(rawValue));
      const [rendered] = useRendered(scope);
      expect(rendered).toEqual(rawValue.concat(rawValue));
    });

    test("[{...}]", async () => {
      const scope = "[{...}]";
      const modules = [{path: "/"}];
      await run([], {
        scope,
        modules,
      });
      const [parsed] = useParsed(scope);
      expect(parsed).toEqual(modules);
      const [rendered] = useRendered(scope);
      expect(rendered).toEqual(modules);
    });

    test("[{...,[{...}]}]", async () => {
      const scope = "[{...,[{...}]}]";
      const modules = [{path: "/", modules: [{path: "/"}]}];
      await run([], {
        scope,
        modules,
      });
      const [parsed] = useParsed(scope);
      expect(parsed).toEqual(modules);
      const [rendered] = useRendered(scope);
      expect(rendered).toEqual(modules);
    });

    test("[[{...}]]", async () => {
      const scope = "[[{...}]]";
      const modules = [[{path: "/"}]];
      await run([], {
        scope,
        modules,
      });
      const [parsed] = useParsed(scope);
      expect(parsed).toEqual(modules[0]);
      const [rendered] = useRendered(scope);
      expect(rendered).toEqual(modules[0]);
    });
  });
});
