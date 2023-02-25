# tagged-comment-parser

This is a simple parser for tagged comments.

```js
import { parse, tryParse } from "tagged-comment-parser";

const result = parse("@cached @alias:foo this comment is tagged!");
/*
result:
{
  "comment": "this comment is tagged!",
  "tags": {
    "cached": true,
    "alias": "foo"
  }
}
*/

// If you want to avoid exceptions, use tryParse
const result = tryParse(null);
/*
result:
{
  "comment": undefined,
  "tags": {}
}
*/
```

The tags can appear as the first xor last part of the string.

## Syntax

- `'@tag'` (no value specified): `tag` will have a value of `true`
- `'@tag:something'` (value after colon): `tag` will be the string `'something'`
- `'@tag(12, "some string")'` (parentheses with multiple values): `tag` will be the array `["12", "some string"]`
