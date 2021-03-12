/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppDummyLinksQueryVariables = {||};
export type AppDummyLinksQueryResponse = {|
  +dummyLinks: $ReadOnlyArray<{|
    +title: string,
    +address: string,
    +user: {|
      +name: string
    |},
  |}>
|};
export type AppDummyLinksQuery = {|
  variables: AppDummyLinksQueryVariables,
  response: AppDummyLinksQueryResponse,
|};
*/


/*
query AppDummyLinksQuery {
  dummyLinks {
    title
    address
    user {
      name
      id
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppDummyLinksQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Link",
        "kind": "LinkedField",
        "name": "dummyLinks",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppDummyLinksQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Link",
        "kind": "LinkedField",
        "name": "dummyLinks",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "001f1619de569201ed55ed7b169ca769",
    "id": null,
    "metadata": {},
    "name": "AppDummyLinksQuery",
    "operationKind": "query",
    "text": "query AppDummyLinksQuery {\n  dummyLinks {\n    title\n    address\n    user {\n      name\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '49cd1af15e6f3cf194164bf253a0825a';

module.exports = node;
