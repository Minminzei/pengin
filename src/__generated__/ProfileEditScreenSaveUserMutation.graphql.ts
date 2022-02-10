/**
 * @generated SignedSource<<235e403b1f6dca3e1b34cadd5606ae21>>
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
  image: string;
  location: string;
  comment?: string | null;
};
export type ProfileEditScreenSaveUserMutation$variables = {
  input?: UserInput | null;
};
export type ProfileEditScreenSaveUserMutationVariables = ProfileEditScreenSaveUserMutation$variables;
export type ProfileEditScreenSaveUserMutation$data = {
  readonly saveUser: {
    readonly id: string;
    readonly name: string;
    readonly image: string;
    readonly location: string | null;
    readonly comment: string | null;
  };
};
export type ProfileEditScreenSaveUserMutationResponse = ProfileEditScreenSaveUserMutation$data;
export type ProfileEditScreenSaveUserMutation = {
  variables: ProfileEditScreenSaveUserMutationVariables;
  response: ProfileEditScreenSaveUserMutation$data;
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
    "name": "ProfileEditScreenSaveUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileEditScreenSaveUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e6dfa1189de70e58c44d68d98eea8686",
    "id": null,
    "metadata": {},
    "name": "ProfileEditScreenSaveUserMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileEditScreenSaveUserMutation(\n  $input: UserInput\n) {\n  saveUser(input: $input) {\n    id\n    name\n    image\n    location\n    comment\n  }\n}\n"
  }
};
})();

(node as any).hash = "095833cf736d5bdc908863aeac49a32d";

export default node;
