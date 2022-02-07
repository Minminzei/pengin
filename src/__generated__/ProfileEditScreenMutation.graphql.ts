/**
 * @generated SignedSource<<a63994da6f4b2b70c57552dfdfec3a93>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserInput = {
  id: string;
  name: string;
  location: string;
  comment?: string | null;
};
export type ProfileEditScreenMutation$variables = {
  input?: UserInput | null;
};
export type ProfileEditScreenMutationVariables = ProfileEditScreenMutation$variables;
export type ProfileEditScreenMutation$data = {
  readonly saveUser: {
    readonly id: string;
    readonly name: string;
    readonly image: string;
    readonly location: string | null;
    readonly comment: string | null;
  };
};
export type ProfileEditScreenMutationResponse = ProfileEditScreenMutation$data;
export type ProfileEditScreenMutation = {
  variables: ProfileEditScreenMutationVariables;
  response: ProfileEditScreenMutation$data;
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "saveUser",
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
    "name": "ProfileEditScreenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileEditScreenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a739e780fc522526bb1699d6645c0b2b",
    "id": null,
    "metadata": {},
    "name": "ProfileEditScreenMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileEditScreenMutation(\n  $input: UserInput\n) {\n  saveUser(input: $input) {\n    id\n    name\n    image\n    location\n    comment\n  }\n}\n"
  }
};
})();

(node as any).hash = "da1d9710ca4f0694820650c5c066677a";

export default node;
