/**
 * @generated SignedSource<<e3e9ce2e217175438db518c112efe8e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UsersScreenQuery$variables = {};
export type UsersScreenQueryVariables = UsersScreenQuery$variables;
export type UsersScreenQuery$data = {
  readonly users: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly image: string;
    readonly location: string | null;
    readonly comment: string | null;
    readonly posts: ReadonlyArray<{
      readonly id: string;
      readonly title: string;
      readonly published: boolean | null;
      readonly link: string;
    }> | null;
  }> | null;
};
export type UsersScreenQueryResponse = UsersScreenQuery$data;
export type UsersScreenQuery = {
  variables: UsersScreenQueryVariables;
  response: UsersScreenQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
    "selections": [
      (v0/*: any*/),
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "posts",
        "plural": true,
        "selections": [
          (v0/*: any*/),
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
            "name": "published",
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersScreenQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UsersScreenQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1c420f3536bc14f7f405c37a6eb30c32",
    "id": null,
    "metadata": {},
    "name": "UsersScreenQuery",
    "operationKind": "query",
    "text": "query UsersScreenQuery {\n  users {\n    id\n    name\n    image\n    location\n    comment\n    posts {\n      id\n      title\n      published\n      link\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3e984a72455c6c1c3e4368cb80d28acf";

export default node;
