import { Chest } from "../interfaces/Chest";
import Coins25Img from './../img/chests/25Coins.jpg'
import Coins50Img from './../img/chests/50Coins.jpg'
import Coins75Img from './../img/chests/75Coins.jpg'
import Coins100Img from './../img/chests/100Coins.jpg'
import Coins150Img from './../img/chests/150Coins.jpg'
import Coins250Img from './../img/chests/250Coins.jpg'
import Coins500Img from './../img/chests/500Coins.jpg'
import Coins1000Img from './../img/chests/1000Coins.jpg'
import Coins10000Img from './../img/chests/10000Coins.jpg'
import AppleImg from './../img/chests/1Apple.jpg'
import Apples2Img from './../img/chests/2Apples.jpg'
import Apples3Img from './../img/chests/3Apples.jpg'
import Apples50Img from './../img/chests/50Apples.jpg'


export const chests : Chest[] = [
    {score: 25, appleScore: 0, minProb: 1, maxProb: 12000, image: Coins25Img},
    {score: 50, appleScore: 0, minProb: 12001, maxProb: 24000, image: Coins50Img},
    {score: 75, appleScore: 0, minProb: 24001, maxProb: 36000, image: Coins75Img},
    {score: 100, appleScore: 0, minProb: 36001, maxProb: 48000, image: Coins100Img},
    {score: 150, appleScore: 0, minProb: 48001, maxProb: 60000, image: Coins150Img},
    {score: 250, appleScore: 0, minProb: 60001, maxProb: 67500, image: Coins250Img},
    {score: 500, appleScore: 0, minProb: 67501, maxProb: 75000, image: Coins500Img},
    {score: 1000, appleScore: 0, minProb: 75001, maxProb: 77500, image: Coins1000Img},
    {score: 10000, appleScore: 0, minProb: 75501, maxProb: 75510, image: Coins10000Img},
    {score: 0, appleScore: 1, minProb: 75511, maxProb: 86510, image: AppleImg},
    {score: 0, appleScore: 2, minProb: 86511, maxProb: 95499, image: Apples2Img},
    {score: 0, appleScore: 3, minProb: 95500, maxProb: 99999, image: Apples3Img},
    {score: 0, appleScore: 50, minProb: 100000, maxProb: 100000, image: Apples50Img},
  ];