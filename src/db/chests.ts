import { Chest } from "../interfaces/Chest";
import chestImg from './../img/chests/closed_Chest.jpg'
import appleVid from './../video/chest_opening/Apple.mp4'
import apple2Vid from './../video/chest_opening/Apple2.mp4'
import apple3Vid from './../video/chest_opening/Apple3.mp4'
import apple50Vid from './../video/chest_opening/Apple50.mp4'
import coins25Vid from './../video/chest_opening/Coins25.mp4'
import coins50Vid from './../video/chest_opening/Coins50.mp4'
import coins75Vid from './../video/chest_opening/Coins75.mp4'
import coins100Vid from './../video/chest_opening/Coins100.mp4'
import coins150Vid from './../video/chest_opening/Coins150.mp4'
import coins250Vid from './../video/chest_opening/Coins250.mp4'
import coins500Vid from './../video/chest_opening/Coins500.mp4'
import coins1000Vid from './../video/chest_opening/Coins1000.mp4'
import coins10000Vid from './../video/chest_opening/Coins10000.mp4'

export const chests : Chest[] = [
    {score: 25, appleScore: 0, minProb: 1, maxProb: 15000, image: chestImg, video: coins25Vid},
    {score: 50, appleScore: 0, minProb: 15001, maxProb: 30000, image: chestImg, video: coins50Vid},
    {score: 75, appleScore: 0, minProb: 30001, maxProb: 45000, image: chestImg, video: coins75Vid},
    {score: 100, appleScore: 0, minProb: 45001, maxProb: 60000, image: chestImg, video: coins100Vid},
    {score: 150, appleScore: 0, minProb: 60001, maxProb: 70000, image: chestImg, video: coins150Vid},
    {score: 250, appleScore: 0, minProb: 70001, maxProb: 77500, image: chestImg, video: coins250Vid},
    {score: 500, appleScore: 0, minProb: 77501, maxProb: 82500, image: chestImg, video: coins500Vid},
    {score: 1000, appleScore: 0, minProb: 82501, maxProb: 85000, image: chestImg, video: coins1000Vid},
    {score: 10000, appleScore: 0, minProb: 85001, maxProb: 85010, image: chestImg, video: coins10000Vid},
    {score: 0, appleScore: 1, minProb: 85011, maxProb: 95010, image: chestImg, video: appleVid},
    {score: 0, appleScore: 2, minProb: 95011, maxProb: 98999, image: chestImg, video: apple2Vid},
    {score: 0, appleScore: 3, minProb: 99000, maxProb: 99999, image: chestImg, video: apple3Vid},
    {score: 0, appleScore: 50, minProb: 100000, maxProb: 100000, image: chestImg, video: apple50Vid},
  ];