import { Core } from "../src/core";
import { InitHook, ParseHook, RenderHook } from "../src/hooks";
import { IBlock, IOptions, IPlugin } from "../src/types";

describe("parse", () => {
  const core = new Core();

  test("undefined", async () => {
    const ret = await core.run();
    expect(ret).toEqual([]);
  });

  test("empty array", async () => {
    const ret = await core.run([]);
    expect(ret).toEqual([]);
  });

  test("[{...}]", async () => {
    const blocks = [{ title: "hello" }];
    const ret = await core.run(blocks);
    expect(ret[0]).toEqual(blocks[0]);
  });

  test("[[{...}]]", async () => {
    const blocks = [[{ title: "hello" }]];
    const ret = await core.run(blocks);
    expect(ret[0]).toEqual(blocks[0][0]);
  });

  test("[[import<{...}>]]", async () => {
    const p = import("./fixtures/p");
    const q = require("./fixtures/q");
    const blocks = [[p, q]];
    const ret = await core.run(blocks);
    expect(ret[0].title).toEqual("hello");
    expect(ret[1].title).toEqual("world");
  });
});

describe("plugins", () => {
  test("should have injected parameters", async () => {
    const plugins: IPlugin[] = [
      {
        name: "Test",
        plug: (hooks, option, _options) => {
          expect(hooks.init instanceof InitHook).toBe(true);
          expect(hooks.parse instanceof ParseHook).toBe(true);
          expect(hooks.render instanceof RenderHook).toBe(true);
          expect(option).toEqual(options.test);
          expect(_options).toEqual(options);
        },
      },
      {
        name: "Test2",
        plug: (hooks, option, _options) => {
          expect(hooks.init instanceof InitHook).toBe(true);
          expect(hooks.parse instanceof ParseHook).toBe(true);
          expect(hooks.render instanceof RenderHook).toBe(true);
          expect(option).toEqual({});
          expect(_options).toEqual(options);
        },
      },
    ];
    const options = {
      test: {
        foo: "bar",
      },
    };
    await new Core(plugins, options).run();
  });

  test("should execute in order", async () => {
    let index = 0;
    const core = new Core([
      {
        name: "Test",
        plug: hooks => {
          expect(index++).toBe(0);
          hooks.init.tap(
            () => {
              expect(index++).toBe(4);
            },
            () => {
              expect(index++).toBe(9);
            },
          );
        },
      },
      {
        name: "Test2",
        plug: hooks => {
          expect(index++).toBe(1);
          hooks.init.tap(
            () => {
              expect(index++).toBe(5);
            },
            () => {
              expect(index++).toBe(8);
            },
          );
        },
      },
      {
        name: "Test3",
        plug: hooks => {
          expect(index++).toBe(2);
          hooks.init.tap(
            null,
            () => {
              expect(index++).toBe(7);
            },
          );
        },
      },
      {
        name: "Test4",
        plug: hooks => {
          expect(index++).toBe(3);
          hooks.init.tap(
            () => {
              expect(index++).toBe(6);
            },
          );
        },
      },
    ]);
    await core.run();
  });

  test("should sort by dependencies", async () => {
    let index = 0;
    const plugins: IPlugin[] = [
      {
        name: "Test",
        deps: ["Test2"],
        plug: hooks => {
          expect(index++).toBe(1);
          hooks.init.tap(
            () => {
              expect(index++).toBe(4);
            },
            () => {
              expect(index++).toBe(7);
            },
          );
        },
      },
      {
        name: "Test2",
        plug: hooks => {
          expect(index++).toBe(0);
          hooks.init.tap(
            () => {
              expect(index++).toBe(3);
            },
            () => {
              expect(index++).toBe(8);
            },
          );
        },
      },
      {
        name: "Test3",
        deps: ["Test2"],
        plug: hooks => {
          expect(index++).toBe(2);
          hooks.init.tap(
            () => {
              expect(index++).toBe(5);
            },
            () => {
              expect(index++).toBe(6);
            },
          );
        },
      },
    ];
    await new Core(plugins).run();
  });

  describe("parse", () => {
    test("should have inject current and parent", async () => {
      const plugins: IPlugin[] = [
        {
          name: "Test",
          plug: (hooks, option) => {
            hooks.parse.tap(
              (current, parent) => {
                if (current.title === "hello") {
                  expect(current).toEqual(blocks[0]);
                  expect(parent).toEqual({});
                } else if (current.title === "world") {
                  expect(parent).toEqual({
                    ...blocks[0],
                    baz: "qux",
                  });
                }
                return {
                  ...current,
                  baz: "qux",
                };
              },
              (current, parent) => {
                expect(current.baz).toEqual("qux");
                expect(parent.baz).toEqual(
                  current.title === "hello" ? undefined : "qux",
                );
              },
            );
          },
        },
      ];
      const options: IOptions = {
        test: {
          foo: "bar",
        },
      };
      const blocks: IBlock[] = [
        { title: "hello", blocks: [{ title: "world" }] },
      ];
      await new Core(plugins, options).run(blocks);
    });
  });

  describe("render", () => {
    test("should have injected blocks", async () => {
      const plugins: IPlugin[] = [
        {
          name: "Test",
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
      ];
      const options: IOptions = {
        test: {
          foo: "bar",
        },
      };
      await new Core(plugins, options).run([{ title: "hello" }]);
    });
  });
});
