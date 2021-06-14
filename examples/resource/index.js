import { Resource } from "../../dist/fcanvas.esm.js";

const resource = await new Resource({
  Object: "./assets/320x480/Object",
});

console.log(resource.get("Object/1cloud1.png"));
