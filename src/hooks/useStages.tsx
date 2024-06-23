import React from "react";

import { useQuery, gql } from '@apollo/client';

const GET_STAGES = gql`
  query {
    stageModels {
      edges {
        node {
          p1,
          p2,
          p1_party,
          p2_party,
          is_finished,
          randomness,
          environment
        }
      }
    }
  }
`;

export const useStages = () => {
  const { loading, data } = useQuery(GET_STAGES);
  if(data && !loading) {
    const edges = data?.stageModels?.edges
    if(Array.isArray(edges)) {
      return edges
        .map((edge) => edge.node)
    }
    return []
  }
  return []
}

