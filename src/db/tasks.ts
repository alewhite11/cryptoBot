import { Task } from "../interfaces/Task";
import telegramImg from './../img/taskPage/telegram.png'

export const dailyTasks : Task[] = [
  {title: 'Plant token channel',text: 'Join our telegram channel in which all updates will be shared', revenue: 500, image: telegramImg, link: 'https://t.me/plant_token', channelId: '@plant_token', type: 'telegram', id: 0},
  {title: 'Test chest animation', text: 'Lets hope it works properly', revenue: 0, image: telegramImg, link: '', channelId: '', type: 'chest', id: 1}
];