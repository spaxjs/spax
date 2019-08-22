import { renderHook } from "@testing-library/react-hooks";
import { parseBlocks, run, useParsed, useRendered } from "../src";

// tslint:disable: react-hooks-nesting

describe("parseBlocks", () => {
  test("call before run", async () => {
    const parsed = await parseBlocks([], {});
    expect(parsed).toBe(undefined);
  });

  test("call after run", async () => {
    const scope = "parseBlocks";
    const parent = {path: "/", title: "L1", blocks: [{path: "/", title: "L20"}]};
    const blocks = [{path: "/", title: "L21"}, {path: "/", title: "L22"}];
    const rendered = await run([], { scope, blocks: [parent]});
    expect(rendered[0].blocks.length).toBe(1);
    const parsed = await parseBlocks(blocks, rendered[0], scope);
    expect(parsed).toEqual(blocks);
    expect(rendered[0].blocks.length).toBe(2);
  });
});

describe("useParsed", () => {
  test("call before run", () => {
    const { result } = renderHook(() => useParsed());
    expect(result.current[0]).toBe(undefined);
  });

  test("call after run", async () => {
    await run([], { scope: "useParsed" });
    const { result } = renderHook(() => useParsed("useParsed"));
    expect(result.current[0]).toEqual([]);
  });
});

describe("useRendered", () => {
  test("call before run", () => {
    const { result } = renderHook(() => useRendered());
    expect(result.current[0]).toBe(undefined);
  });

  test("call after run", async () => {
    await run([], { scope: "useRendered" });
    const { result } = renderHook(() => useRendered("useRendered"));
    expect(result.current[0]).toEqual([]);
  });
});

describe("run", () => {
  describe("returns", () => {
    test("blocks: undefined", async () => {
      const ret = await run([], {
        scope: "ret",
      });
      expect(ret).toEqual([]);
    });
    test("blocks: []", async () => {
      const ret1 = await run([], {
        scope: "ret1",
        blocks: [],
      });
      expect(ret1).toEqual([]);
    });
    test("blocks: [{...}]", async () => {
      const blocks = [{title: "hello"}];
      const ret2 = await run([({ parse }) => {
        parse.tap("Blocks", [], (current) => {
          return {...current};
        });
      }], {
        scope: "ret2",
        blocks,
      });
      expect(ret2).toEqual(blocks);
      // not reference
      expect(ret2[0]).not.toBe(blocks[0]);
    });
  });

  test("scope", async () => {
    expect(await run([], {})).toEqual([]);
    // should show error
    expect(await run([], {})).toBe(undefined);
  });

  describe("plugins", () => {
    test("ordering", async () => {
      let index = 0;
      await run([(hooks) => {
        hooks.init.tap("Test", [], () => {
          expect(index++).toBe(0);
        }, () => {
          expect(index++).toBe(3);
        });
        hooks.init.tap("Test2", [], () => {
          expect(index++).toBe(1);
        }, () => {
          expect(index++).toBe(2);
        });
      }], {
        scope: "ordering",
        blocks: [],
      });
    });

    describe("dependency", () => {
      test("simple", async () => {
        let index = 0;
        await run([(hooks) => {
          hooks.init.tap("Test", ["Test2"], () => {
            expect(index++).toBe(1);
          }, () => {
            expect(index++).toBe(2);
          });
          hooks.init.tap("Test2", [], () => {
            expect(index++).toBe(0);
          }, () => {
            expect(index++).toBe(3);
          });
        }], {
          scope: "dependency-simple",
          blocks: [],
        });
      });
      test("complicated", async () => {
        let index = 0;
        await run([(hooks) => {
          hooks.init.tap("Test", ["Test2"], () => {
            expect(index++).toBe(1);
          }, () => {
            expect(index++).toBe(4);
          });
          hooks.init.tap("Test2", [], () => {
            expect(index++).toBe(0);
          }, () => {
            expect(index++).toBe(5);
          });
          hooks.init.tap("Test3", ["Test2"], () => {
            expect(index++).toBe(2);
          }, () => {
            expect(index++).toBe(3);
          });
        }], {
          scope: "dependency-complicated",
          blocks: [],
        });
      });
    });

    describe("init", () => {
      test("pre", async () => {
        await run([(hooks) => {
          hooks.init.tap("Test", [], (option) => {
            expect(option.foo).toBe("bar");
          });
        }], {
          scope: "init-pre",
          plugins: {
            test: {
              foo: "bar",
            },
          },
          blocks: [],
        });
      });
      test("post", async () => {
        await run([(hooks) => {
          hooks.init.tap("Test", [], undefined, (option) => {
            expect(option.foo).toBe("bar");
          });
        }], {
          scope: "init-post",
          plugins: {
            test: {
              foo: "bar",
            },
          },
          blocks: [],
        });
      });
      test("both", async () => {
        await run([(hooks) => {
          hooks.init.tap("Test", [], (option) => {
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
          blocks: [],
        });
      });
    });

    test("parse", async () => {
      await run([(hooks) => {
        hooks.parse.tap("Test", [], (current, parent, option) => {
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
        blocks: [{title: "hello"}],
      });
    });

    test("render", async () => {
      await run([(hooks) => {
        hooks.render.tap("Test", [], (blocks, option) => {
          expect(option.foo).toBe("bar");
          expect(blocks).toEqual([{title: "hello"}]);
          return JSON.stringify(blocks);
        }, (blocks, option) => {
          expect(option.foo).toBe("bar");
          expect(blocks).toBe(JSON.stringify([{title: "hello"}]));
        });
      }], {
        scope: "render",
        plugins: {
          test: {
            foo: "bar",
          },
        },
        blocks: [{title: "hello"}],
      });
    });
  });

  describe("blocks", () => {
    test("async", async () => {
      const scope = "async";
      const rawValue = [{path: "/"}];
      const blocks = [Promise.resolve(rawValue), import("./fixtures/home")];
      await run([], {
        scope,
        blocks,
      });
      const { result: resultParsed } = renderHook(() => useParsed(scope));
      expect(resultParsed.current[0]).toEqual(rawValue.concat(rawValue));
      const { result: resultRendered } = renderHook(() => useRendered(scope));
      expect(resultRendered.current[0]).toEqual(rawValue.concat(rawValue));
    });

    test("[{...}]", async () => {
      const scope = "[{...}]";
      const blocks = [{path: "/"}];
      await run([], {
        scope,
        blocks,
      });
      const { result: resultParsed } = renderHook(() => useParsed(scope));
      expect(resultParsed.current[0]).toEqual(blocks);
      const { result: resultRendered } = renderHook(() => useRendered(scope));
      expect(resultRendered.current[0]).toEqual(blocks);
    });

    test("[{...,[{...}]}]", async () => {
      const scope = "[{...,[{...}]}]";
      const blocks = [{path: "/", blocks: [{path: "/"}]}];
      await run([], {
        scope,
        blocks,
      });
      const { result: resultParsed } = renderHook(() => useParsed(scope));
      expect(resultParsed.current[0]).toEqual(blocks);
      const { result: resultRendered } = renderHook(() => useRendered(scope));
      expect(resultRendered.current[0]).toEqual(blocks);
    });

    test("[[{...}]]", async () => {
      const scope = "[[{...}]]";
      const blocks = [[{path: "/"}]];
      await run([], {
        scope,
        blocks,
      });
      const { result: resultParsed } = renderHook(() => useParsed(scope));
      expect(resultParsed.current[0]).toEqual(blocks[0]);
      const { result: resultRendered } = renderHook(() => useRendered(scope));
      expect(resultRendered.current[0]).toEqual(blocks[0]);
    });
  });
});
