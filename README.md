# tagged-comment-parser

This is a simple parser for tagged comments.

It will turn a string like this: `@cached @alias:foo this comment is tagged!` into a dictionary like this:

```json
{
  "comment": "this comment is tagged!",
  "tags": {
    "cached": true,
    "alias": "foo"
  }
}
```

The tags can exist first or last in the comment.

## Syntax

Tags are always prefixed with an `@` character.

If you simply add a name, it will exist in the dictionary as a boolean set to true.

If you add a colon, you can specify a different value.

Finally, you can specify an array of values in parenthesis like so: `@config(12, "Some string value")`, which will result in the following dictionary:

```json
{
  "tags": {
    "config": [12, "Some string value"]
  }
}
```
