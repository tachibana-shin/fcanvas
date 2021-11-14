export default function trim(string: string | null): string {
  if (string == null) {
    return "null";
  } else {
    return string.replace(/^\s+|\s+$/g, "");
  }
}