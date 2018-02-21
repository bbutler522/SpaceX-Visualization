export function toTitleCase(str) {
  str = str.replace("_", " ");
  return str.replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
}
