/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { elevationStyles } from "./GeoPrivateDefaultElevationGeneratedStyles";

function selectElevation({ level }) {
  return elevationStyles[level];
}

export { selectElevation };
