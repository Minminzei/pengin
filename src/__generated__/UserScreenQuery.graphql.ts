/**
 * @generated SignedSource<<f613d82ca9f165db2b9820db2d6c9547>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserScreenQuery$variables = {
  id: string;
};
export type UserScreenQueryVariables = UserScreenQuery$variables;
export type UserScreenQuery$data = {
  readonly user: {
    readonly id: string;
    readonly name: string;
    readonly image: string;
    readonly location: string | null;
    readonly comment: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"UserPost_user">;
  };
};
export type UserScreenQueryResponse = UserScreenQuery$data;
export type UserScreenQuery = {
  variables: UserScreenQueryVariables;
  response: UserScreenQuery$data;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "image",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "location",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "comment",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserPost_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "posts",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "link",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3602fabfedb9284c47552cdbd66c7c41",
    "id": null,
    "metadata": {},
    "name": "UserScreenQuery",
    "operationKind": "query",
    "text": "query UserScreenQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    id\n    name\n    image\n    location\n    comment\n    ...UserPost_user\n  }\n}\n\nfragment UserPost_user on User {\n  posts {\n    id\n    title\n    link\n  }\n}\n"
  }
};
})();

(node as any).hash = "de6238125cccc69961ab8584873cf27d";

export default node;
