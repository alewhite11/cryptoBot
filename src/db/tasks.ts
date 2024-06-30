import { Task } from "../interfaces/Task";
import telegramImg from './../img/taskPage/telegram.png'

export const dailyTasks : Task[] = [
  {title: 'Calisthenics task',text: 'This is your first task', revenue: 500, image: telegramImg, link: 'https://t.me/calisthenics', channelId: '@calisthenics', type: 'telegram', id: 0},
  /*{title: 'Plant task',text: 'This is your second task', revenue: 500, image: telegramImg, link: 'https://t.me/plant_token', channelId: '2217633737', type: 'telegram', id: 1},
  {title: 'RC task',text: 'This is your third task', revenue: 500, image: telegramImg, link: 'https://t.me/roulettecode', channelId: '@roulettecode', type: 'telegram', id: 2},
  {title: 'ciccionemaledetto task',text: 'This is your fourth task', revenue: 500, image: telegramImg, link: 'https://t.me/ciccionemaledetto', channelId: '@ciccionemaledetto', type: 'telegram', id: 3}*/
];