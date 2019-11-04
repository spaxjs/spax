import { Core } from "@spax/core";
import { render } from "@testing-library/react";
import React from "react";
import PluginLazy from "../src";

const blocks = [
  {
    lazy: () => import("./fixtures/foo"),
    blocks: [
      {
        lazy: () => import("./fixtures/bar"),
      },
    ],
  },
];

test("lazy", async () => {
  const rendered = await new Core([PluginLazy]).run(blocks);
  expect(rendered[0].lazy).toBe(null);
  expect(typeof rendered[0].component).toBe("function");
  expect(rendered[0].blocks[0].lazy).toBe(null);
  expect(typeof rendered[0].blocks[0].component).toBe("function");
  const C1 = rendered[0].component;
  const r1 = render(<C1 />);
  expect(r1.container.textContent).toBe("...");
  const C2 = rendered[0].blocks[0].component;
  const r2 = render(<C2 />);
  expect(r2.container.textContent).toBe("...");
});
