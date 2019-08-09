import "jest";
import Framework from "../src";

// tslint:disable: react-hooks-nesting

const defaultOptions = {
  version: "1.0.0",
  // 插件选项
  plugins: {},
  // 业务模块
  modules: [],
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
      scope: "framework-a-mount",
      container,
    };
  }
  const a = new A();
  expect((a as any).options).toEqual({
    ...defaultOptions,
    scope: "framework-a-mount",
    container,
  });
  await a.mount();
  expect(container.textContent).toBe("[]");
});
