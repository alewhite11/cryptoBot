import { ScratchCardContent } from "../interfaces/ScratchCardContent";



export const scratchcards : ScratchCardContent[] = [
  {score: 100, appleScore: 0, minProb: 1, maxProb: 12000},
  {score: 150, appleScore: 0, minProb: 12001, maxProb: 24000},
  {score: 200, appleScore: 0, minProb: 24001, maxProb: 36000},
  {score: 250, appleScore: 0, minProb: 36001, maxProb: 48000},
  {score: 500, appleScore: 0, minProb: 48001, maxProb: 60000},
  {score: 750, appleScore: 0, minProb: 60001, maxProb: 67500},
  {score: 1000, appleScore: 0, minProb: 67501, maxProb: 75000},
  {score: 5000, appleScore: 0, minProb: 75001, maxProb: 77500},
  {score: 10000, appleScore: 0, minProb: 75501, maxProb: 75510},
  {score: 0, appleScore: 1, minProb: 75511, maxProb: 86510},
  {score: 0, appleScore: 2, minProb: 86511, maxProb: 95499},
  {score: 0, appleScore: 3, minProb: 95500, maxProb: 99999},
  {score: 0, appleScore: 50, minProb: 100000, maxProb: 100000},
];

export const inviteScratchcards : ScratchCardContent[] = [
  {score: 0, appleScore: 1, minProb: 1, maxProb: 5000},
  {score: 0, appleScore: 2, minProb: 5001, maxProb: 8000},
  {score: 0, appleScore: 3, minProb: 8001, maxProb: 9999},
  {score: 0, appleScore: 50, minProb: 10000, maxProb: 10000},
];