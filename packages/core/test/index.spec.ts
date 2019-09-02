import { act as actHook, renderHook } from "@testing-library/react-hooks";
import { cache, parseBlocks, run, runParse, runRender, useParsed, useRendered } from "../src";

// tslint:disable: react-hooks-nesting

beforeEach(() => {
  cache.clear();
});

describe("parseBlocks", () => {
  test("call before run", async () => {
    const parsed = await parseBlocks([], {});
    expect(parsed).toBe(undefined);
  });

  test("call after run", async () => {
    const parent = { path: "/", title: "L1", blocks: [{ path: "/", title: "L20" }] };
    const blocks = [{ path: "/", title: "L21" }, { path: "/", title: "L22" }];
    const rendered = await run([], { blocks: [parent] });
    expect(rendered[0].blocks.length).toBe(1);
    const parsed = await parseBlocks(blocks, rendered[0]);
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
      const ret2 = await run([["Blocks", [], ({ parse }) => {
        parse.tap((current) => {
          return { ...current };
        });
      }]], {
          blocks,
        });
      expect(ret2).toEqual(blocks);
      // not reference
      expect(ret2[0]).not.toBe(blocks[0]);
    });
  });

  describe("plugins", () => {
    test("options", async () => {
      await run([["Test", [], (hooks, option) => {
        hooks.init.tap(() => {
          expect(option.foo).toBe("bar");
        });
      }], ["Test2", [], (hooks, option) => {
        hooks.init.tap(() => {
          expect(option.foo).toBe(undefined);
        });
      }]], {
          plugins: {
            test: {
              foo: "bar",
            },
          },
          blocks: [],
        });
    });

    test("ordering", async () => {
      let index = 0;
      await run([["Test", [], (hooks) => {
        hooks.init.tap(() => {
          expect(index++).toBe(0);
        }, () => {
          expect(index++).toBe(3);
        });
      }], ["Test2", [], (hooks) => {
        hooks.init.tap(() => {
          expect(index++).toBe(1);
        }, () => {
          expect(index++).toBe(2);
        });
      }]], {
          blocks: [],
        });
    });

    describe("dependency", () => {
      test("simple", async () => {
        let index = 0;
        await run([["Test", ["Test2"], (hooks) => {
          hooks.init.tap(() => {
            expect(index++).toBe(1);
          }, () => {
            expect(index++).toBe(2);
          });
        }], ["Test2", [], (hooks) => {
          hooks.init.tap(() => {
            expect(index++).toBe(0);
          }, () => {
            expect(index++).toBe(3);
          });
        }]], {
            blocks: [],
          });
      });

      test("complicated", async () => {
        let index = 0;
        await run([["Test", ["Test2"], (hooks) => {
          hooks.init.tap(() => {
            expect(index++).toBe(1);
          }, () => {
            expect(index++).toBe(4);
          });
        }], ["Test2", [], (hooks) => {
          hooks.init.tap(() => {
            expect(index++).toBe(0);
          }, () => {
            expect(index++).toBe(5);
          });
        }], ["Test3", ["Test2"], (hooks) => {
          hooks.init.tap(() => {
            expect(index++).toBe(2);
          }, () => {
            expect(index++).toBe(3);
          });
        }]], {
            blocks: [],
          });
      });
    });

    describe("init", () => {
      test("pre", async () => {
        await run([["Test", [], (hooks, option) => {
          hooks.init.tap(() => {
            expect(option.foo).toBe("bar");
          });
        }]], {
            plugins: {
              test: {
                foo: "bar",
              },
            },
            blocks: [],
          });
      });

      test("post", async () => {
        await run([["Test", [], (hooks, option) => {
          hooks.init.tap(undefined, () => {
            expect(option.foo).toBe("bar");
          });
        }]], {
            plugins: {
              test: {
                foo: "bar",
              },
            },
            blocks: [],
          });
      });

      test("both", async () => {
        await run([["Test", [], (hooks, option) => {
          hooks.init.tap(() => {
            expect(option.foo).toBe("bar");
          }, () => {
            expect(option.foo).toBe("bar");
          });
        }]], {
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
      await run([["Test", [], (hooks, option) => {
        hooks.parse.tap((current, parent) => {
          expect(option.foo).toBe("bar");
          expect(current).toEqual({ title: "hello" });
          expect(parent).toEqual({});
          return {
            ...current,
            baz: "qux",
          };
        }, (current, parent) => {
          expect(option.foo).toBe("bar");
          expect(current).toEqual({ title: "hello", baz: "qux" });
          expect(parent).toEqual({});
        });
      }]], {
          plugins: {
            test: {
              foo: "bar",
            },
          },
          blocks: [{ title: "hello" }],
        });
    });

    test("render", async () => {
      await run([["Test", [], (hooks, option) => {
        hooks.render.tap((blocks) => {
          expect(option.foo).toBe("bar");
          expect(blocks).toEqual([{ title: "hello" }]);
          return JSON.stringify(blocks);
        }, (blocks) => {
          expect(option.foo).toBe("bar");
          expect(blocks).toBe(JSON.stringify([{ title: "hello" }]));
        });
      }]], {
          plugins: {
            test: {
              foo: "bar",
            },
          },
          blocks: [{ title: "hello" }],
        });
    });
  });

  describe("blocks", () => {
    test("async", async () => {
      const rawValue = [{ path: "/" }];
      const blocks = [Promise.resolve(rawValue), import("./fixtures/home")];
      await run([], {
        blocks,
      });
      const { result: resultParsed, unmount: unmountParsed } = renderHook(() => useParsed());
      expect(resultParsed.current[0]).toEqual(rawValue.concat(rawValue));
      const { result: resultRendered, unmount: unmountRendered } = renderHook(() => useRendered());
      expect(resultRendered.current[0]).toEqual(rawValue.concat(rawValue));
      unmountParsed();
      unmountRendered();
    });

    test("[{...}]", async () => {
      const blocks = [{ path: "/" }];
      await run([], {
        blocks,
      });
      const { result: resultParsed, unmount: unmountParsed } = renderHook(() => useParsed());
      expect(resultParsed.current[0]).toEqual(blocks);
      const { result: resultRendered, unmount: unmountRendered } = renderHook(() => useRendered());
      expect(resultRendered.current[0]).toEqual(blocks);
      unmountParsed();
      unmountRendered();
    });

    test("[{...,[{...}]}]", async () => {
      const blocks = [{ path: "/", blocks: [{ path: "/" }] }];
      await run([], {
        blocks,
      });
      const { result: resultParsed, unmount: unmountParsed } = renderHook(() => useParsed());
      expect(resultParsed.current[0]).toEqual(blocks);
      const { result: resultRendered, unmount: unmountRendered } = renderHook(() => useRendered());
      expect(resultRendered.current[0]).toEqual(blocks);
      unmountParsed();
      unmountRendered();
    });

    test("[[{...}]]", async () => {
      const blocks = [[{ path: "/" }]];
      await run([], {
        blocks,
      });
      const { result: resultParsed, unmount: unmountParsed } = renderHook(() => useParsed());
      expect(resultParsed.current[0]).toEqual(blocks[0]);
      const { result: resultRendered, unmount: unmountRendered } = renderHook(() => useRendered());
      expect(resultRendered.current[0]).toEqual(blocks[0]);
      unmountParsed();
      unmountRendered();
    });
  });
});

test("runParse", async () => {
  const { result, unmount } = renderHook(() => useParsed());
  expect(result.current[0]).toBe(undefined);
  await actHook(async () => {
    const ret = await run([], {
      blocks: [{ title: "foo" }],
    });
    expect(ret).toEqual([{ title: "foo" }]);
  });
  expect(result.current[0]).toBe(undefined);
  await actHook(async () => {
    const ret2 = await runParse([{ title: "bar" }]);
    expect(ret2).toEqual([{ title: "bar" }]);
  });
  expect(result.current[0]).toEqual([{ title: "bar" }]);
  unmount();
});

test("runRender", async () => {
  const { result, unmount } = renderHook(() => useRendered());
  expect(result.current[0]).toBe(undefined);
  await actHook(async () => {
    const ret = await run([], {
      blocks: [{ title: "foo" }],
    });
    expect(ret).toEqual([{ title: "foo" }]);
  });
  expect(result.current[0]).toBe(undefined);
  await actHook(async () => {
    const ret2 = await runRender([{ title: "bar" }]);
    expect(ret2).toEqual([{ title: "bar" }]);
  });
  expect(result.current[0]).toEqual([{ title: "bar" }]);
  unmount();
});
