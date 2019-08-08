import "jest";
import { mount, useParsed, useRendered } from "../src/core";

// tslint:disable: react-hooks-nesting

test("useParsed", () => {
  const [parsed] = useParsed();
  expect(parsed).toBe(undefined);
});

test("useRendered", () => {
  const [rendered] = useRendered();
  expect(rendered).toBe(undefined);
});

test("mount(empty)", async () => {
  const root = document.createElement("div");
  await mount([], {
    modules: [],
    container: root,
  });
  const [parsed] = useParsed();
  expect(parsed).toEqual([]);
  const [rendered] = useRendered();
  expect(rendered).toEqual([]);
  expect(root.textContent).toEqual(`[]`);
});

// test("mount(plugins)", async () => {
//   const root = document.createElement("div");
//   await mount([(hooks) => {
//     console.log(hooks);
//   }], {
//     modules: [],
//     container: root,
//   });
//   const [parsed] = useParsed();
//   expect(parsed).toEqual([]);
//   const [rendered] = useRendered();
//   expect(rendered).toEqual([]);
//   expect(root.textContent).toEqual(`[]`);
// });

test("mount(modules)", async () => {
  const root = document.createElement("div");
  await mount([], {
    modules: [{path: "/"}],
    container: root,
  });
  const [parsed] = useParsed();
  expect(parsed).toEqual([{path: "/"}]);
  const [rendered] = useRendered();
  expect(rendered).toEqual([{path: "/"}]);
  expect(root.textContent).toEqual(JSON.stringify([{path: "/"}], null, 2));
});
