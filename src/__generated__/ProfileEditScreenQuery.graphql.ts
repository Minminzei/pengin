/**
 * @generated SignedSource<<f8728e69ecdf80d7a48fff576af0f52d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ProfileEditScreenQuery$variables = {
  id: string;
};
export type ProfileEditScreenQueryVariables = ProfileEditScreenQuery$variables;
export type ProfileEditScreenQuery$data = {
  readonly user: {
    readonly id: string;
    readonly name: string;
    readonly image: string;
    readonly location: string | null;
    readonly comment: string | null;
  };
};
export type ProfileEditScreenQueryResponse = ProfileEditScreenQuery$data;
export type ProfileEditScreenQuery = {
  variables: ProfileEditScreenQueryVariables;
  response: ProfileEditScreenQuery$data;
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
    "name": "ProfileEditScreenQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileEditScreenQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c6ca5b6bdcacd2fd888e071a9c24aad2",
    "id": null,
    "metadata": {},
    "name": "ProfileEditScreenQuery",
    "operationKind": "query",
    "text": "query ProfileEditScreenQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    id\n    name\n    image\n    location\n    comment\n  }\n}\n"
  }
};
})();

(node as any).hash = "3ffa0ce722265aefe43aa8a05e475480";

export default node;
