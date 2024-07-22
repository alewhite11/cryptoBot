import { Task } from "../interfaces/Task";
import telegramImg from './../img/taskPage/telegram.png'

export const dailyTasks : Task[] = [
  {title: 'Plant token channel',text: 'Join our telegram channel in which all updates will be shared', revenue: 500, image: telegramImg, link: 'https://t.me/plant_token', channelId: '@plant_token', type: 'telegram', id: 0},
  {title: 'Daily Task',text: 'Daily Task', revenue: 500, image: telegramImg, link: '', channelId: '', type: 'dailyTask', id: 1},
  {title: 'Connect Wallet', text: 'Connect the wallet to the mini app', revenue: 1000, image: telegramImg, link: '', channelId: '', type: 'walletConnect', id: 2}
];