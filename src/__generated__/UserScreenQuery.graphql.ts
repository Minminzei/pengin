/**
 * @generated SignedSource<<e4a3cebdaa00b95a70dfc26f303f686d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
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
    readonly posts: ReadonlyArray<{
      readonly id: string;
      readonly title: string;
      readonly published: boolean | null;
      readonly link: string;
    } | null> | null;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
      (v1/*: any*/),
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
          (v1/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserScreenQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserScreenQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "4c15520460f65b546b7a8efe4a05ab21",
    "id": null,
    "metadata": {},
    "name": "UserScreenQuery",
    "operationKind": "query",
    "text": "query UserScreenQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    id\n    name\n    image\n    location\n    comment\n    posts {\n      id\n      title\n      published\n      link\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0186043e890a623dfc6d0e7759f7e3c6";

export default node;
