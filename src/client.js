import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ensureReady, After } from "@jaredpalmer/after";

import Provider from "./Provider";
import routes from "./routes";

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <Provider>
        <After data={data} routes={routes} />
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  )
);

if (module.hot) {
  module.hot.accept();
}
