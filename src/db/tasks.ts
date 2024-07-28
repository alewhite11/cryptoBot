import { Task } from "../interfaces/Task";
import telegramImg from './../img/taskPage/telegram.png'
import walletImg from './../img/taskPage/wallet.png'
import dailyClaimImg from './../img/taskPage/dailyClaim.png'
import youtubeImg from './../img/taskPage/youtube.png'

/*
  IN YOUTUBE TASK THE CHANNELID FIELD IS USED TO STORE THE SECRET WORD
*/

export const dailyTasks : Task[] = [
  {title: 'Plant token channel',text: 'Join our telegram channel in which all updates will be shared', image: telegramImg, link: 'https://t.me/plant_token', channelId: '@plant_token', type: 'telegram', id: 0},
  {title: 'Daily Task',text: 'Daily Task', image: dailyClaimImg, link: '', channelId: '', type: 'dailyTask', id: 1},
  {title: 'Connect Wallet', text: 'Connect the wallet to the mini app', image: walletImg, link: '', channelId: '', type: 'walletConnect', id: 2},
  {title: 'Plant token channel',text: 'Join our youtube channel in which all updates will be shared', image: youtubeImg, link: 'https://www.youtube.com/@PlantToken', channelId: '', type: 'openAndClaim', id: 3},
  {title: 'Plant token page',text: 'Follow our intagram page in which all updates will be shared', image: youtubeImg, link: 'https://www.instagram.com/planttoken?igsh=Zm04Y2UzeHFjZnFh', channelId: '', type: 'openAndClaim', id: 4}
];