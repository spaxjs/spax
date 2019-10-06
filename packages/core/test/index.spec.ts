import { act as actHook, renderHook } from "@testing-library/react-hooks";
import {
  cache,
  run,
  useParsed,
  useRendered,
} from "../src";

// tslint:disable: react-hooks-nesting

beforeEach(() => {
  cache.clear();
});

describe("useParsed", () => {
  test("call before run", () => {
    const { result } = renderHook(() => useParsed());
    expect(result.current[0]).toBe(undefined);
  });

  test("call after run", async () => {
    await run([], {});
    const { result } = renderHook(() => useParsed());
    expect(result.current[0]).toEqual([]);
  });
});

describe("useRendered", () => {
  test("call before run", () => {
    const { result } = renderHook(() => useRendered());
    expect(result.current[0]).toBe(undefined);
  });

  test("call after run", async () => {
    await run([], {});
    const { result } = renderHook(() => useRendered());
    expect(result.current[0]).toEqual([]);
  });
});

describe("run", () => {
  test("twice", async () => {
    const ret = await run(undefined, {});
    const ret1 = await run(undefined, {});
    expect(ret).toEqual([]);
    expect(ret1).toEqual([]);
  });

  describe("returns", () => {
    test("plugins: undefined", async () => {
      const ret = await run(undefined, {});
      expect(ret).toEqual([]);
    });
    test("options: undefined", async () => {
      const ret = await run([]);
      expect(ret).toEqual([]);
    });
    test("blocks: undefined", async () => {
      const ret = await run([], {});
      expect(ret).toEqual([]);
    });
    test("blocks: []", async () => {
      const ret1 = await run([], {
        blocks: [],
      });
      expect(ret1).toEqual([]);
    });
    test("blocks: [{...}]", async () => {
      const blocks = [{ title: "hello" }];
      const ret2 = await run(
        [
          {
            name: "Blocks",
            deps: [],
            plug: ({ parse }) => {
              parse.tap(current => {
                return { ...current };
              });
            },
          },
        ],
        {
          blocks,
        },
      );
      expect(ret2).toEqual(blocks);
      // not reference
      expect(ret2[0]).not.toBe(blocks[0]);
    });
  });

  describe("plugins", () => {
    test("options", async () => {
      await run(
        [
          {
            name: "Test",
            deps: [],
            plug: (hooks, option) => {
              hooks.init.tap(() => {
                expect(option.foo).toBe("bar");
              });
            },
          },
          {
            name: "Test2",
            deps: [],
            plug: (hooks, option) => {
              hooks.init.tap(() => {
                expect(option.foo).toBe(undefined);
              });
            },
          },
        ],
        {
          plugins: {
            test: {
              foo: "bar",
            },
          },
          blocks: [],
        },
      );
    });

    test("ordering", async () => {
      let index = 0;
      await run(
        [
          {
            name: "Test",
            deps: [],
            plug: hooks => {
              hooks.init.tap(
                () => {
                  expect(index++).toBe(0);
                },
                () => {
                  expect(index++).toBe(3);
                },
              );
            },
          },
          {
            name: "Test2",
            deps: [],
            plug: hooks => {
              hooks.init.tap(
                () => {
                  expect(index++).toBe(1);
                },
                () => {
                  expect(index++).toBe(2);
                },
              );
            },
          },
        ],
        {
          blocks: [],
        },
      );
    });

    describe("dependency", () => {
      test("simple", async () => {
        let index = 0;
        await run(
          [
            {
              name: "Test",
              deps: ["Test2"],
              plug: hooks => {
                hooks.init.tap(
                  () => {
                    expect(index++).toBe(1);
                  },
                  () => {
                    expect(index++).toBe(2);
                  },
                );
              },
            },
            {
              name: "Test2",
              deps: [],
              plug: hooks => {
                hooks.init.tap(
                  () => {
                    expect(index++).toBe(0);
                  },
                  () => {
                    expect(index++).toBe(3);
                  },
                );
              },
            },
          ],
          {
            blocks: [],
          },
        );
      });

      test("complicated", async () => {
        let index = 0;
        await run(
          [
            {
              name: "Test",
              deps: ["Test2"],
              plug: hooks => {
                hooks.init.tap(
                  () => {
                    expect(index++).toBe(1);
                  },
                  () => {
                    expect(index++).toBe(4);
                  },
                );
              },
            },
            {
              name: "Test2",
              deps: [],
              plug: hooks => {
                hooks.init.tap(
                  () => {
                    expect(index++).toBe(0);
                  },
                  () => {
                    expect(index++).toBe(5);
                  },
                );
              },
            },
            {
              name: "Test3",
              deps: ["Test2"],
              plug: hooks => {
                hooks.init.tap(
                  () => {
                    expect(index++).toBe(2);
                  },
                  () => {
                    expect(index++).toBe(3);
                  },
                );
              },
            },
          ],
          {
            blocks: [],
          },
        );
      });
    });

    describe("init", () => {
      test("pre", async () => {
        await run(
          [
            {
              name: "Test",
              deps: [],
              plug: (hooks, option) => {
                hooks.init.tap(() => {
                  expect(option.foo).toBe("bar");
                });
              },
            },
          ],
          {
            plugins: {
              test: {
                foo: "bar",
              },
            },
            blocks: [],
          },
        );
      });

      test("post", async () => {
        await run(
          [
            {
              name: "Test",
              deps: [],
              plug: (hooks, option) => {
                hooks.init.tap(undefined, () => {
                  expect(option.foo).toBe("bar");
                });
              },
            },
          ],
          {
            plugins: {
              test: {
                foo: "bar",
              },
            },
            blocks: [],
          },
        );
      });

      test("both", async () => {
        await run(
          [
            {
              name: "Test",
              deps: [],
              plug: (hooks, option) => {
                hooks.init.tap(
                  () => {
                    expect(option.foo).toBe("bar");
                  },
                  () => {
                    expect(option.foo).toBe("bar");
                  },
                );
              },
            },
          ],
          {
            plugins: {
              test: {
                foo: "bar",
              },
            },
            blocks: [],
          },
        );
      });
    });

    test("parse", async () => {
      await run(
        [
          {
            name: "Test",
            deps: [],
            plug: (hooks, option) => {
              hooks.parse.tap(
                (current, parent) => {
                  expect(option.foo).toBe("bar");
                  expect(current).toEqual({ title: "hello" });
                  expect(parent).toEqual({});
                  return {
                    ...current,
                    baz: "qux",
                  };
                },
                (current, parent) => {
                  expect(option.foo).toBe("bar");
                  expect(current).toEqual({ title: "hello", baz: "qux" });
                  expect(parent).toEqual({});
                },
              );
            },
          },
        ],
        {
          plugins: {
            test: {
              foo: "bar",
            },
          },
          blocks: [{ title: "hello" }],
        },
      );
    });

    test("render", async () => {
      await run(
        [
          {
            name: "Test",
            deps: [],
            plug: (hooks, option) => {
              hooks.render.tap(
                blocks => {
                  expect(option.foo).toBe("bar");
                  expect(blocks).toEqual([{ title: "hello" }]);
                  return JSON.stringify(blocks);
                },
                blocks => {
                  expect(option.foo).toBe("bar");
                  expect(blocks).toBe(JSON.stringify([{ title: "hello" }]));
                },
              );
            },
          },
        ],
        {
          plugins: {
            test: {
              foo: "bar",
            },
          },
          blocks: [{ title: "hello" }],
        },
      );
    });
  });

  describe("blocks", () => {
    test("async", async () => {
      const rawValue = [{ path: "/" }];
      const blocks = [Promise.resolve(rawValue), import("./fixtures/home")];
      await run([], {
        blocks,
      });
      const { result: resultParsed, unmount: unmountParsed } = renderHook(() =>
        useParsed(),
      );
      expect(resultParsed.current[0]).toEqual(rawValue.concat(rawValue));
      const { result: resultRendered, unmount: unmountRendered } = renderHook(
        () => useRendered(),
      );
      expect(resultRendered.current[0]).toEqual(rawValue.concat(rawValue));
      unmountParsed();
      unmountRendered();
    });

    test("[{...}]", async () => {
      const blocks = [{ path: "/" }];
      await run([], {
        blocks,
      });
      const { result: resultParsed, unmount: unmountParsed } = renderHook(() =>
        useParsed(),
      );
      expect(resultParsed.current[0]).toEqual(blocks);
      const { result: resultRendered, unmount: unmountRendered } = renderHook(
        () => useRendered(),
      );
      expect(resultRendered.current[0]).toEqual(blocks);
      unmountParsed();
      unmountRendered();
    });

    test("[{...,[{...}]}]", async () => {
      const blocks = [{ path: "/", blocks: [{ path: "/" }] }];
      await run([], {
        blocks,
      });
      const { result: resultParsed, unmount: unmountParsed } = renderHook(() =>
        useParsed(),
      );
      expect(resultParsed.current[0]).toEqual(blocks);
      const { result: resultRendered, unmount: unmountRendered } = renderHook(
        () => useRendered(),
      );
      expect(resultRendered.current[0]).toEqual(blocks);
      unmountParsed();
      unmountRendered();
    });

    test("[[{...}]]", async () => {
      const blocks = [[{ path: "/" }]];
      await run([], {
        blocks,
      });
      const { result: resultParsed, unmount: unmountParsed } = renderHook(() =>
        useParsed(),
      );
      expect(resultParsed.current[0]).toEqual(blocks[0]);
      const { result: resultRendered, unmount: unmountRendered } = renderHook(
        () => useRendered(),
      );
      expect(resultRendered.current[0]).toEqual(blocks[0]);
      unmountParsed();
      unmountRendered();
    });
  });
});
