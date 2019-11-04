import { Core } from "@spax/core";
import { render } from "@testing-library/react";
import React from "react";
import PluginAuth from "../src";

const blocks = [
  {
    authority: ["foo"],
    component: () => null,
    blocks: [
      {
        authority: ["bar"],
        component: () => null,
      },
    ],
  },
];

test("auth", async () => {
  const rendered = await new Core([PluginAuth], {
    auth: { useAuth: () => false, Forbidden: () => "403" },
  }).run(blocks);
  expect(rendered[0].authority).toEqual(["foo"]);
  expect(typeof rendered[0].component).toBe("function");
  expect(rendered[0].blocks[0].authority).toEqual(["bar"]);
  expect(typeof rendered[0].blocks[0].component).toBe("function");
  const C1 = rendered[0].component;
  const r1 = render(<C1 />);
  expect(r1.container.textContent).toBe("403");
  const C2 = rendered[0].blocks[0].component;
  const r2 = render(<C2 />);
  expect(r2.container.textContent).toBe("403");
});
