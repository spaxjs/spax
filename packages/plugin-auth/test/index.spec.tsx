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

test("lazy", async () => {
  const rendered = await run([PluginAuth], { blocks });
  expect(rendered[0].lazy).toBe(null);
  expect(typeof rendered[0].component).toBe("function");
  expect(rendered[0].blocks[0].lazy).toBe(null);
  expect(typeof rendered[0].blocks[0].component).toBe("function");
  const C1 = rendered[0].component;
  const wrapper1 = mount(<C1 />);
  expect(wrapper1.text()).toBe("...");
  const C2 = rendered[0].blocks[0].component;
  const wrapper2 = mount(<C2 />);
  expect(wrapper2.text()).toBe("...");
});
