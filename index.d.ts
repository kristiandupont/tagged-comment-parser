/**
 * Parse a possibly tagged string.
 * Example: "This is a comment that has tags @a @b:123"
 * returns: { comment: "This is a comment that has tags", tags: { a: true, b: '123' }}
 */
export declare const parse: (source: string) => {
  comment?: string | undefined;
  tags?: {
    [index: string]: boolean | string | string[];
  };
};
