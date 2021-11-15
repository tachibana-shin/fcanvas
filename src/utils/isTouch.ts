export default function isTouch(): boolean {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}
