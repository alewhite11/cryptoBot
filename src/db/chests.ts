import { Chest } from "../interfaces/Chest";
import chestImg from './../img/chests/closed_Chest.jpg'
import chestVid from './../video/chest_opening/Apple.mp4'

export const chests : Chest[] = [
    {score: 25, appleScore: 0, minProb: 1, maxProb: 15000, image: chestImg, video: chestVid},
    {score: 50, appleScore: 0, minProb: 15001, maxProb: 30000, image: chestImg, video: chestVid},
    {score: 75, appleScore: 0, minProb: 30001, maxProb: 45000, image: chestImg, video: chestVid},
    {score: 100, appleScore: 0, minProb: 45001, maxProb: 60000, image: chestImg, video: chestVid},
    {score: 150, appleScore: 0, minProb: 60001, maxProb: 70000, image: chestImg, video: chestVid},
    {score: 250, appleScore: 0, minProb: 70001, maxProb: 77500, image: chestImg, video: chestVid},
    {score: 500, appleScore: 0, minProb: 77501, maxProb: 82500, image: chestImg, video: chestVid},
    {score: 1000, appleScore: 0, minProb: 82501, maxProb: 85000, image: chestImg, video: chestVid},
    {score: 10000, appleScore: 0, minProb: 85001, maxProb: 85010, image: chestImg, video: chestVid},
    {score: 0, appleScore: 1, minProb: 85011, maxProb: 95010, image: chestImg, video: chestVid},
    {score: 0, appleScore: 2, minProb: 95011, maxProb: 98999, image: chestImg, video: chestVid},
    {score: 0, appleScore: 3, minProb: 99000, maxProb: 99999, image: chestImg, video: chestVid},
    {score: 0, appleScore: 50, minProb: 100000, maxProb: 100000, image: chestImg, video: chestVid},
  ];