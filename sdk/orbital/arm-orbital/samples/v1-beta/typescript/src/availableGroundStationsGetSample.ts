/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureOrbital } from "@azure/arm-orbital";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets the specified  available ground station
 *
 * @summary Gets the specified  available ground station
 * x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/preview/2021-04-04-preview/examples/AvailableGroundStationGet.json
 */
async function getGroundStation() {
  const subscriptionId = "subid";
  const groundStationName = "westus_gs1";
  const credential = new DefaultAzureCredential();
  const client = new AzureOrbital(credential, subscriptionId);
  const result = await client.availableGroundStations.get(groundStationName);
  console.log(result);
}

getGroundStation().catch(console.error);