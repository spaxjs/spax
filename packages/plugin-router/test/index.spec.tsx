import { Core } from "@spax/core";
import { render } from "@testing-library/react";
import React from "react";
import PluginRouter from "../src";

const C = ({ path }) => <p>{path}</p>;

const blocks = [
  {
    path: "/foo",
    component: C,
    blocks: [
      {
        path: "/foo/bar",
        component: C,
      },
    ],
  },
  {
    path: "/bar",
    component: C,
  },
  {
    path: "/buz",
    component: C,
  },
];

describe("router", () => {

  test("should render foo", async () => {
    const rendered: any = await new Core([PluginRouter]).run(blocks);
    location.hash = "/foo";
    const { container } = render(rendered);
    expect(container.textContent).toBe("/foo");
  });

  test("should render bar", async () => {
    const rendered: any = await new Core([PluginRouter]).run(blocks);
    location.hash = "/bar";
    const { container } = render(rendered);
    expect(container.textContent).toBe("/bar");
  });

  test("should render buz", async () => {
    const rendered: any = await new Core([PluginRouter]).run(blocks);
    location.hash = "/buz";
    const { container } = render(rendered);
    expect(container.textContent).toBe("/buz");
  });

  test("should render foo/bar", async () => {
    const rendered: any = await new Core([PluginRouter]).run(blocks);
    location.hash = "/foo/bar";
    const { container } = render(rendered);
    expect(container.textContent).toBe("/foo/bar");
  });
});
