import React from "react";

import { useQuery, gql } from '@apollo/client';

const GET_ACTIVE_PARTIES = gql`
  query {
    playerPartyModels(where: { is_active: true }){
      edges {
        node {
          player,
          partyId
          is_active,
          card1,
          card2,
          card3,
          card4
        }
      }
     }
  }
`;

export const useParties = (myAddress: string) => {
  const { loading, data } = useQuery(GET_ACTIVE_PARTIES);
  if(data && !loading) {
    const edges = data?.playerPartyModels?.edges
    if(Array.isArray(edges)) {
      return edges
        .map((edge) => edge.node)
        .filter(node => { 
          return node.player !== myAddress
        })
    }
    return []
  }
  return []
}

