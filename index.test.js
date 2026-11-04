const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const { parse, tryParse } = require(".");

describe("parse", () => {
  it("should return a simple string", () => {
    assert.deepEqual(parse("Hello"), { comment: "Hello", tags: {} });
  });

  it("should extract tags", () => {
    assert.deepEqual(parse("Organization member @fixed"), {
      comment: "Organization member",
      tags: { fixed: true },
    });

    assert.deepEqual(parse("@fixed Organization member"), {
      comment: "Organization member",
      tags: { fixed: true },
    });

    assert.deepEqual(parse("Organization member @order:1 @key:yellow"), {
      comment: "Organization member",
      tags: { order: "1", key: "yellow" },
    });

    assert.deepEqual(parse("Organization member @order:1 @order:2"), {
      comment: "Organization member",
      tags: { order: "2" },
    });

    assert.deepEqual(
      parse("@stringified_tag:'\"Special\" characters in here! $@<> ...'"),
      {
        comment: undefined,
        tags: {
          stringified_tag: '"Special" characters in here! $@<> ...',
        },
      }
    );

    assert.deepEqual(
      parse('@parameterized_tag(param1, "Second parameter", 3)'),
      {
        comment: undefined,
        tags: {
          parameterized_tag: ["param1", "Second parameter", "3"],
        },
      }
    );
  });
});

describe("tryParse", () => {
  it("should work as expected with a non-tagged string", () => {
    assert.deepEqual(tryParse("Hello"), {
      comment: "Hello",
      tags: {},
    });
  });

  it("should work as expected with a tagged string", () => {
    assert.deepEqual(tryParse("Organization member @fixed"), {
      comment: "Organization member",
      tags: { fixed: true },
    });
  });

  it("should not throw when input has a syntax error", () => {
    assert.deepEqual(tryParse("Organization member @broken-tag("), {
      comment: "Organization member @broken-tag(",
      tags: {},
    });
  });

  it("should return undefined when given null", () => {
    assert.deepEqual(tryParse(null), {
      comment: undefined,
      tags: {},
    });
  });

  it("should return undefined when given undefined", () => {
    assert.deepEqual(tryParse(undefined), {
      comment: undefined,
      tags: {},
    });
  });
});
