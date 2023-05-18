/**
 * Parse a possibly tagged string.
 * Example: "This is a comment that has tags @a @b:123"
 * returns: { comment: "This is a comment that has tags", tags: { a: true, b: '123' }}
 */
export declare const parse: (source: string) => {
  comment: string | undefined;
  tags: {
    [index: string]: boolean | string | string[];
  };
};

/**
 * Parse a possibly tagged string.
 * If the string has a syntax error according to the grammar,
 * no error is thrown. The string is returned as the comment part of the result.
 * Example: "This is a comment that has tags @a @b:123"
 * returns: { comment: "This is a comment that has tags", tags: { a: true, b: '123' }}
 */
export declare const tryParse: (source: string | null | undefined) => {
  comment: string | undefined;
  tags: {
    [index: string]: boolean | string | string[];
  };
};
