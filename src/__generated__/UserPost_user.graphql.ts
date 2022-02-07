/**
 * @generated SignedSource<<4519f8c6507e77c9fb7f67bbe72083b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserPost_user$data = {
  readonly posts: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly link: string;
  }> | null;
  readonly " $fragmentType": "UserPost_user";
};
export type UserPost_user = UserPost_user$data;
export type UserPost_user$key = {
  readonly " $data"?: UserPost_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserPost_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserPost_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "posts",
      "plural": true,
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
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "64be56083c8c5a116e5c6fa10330e860";

export default node;
