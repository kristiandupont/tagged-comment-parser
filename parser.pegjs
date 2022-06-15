start
  = comment:text tags:tags { return { comment, tags } }
  / tags:tags comment:text { return { comment, tags } }
  / tags:tags { return { comment: undefined, tags } }
  / comment:text { return { comment, tags: {} } }

tags
  = tag:tag " " rest:tags { return { ...tag, ...rest }; }
  / tag:tag { return tag }
  
tag
  = "@" name:identifier "(" params:params ")" { return { [name]: params } }
  / "@" name:identifier ":" value:value { return { [name]: value } }
  / "@" name:identifier { return { [name]: true } }

identifier
  = letters:[a-zA-Z0-9_]+ { return letters.join('') }

params
  = param:value [ ]* "," [ ]* rest:params { return [param, ...rest]; }
  / param:value { return [param]; }

value
  = "\"" content:[^\"]* "\"" { return content.join(''); }
  / "'" content:[^\']* "'" { return content.join(''); }
  / content:[a-zA-Z0-9]+ { return content.join(''); }

text
  = content:[^@]+ { return content.join('').trim() }
