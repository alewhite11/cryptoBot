import { Task } from "../interfaces/Task";
import telegramImg from './../img/taskPage/telegram.png'
import walletImg from './../img/taskPage/wallet.png'
import dailyClaimImg from './../img/taskPage/dailyClaim.png'

/*
  IN YOUTUBE TASK THE CHANNELID FIELD IS USED TO STORE THE SECRET WORD
*/

export const dailyTasks : Task[] = [
  {title: 'Plant token channel',text: 'Join our telegram channel in which all updates will be shared', image: telegramImg, link: 'https://t.me/plant_token', channelId: '@plant_token', type: 'telegram', id: 0},
  {title: 'Daily Task',text: 'Daily Task', image: dailyClaimImg, link: '', channelId: '', type: 'dailyTask', id: 1},
  {title: 'Connect Wallet', text: 'Connect the wallet to the mini app', image: walletImg, link: '', channelId: '', type: 'walletConnect', id: 2},
];