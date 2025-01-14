/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { OperationsResultsLocationGetOptionalParams } from "../models";

/** Interface representing a OperationsResultsLocation. */
export interface OperationsResultsLocation {
  /**
   * Returns operation results.
   * @param location Azure location (region) name.
   * @param operationId The Guid of the operation ID
   * @param options The options parameters.
   */
  get(
    location: string,
    operationId: string,
    options?: OperationsResultsLocationGetOptionalParams
  ): Promise<void>;
}
