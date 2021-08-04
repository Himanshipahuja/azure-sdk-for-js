/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { GalleryImages } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  GalleryImage,
  GalleryImagesListByGalleryNextOptionalParams,
  GalleryImagesListByGalleryOptionalParams,
  GalleryImagesCreateOrUpdateOptionalParams,
  GalleryImagesCreateOrUpdateResponse,
  GalleryImageUpdate,
  GalleryImagesUpdateOptionalParams,
  GalleryImagesUpdateResponse,
  GalleryImagesGetOptionalParams,
  GalleryImagesGetResponse,
  GalleryImagesDeleteOptionalParams,
  GalleryImagesListByGalleryResponse,
  GalleryImagesListByGalleryNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class representing a GalleryImages. */
export class GalleryImagesImpl implements GalleryImages {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class GalleryImages class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * List gallery image definitions in a gallery.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery from which Image Definitions are to be
   *                    listed.
   * @param options The options parameters.
   */
  public listByGallery(
    resourceGroupName: string,
    galleryName: string,
    options?: GalleryImagesListByGalleryOptionalParams
  ): PagedAsyncIterableIterator<GalleryImage> {
    const iter = this.listByGalleryPagingAll(
      resourceGroupName,
      galleryName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByGalleryPagingPage(
          resourceGroupName,
          galleryName,
          options
        );
      }
    };
  }

  private async *listByGalleryPagingPage(
    resourceGroupName: string,
    galleryName: string,
    options?: GalleryImagesListByGalleryOptionalParams
  ): AsyncIterableIterator<GalleryImage[]> {
    let result = await this._listByGallery(
      resourceGroupName,
      galleryName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByGalleryNext(
        resourceGroupName,
        galleryName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByGalleryPagingAll(
    resourceGroupName: string,
    galleryName: string,
    options?: GalleryImagesListByGalleryOptionalParams
  ): AsyncIterableIterator<GalleryImage> {
    for await (const page of this.listByGalleryPagingPage(
      resourceGroupName,
      galleryName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Create or update a gallery image definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition is to be
   *                    created.
   * @param galleryImageName The name of the gallery image definition to be created or updated. The
   *                         allowed characters are alphabets and numbers with dots, dashes, and periods allowed in the middle.
   *                         The maximum length is 80 characters.
   * @param galleryImage Parameters supplied to the create or update gallery image operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImage,
    options?: GalleryImagesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<GalleryImagesCreateOrUpdateResponse>,
      GalleryImagesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<GalleryImagesCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImage,
        options
      },
      createOrUpdateOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * Create or update a gallery image definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition is to be
   *                    created.
   * @param galleryImageName The name of the gallery image definition to be created or updated. The
   *                         allowed characters are alphabets and numbers with dots, dashes, and periods allowed in the middle.
   *                         The maximum length is 80 characters.
   * @param galleryImage Parameters supplied to the create or update gallery image operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImage,
    options?: GalleryImagesCreateOrUpdateOptionalParams
  ): Promise<GalleryImagesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImage,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Update a gallery image definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition is to be
   *                    updated.
   * @param galleryImageName The name of the gallery image definition to be updated. The allowed
   *                         characters are alphabets and numbers with dots, dashes, and periods allowed in the middle. The
   *                         maximum length is 80 characters.
   * @param galleryImage Parameters supplied to the update gallery image operation.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImageUpdate,
    options?: GalleryImagesUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<GalleryImagesUpdateResponse>,
      GalleryImagesUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<GalleryImagesUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        resourceGroupName,
        galleryName,
        galleryImageName,
        galleryImage,
        options
      },
      updateOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * Update a gallery image definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition is to be
   *                    updated.
   * @param galleryImageName The name of the gallery image definition to be updated. The allowed
   *                         characters are alphabets and numbers with dots, dashes, and periods allowed in the middle. The
   *                         maximum length is 80 characters.
   * @param galleryImage Parameters supplied to the update gallery image operation.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    galleryImage: GalleryImageUpdate,
    options?: GalleryImagesUpdateOptionalParams
  ): Promise<GalleryImagesUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      galleryName,
      galleryImageName,
      galleryImage,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Retrieves information about a gallery image definition.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery from which the Image Definitions are to be
   *                    retrieved.
   * @param galleryImageName The name of the gallery image definition to be retrieved.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: GalleryImagesGetOptionalParams
  ): Promise<GalleryImagesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, galleryName, galleryImageName, options },
      getOperationSpec
    );
  }

  /**
   * Delete a gallery image.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition is to be
   *                    deleted.
   * @param galleryImageName The name of the gallery image definition to be deleted.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: GalleryImagesDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { resourceGroupName, galleryName, galleryImageName, options },
      deleteOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * Delete a gallery image.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery in which the Image Definition is to be
   *                    deleted.
   * @param galleryImageName The name of the gallery image definition to be deleted.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    galleryName: string,
    galleryImageName: string,
    options?: GalleryImagesDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      galleryName,
      galleryImageName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * List gallery image definitions in a gallery.
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery from which Image Definitions are to be
   *                    listed.
   * @param options The options parameters.
   */
  private _listByGallery(
    resourceGroupName: string,
    galleryName: string,
    options?: GalleryImagesListByGalleryOptionalParams
  ): Promise<GalleryImagesListByGalleryResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, galleryName, options },
      listByGalleryOperationSpec
    );
  }

  /**
   * ListByGalleryNext
   * @param resourceGroupName The name of the resource group.
   * @param galleryName The name of the Shared Image Gallery from which Image Definitions are to be
   *                    listed.
   * @param nextLink The nextLink from the previous successful call to the ListByGallery method.
   * @param options The options parameters.
   */
  private _listByGalleryNext(
    resourceGroupName: string,
    galleryName: string,
    nextLink: string,
    options?: GalleryImagesListByGalleryNextOptionalParams
  ): Promise<GalleryImagesListByGalleryNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, galleryName, nextLink, options },
      listByGalleryNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImage
    },
    201: {
      bodyMapper: Mappers.GalleryImage
    },
    202: {
      bodyMapper: Mappers.GalleryImage
    },
    204: {
      bodyMapper: Mappers.GalleryImage
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.galleryImage,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImage
    },
    201: {
      bodyMapper: Mappers.GalleryImage
    },
    202: {
      bodyMapper: Mappers.GalleryImage
    },
    204: {
      bodyMapper: Mappers.GalleryImage
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.galleryImage1,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImage
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName,
    Parameters.galleryImageName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByGalleryOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImageList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.galleryName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByGalleryNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryImageList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.galleryName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
