import { describe, expect, it } from "vitest";

import { parse, tryParse } from ".";

describe("parse", () => {
  it("should return a simple string", () => {
    expect(parse("Hello")).toEqual({ comment: "Hello", tags: {} });
  });

  it("should extract tags", () => {
    expect(parse("Organization member @fixed")).toEqual({
      comment: "Organization member",
      tags: { fixed: true },
    });

    expect(parse("@fixed Organization member")).toEqual({
      comment: "Organization member",
      tags: { fixed: true },
    });

    expect(parse("Organization member @order:1 @key:yellow")).toEqual({
      comment: "Organization member",
      tags: { order: "1", key: "yellow" },
    });

    expect(parse("Organization member @order:1 @order:2")).toEqual({
      comment: "Organization member",
      tags: { order: "2" },
    });

    expect(
      parse("@stringified_tag:'\"Special\" characters in here! $@<> ...'")
    ).toEqual({
      comment: undefined,
      tags: {
        stringified_tag: '"Special" characters in here! $@<> ...',
      },
    });

    expect(parse('@parameterized_tag(param1, "Second parameter", 3)')).toEqual({
      comment: undefined,
      tags: {
        parameterized_tag: ["param1", "Second parameter", "3"],
      },
    });
  });
});

describe("tryParse", () => {
  it("should work as expected with a non-tagged string", () => {
    expect(tryParse("Hello")).toEqual({
      comment: "Hello",
      tags: {},
    });
  });

  it("should work as expected with a tagged string", () => {
    expect(tryParse("Organization member @fixed")).toEqual({
      comment: "Organization member",
      tags: { fixed: true },
    });
  });

  it("should not throw when input has a syntax error", () => {
    expect(tryParse("Organization member @broken-tag(")).toEqual({
      comment: "Organization member @broken-tag(",
      tags: {},
    });
  });

  it("should return undefined when given null", () => {
    expect(tryParse(null)).toEqual({
      comment: undefined,
      tags: {},
    });
  });

  it("should return undefined when given undefined", () => {
    expect(tryParse(undefined)).toEqual({
      comment: undefined,
      tags: {},
    });
  });
});
