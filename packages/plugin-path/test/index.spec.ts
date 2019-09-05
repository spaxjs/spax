import { run } from "@spax/core";
import PluginPath from "../src";

const blocks = [
  {
    blocks: [
      {
        path: "foo",
        blocks: [
          {
            path: "bar",
          },
        ],
      },
    ],
  },
];

test("path", async () => {
  const rendered = await run([PluginPath], { blocks });
  expect(rendered[0].path).toBe("");
  expect(rendered[0].blocks[0].path).toBe("/foo");
  expect(rendered[0].blocks[0].blocks[0].path).toBe("/foo/bar");
});
