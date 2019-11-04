import { IPlugin } from "@spax/core";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { useContext } from "../src/context";
import { Framework } from "../src/framework";

function createContainer() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  return div;
}

describe("extends", () => {
  test("should inherit static properties from parent class", () => {
    class F extends Framework {
      static options = {
        test: {
          container: "#app",
        },
      };
    }
    expect(F.plugins).toEqual([]);
    expect(F.options).toEqual({
      test: {
        container: "#app",
      },
    });
    const f = new F({
      test: {
        version: "2.0.0",
      },
    });
    expect((f as any).plugins).toEqual([]);
    expect((f as any).options).toEqual({
      test: {
        container: "#app",
        version: "2.0.0",
      },
    });
  });
});

describe("getApp", () => {
  test("should return to container", async () => {
    class F extends Framework { }
    const f = new F();
    const App = await f.getApp([]);
    const r = render(<App />);
    expect(r.container.textContent).toBe("[]");
  });

  test("should have separated context", async () => {
    const Consumer = function ({ p }) {
      const c = useContext();
      return (
        <>
          <p role="title">{p}</p>
          <p role="message">{c.p}{c[p]}</p>
          <button role="button"
            onClick={() => {
              c.setContext({ p, [p]: p });
            }}
          >click me</button>
        </>
      );
    };
    const plugins = [{
      name: "test",
      // tslint:disable-next-line: no-shadowed-variable
      plug: ({ parse, render }) => {
        parse.tap((block) => {
          return {
            ...block,
            C: Consumer,
          };
        });
        render.tap((blocks) => {
          return (
            <>
              {blocks.map(({ title, C }) => {
                return <C key={title} p={title} />;
              })}
            </>
          );
        });
      },
    }];
    class F extends Framework {
      static plugins: IPlugin[] = plugins;
    }
    const f = new F();
    // a
    const AppA = await f.getApp([{ title: "a" }]);
    const ra = render(<AppA />, {
      container: createContainer(),
    });
    expect(ra.getByRole("title").textContent).toBe("a");
    expect(ra.getByRole("message").textContent).toBe("");
    fireEvent.click(ra.getByText("click me"));
    expect(ra.getByRole("message").textContent).toBe("aa");
    // b
    const AppB = await f.getApp([{ title: "b" }]);
    const rb = render(<AppB />, {
      container: createContainer(),
    });
    expect(rb.getByRole("title").textContent).toBe("b");
    expect(rb.getByRole("message").textContent).toBe("");
    fireEvent.click(rb.getByText("click me"));
    expect(rb.getByRole("message").textContent).toBe("bb");
  });

  test("should have shared context", async () => {
    const Consumer = function ({ p }) {
      const c = useContext();
      return (
        <>
          <p role={`title-${p}`}>{p}</p>
          <p role={`message-${p}`}>{c.p}{c[p]}</p>
          <button role={`button-${p}`}
            onClick={() => {
              c.setContext({ p, [p]: p });
            }}
          >click me {p}</button>
        </>
      );
    };
    const plugins = [{
      name: "test",
      // tslint:disable-next-line: no-shadowed-variable
      plug: ({ parse, render }) => {
        parse.tap((block) => {
          return {
            ...block,
            C: Consumer,
          };
        });
        render.tap((blocks) => {
          return (
            <>
              {blocks.map(({ title, C }) => {
                return <C key={title} p={title} />;
              })}
            </>
          );
        });
      },
    }];
    class F extends Framework {
      static plugins: IPlugin[] = plugins;
    }
    const f = new F();
    // a
    const App = await f.getApp([{ title: "a" }, { title: "b" }]);
    const r = render(<App />, {
      container: createContainer(),
    });
    expect(r.getByRole("title-a").textContent).toBe("a");
    expect(r.getByRole("message-a").textContent).toBe("");
    expect(r.getByRole("title-b").textContent).toBe("b");
    expect(r.getByRole("message-b").textContent).toBe("");
    fireEvent.click(r.getByText("click me a"));
    fireEvent.click(r.getByText("click me b"));
    expect(r.getByRole("message-a").textContent).toBe("ba");
    expect(r.getByRole("message-b").textContent).toBe("bb");
  });
});
