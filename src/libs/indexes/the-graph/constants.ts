export const AERODROME_BASE_FULL_SUBGRAPH_ID =
  'GENunSHWLBXm59mBSgPzQ8metBEp9YDfdqwFr91Av1UM';

export const createTheGraphSubgraphUrl = (apiKey: string, subgraphId: string) =>
  `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/${subgraphId}`;
