import "jest";
import Framework from "../src";

// tslint:disable: react-hooks-nesting

const defaultOptions = {
  version: "1.0.0",
  // 插件选项
  plugins: {},
  // 业务模块
  blocks: [],
  container: "#root",
};

describe("extends", () => {
  test("properties", () => {
    class A extends Framework {}
    expect(A.plugins).toEqual([]);
    expect(A.options).toEqual(defaultOptions);
    const a = new A();
    expect((a as any).plugins).toEqual([]);
    expect((a as any).options).toEqual(defaultOptions);
  });
});

test("mount", async () => {
  const container = document.createElement("div");
  class A extends Framework {
    static options = {
      container,
    };
  }
  const a = new A();
  expect((a as any).options).toEqual({
    ...defaultOptions,
    container,
  });
  await a.mount();
  expect(container.textContent).toBe("[]");
});

test("mount(callback)", async () => {
  const container = document.createElement("div");
  class C extends Framework {
    static options = {
      container,
    };
  }
  const c = new C();
  expect((c as any).options).toEqual({
    ...defaultOptions,
    container,
  });

  let called = false;

  await c.mount(() => {
    called = true;
  });

  expect(called).toBe(true);
});

test("mount(error)", async () => {
  class B extends Framework {
    static options = {
    };
  }
  const b = new B();
  expect((b as any).options).toEqual({
    ...defaultOptions,
  });

  let thrown = false;

  try {
    await b.mount();
  } catch (error) {
    thrown = true;
  }

  expect(thrown).toBe(true);
});
