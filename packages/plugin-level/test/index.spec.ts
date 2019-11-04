import { Core } from "@spax/core";
import PluginLevel from "../src";

const blocks = [
  {
    title: "foo",
    blocks: [
      {
        title: "bar",
      },
    ],
  },
];

const blocksProcessed = [
  {
    title: "foo",
    level: 1,
    blocks: [
      {
        title: "bar",
        level: 2,
      },
    ],
  },
];

test("level", async () => {
  const rendered = await new Core([PluginLevel]).run(blocks);
  expect(rendered).toEqual(blocksProcessed);
});
