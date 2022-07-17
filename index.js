const { parse, SyntaxError } = require("./parser");

const tryParse = (str) => {
  try {
    return parse(str);
  } catch (e) {
    return { comment: str || undefined, tags: {} };
  }
};

module.exports = {
  parse,
  tryParse,
  SyntaxError,
};
