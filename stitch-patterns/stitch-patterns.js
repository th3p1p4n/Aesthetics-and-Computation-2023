"use strict";

import { updateMode, generate } from "./utils.js";

window.onload = updateMode;
document.querySelector("#gen-type").onclick = updateMode;
document.querySelector("#submit").onclick = generate;
