/**
 * @generated SignedSource<<8345ec7e64a2d7aff771b53f4806fa3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ProfileScreenQuery$variables = {
  id: string;
};
export type ProfileScreenQueryVariables = ProfileScreenQuery$variables;
export type ProfileScreenQuery$data = {
  readonly user: {
    readonly id: string;
    readonly name: string;
    readonly image: string;
    readonly location: string | null;
    readonly comment: string | null;
  };
};
export type ProfileScreenQueryResponse = ProfileScreenQuery$data;
export type ProfileScreenQuery = {
  variables: ProfileScreenQueryVariables;
  response: ProfileScreenQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "image",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "location",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "comment",
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
    "name": "ProfileScreenQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileScreenQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ae965604ae6014441988ca34a322f788",
    "id": null,
    "metadata": {},
    "name": "ProfileScreenQuery",
    "operationKind": "query",
    "text": "query ProfileScreenQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    id\n    name\n    image\n    location\n    comment\n  }\n}\n"
  }
};
})();

(node as any).hash = "99d8c4488fca939d87d0775091ea0de9";

export default node;
