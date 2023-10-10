import Field from "./field";
import "./index.less";
const Install = (app, name) => {
  app[name] = Field;
  return app;
};

export default Install;
