import { Task } from "../interfaces/Task";
import telegramImg from './../img/taskPage/telegram.png'
import walletImg from './../img/taskPage/wallet.png'
import dailyClaimImg from './../img/taskPage/dailyClaim.png'
import youtubeImg from './../img/taskPage/youtube.png'
import instagramImg from './../img/taskPage/instagram.png'
import first100kImg from './../img/taskPage/first100k.png'
import tiktokImg from './../img/taskPage/tiktok.png'
import xImg from './../img/taskPage/x.png'

/*
  IN YOUTUBE TASK THE CHANNELID FIELD IS USED TO STORE THE SECRET WORD
*/

export const dailyTasks : Task[] = [
  {title: 'Plant token channel',text: 'Join our telegram channel in which all updates will be shared', image: telegramImg, link: 'https://t.me/plant_token', channelId: '@plant_token', type: 'telegram', id: 0},
  {title: 'Daily Task',text: 'Daily Task', image: dailyClaimImg, link: '', channelId: '', type: 'dailyTask', id: 1},
  {title: 'Connect Wallet', text: 'Connect the wallet to the mini app', image: walletImg, link: '', channelId: '', type: 'walletConnect', id: 2},
  {title: 'Plant token channel',text: 'Join our youtube channel in which all updates will be shared', image: youtubeImg, link: 'https://www.youtube.com/@PlantToken', channelId: '', type: 'openAndClaim', id: 3},
  {title: 'Plant token page',text: 'Follow our intagram page in which all updates will be shared', image: instagramImg, link: 'https://www.instagram.com/planttoken?igsh=Zm04Y2UzeHFjZnFh', channelId: '', type: 'openAndClaim', id: 4},
  {title: 'Plant token account',text: 'Follow our X page in which all updates will be shared', image: xImg, link: 'https://x.com/The_Plant_Token/', channelId: '', type: 'openAndClaim', id: 23},
  {title: 'First 100k users welcome bonus', text: 'Thank you for joining, first 100k users get a special reward of 5000 coins', image: first100kImg, link: '', channelId: '', type: 'justClaim', id: 5},
  {title: 'First 100k users, invite 1 friend bonus', text: 'For the first 100k users, when you invite the first friend you will get an apple tree fro free', image: first100kImg, link: '', channelId: '', type: 'justClaim', id: 6},
  {title: 'Plant token page',text: 'Follow our tiktok page in which all updates will be shared', image: tiktokImg, link: 'https://www.tiktok.com/@plant_token?_t=8opZQsTuCRN&_r=1', channelId: '', type: 'openAndClaim', id: 16},
  {title: 'Like on Instagram post',text: 'Like our intagram post, it will take just a second!', image: instagramImg, link: 'https://www.instagram.com/p/C_DfklvNfRx/?igsh=NGtwb2hxMGJ4dnIx', channelId: '', type: 'openAndClaim', id: 22},
  {title: 'Like our X post',text: 'Like our X post, it will take just a second!', image: xImg, link: 'https://x.com/The_Plant_Token/status/1828685966829359256', channelId: '', type: 'openAndClaim', id: 25},
  {title: 'Like on Youtube short',text: 'Like our youtube short, it will take just a second!', image: youtubeImg, link: 'https://youtube.com/shorts/0Eza7S7wzRk?si=kZKh4iIxzEAuBxjU', channelId: '', type: 'openAndClaim', id: 20},
  {title: 'Like on Tiktok post',text: 'Like our tiktok post, it will take just a second!', image: tiktokImg, link: 'https://vm.tiktok.com/ZGe3Pw1yo/', channelId: '', type: 'openAndClaim', id: 21},
  //{title: 'Test',text: 'Test', image: tiktokImg, link: '', channelId: '', type: 'justClaim', id: 100000000},
];