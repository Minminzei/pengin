/**
 * @generated SignedSource<<a50c87237acd1d248293141b3e5d066a>>
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
export type ProfileScreenMutation$variables = {
  input?: ImageInput | null;
};
export type ProfileScreenMutationVariables = ProfileScreenMutation$variables;
export type ProfileScreenMutation$data = {
  readonly uploadImage: {
    readonly uri: string;
  };
};
export type ProfileScreenMutationResponse = ProfileScreenMutation$data;
export type ProfileScreenMutation = {
  variables: ProfileScreenMutationVariables;
  response: ProfileScreenMutation$data;
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
    "name": "ProfileScreenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileScreenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "84e378da81893f309985b6133ed09534",
    "id": null,
    "metadata": {},
    "name": "ProfileScreenMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileScreenMutation(\n  $input: ImageInput\n) {\n  uploadImage(input: $input) {\n    uri\n  }\n}\n"
  }
};
})();

(node as any).hash = "d7b4533f0a198085c3ad3be7d465c9f6";

export default node;
