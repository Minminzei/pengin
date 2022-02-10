/**
 * @generated SignedSource<<73fd6bfb1e3bb9da33363044b0753b2b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ImageInput = {
  uri: string;
  mimeType: string;
};
export type ProfileEditScreenUploadImageMutation$variables = {
  input?: ImageInput | null;
};
export type ProfileEditScreenUploadImageMutationVariables = ProfileEditScreenUploadImageMutation$variables;
export type ProfileEditScreenUploadImageMutation$data = {
  readonly uploadImage: {
    readonly uri: string;
  };
};
export type ProfileEditScreenUploadImageMutationResponse = ProfileEditScreenUploadImageMutation$data;
export type ProfileEditScreenUploadImageMutation = {
  variables: ProfileEditScreenUploadImageMutationVariables;
  response: ProfileEditScreenUploadImageMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UploadedImage",
    "kind": "LinkedField",
    "name": "uploadImage",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "uri",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileEditScreenUploadImageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileEditScreenUploadImageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "10e929163528a615d049ebd6e858beb8",
    "id": null,
    "metadata": {},
    "name": "ProfileEditScreenUploadImageMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileEditScreenUploadImageMutation(\n  $input: ImageInput\n) {\n  uploadImage(input: $input) {\n    uri\n  }\n}\n"
  }
};
})();

(node as any).hash = "c94322d0c8a8d3c57426415fe41c3bca";

export default node;
