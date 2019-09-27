import { run } from "@spax/core";
import { mount } from "enzyme";
import React from "react";
import PluginAuth from "../src";

const blocks = [
  {
    authority: ["foo"],
    blocks: [
      {
        authority: ["bar"],
      },
    ],
  },
];

test("auth", async () => {
  const rendered = await run([PluginAuth], { blocks, plugins: { auth: { Forbidden: () => "403" }} });
  expect(rendered[0].authority).toEqual(["foo"]);
  expect(typeof rendered[0].component).toBe("function");
  expect(rendered[0].blocks[0].authority).toEqual(["bar"]);
  expect(typeof rendered[0].blocks[0].component).toBe("function");
  const C1 = rendered[0].component;
  const wrapper1 = mount(<C1 />);
  expect(wrapper1.text()).toBe("403");
  const C2 = rendered[0].blocks[0].component;
  const wrapper2 = mount(<C2 />);
  expect(wrapper2.text()).toBe("403");
});
