import { Task } from "../interfaces/Task";
import telegramImg from './../img/taskPage/telegram.png'
import walletImg from './../img/taskPage/wallet.png'
import dailyClaimImg from './../img/taskPage/dailyClaim.png'
import youtubeImg from './../img/taskPage/youtube.png'
import instagramImg from './../img/taskPage/instagram.png'
import first100kImg from './../img/taskPage/first100k.png'
import tiktokImg from './../img/taskPage/tiktok.png'

/*
  IN YOUTUBE TASK THE CHANNELID FIELD IS USED TO STORE THE SECRET WORD
*/

export const dailyTasks : Task[] = [
  {title: 'Plant token channel',text: 'Join our telegram channel in which all updates will be shared', image: telegramImg, link: 'https://t.me/plant_token', channelId: '@plant_token', type: 'telegram', id: 0},
  {title: 'Daily Task',text: 'Daily Task', image: dailyClaimImg, link: '', channelId: '', type: 'dailyTask', id: 1},
  {title: 'Connect Wallet', text: 'Connect the wallet to the mini app', image: walletImg, link: '', channelId: '', type: 'walletConnect', id: 2},
  {title: 'Plant token channel',text: 'Join our youtube channel in which all updates will be shared', image: youtubeImg, link: 'https://www.youtube.com/@PlantToken', channelId: '', type: 'openAndClaim', id: 3},
  {title: 'Plant token page',text: 'Follow our intagram page in which all updates will be shared', image: instagramImg, link: 'https://www.instagram.com/planttoken?igsh=Zm04Y2UzeHFjZnFh', channelId: '', type: 'openAndClaim', id: 4},
  {title: 'First 100k users welcome bonus', text: 'Thank you for joining, first 100k users get a special reward of 5000 coins', image: first100kImg, link: '', channelId: '', type: 'justClaim', id: 5},
  {title: 'First 100k users, invite 1 friend bonus', text: 'For the first 100k users, when you invite the first friend you will get an apple tree fro free', image: first100kImg, link: '', channelId: '', type: 'justClaim', id: 6},
  {title: 'Like on Instagram post',text: 'Like our intagram post, it will take just a second!', image: instagramImg, link: 'https://www.instagram.com/p/C97aSIiCzb7/?igsh=MWdkc2gwaWN2NGR4MA==', channelId: '', type: 'openAndClaim', id: 7},
  {title: 'Like on Instagram post',text: 'Like our intagram post, it will take just a second!', image: instagramImg, link: 'https://www.instagram.com/p/C-AOsc5Ch3e/?igsh=OGd2MjJ4ZmRxb3E2', channelId: '', type: 'openAndClaim', id: 8},
  {title: 'Like on Instagram post',text: 'Like our intagram post, it will take just a second!', image: instagramImg, link: 'https://www.instagram.com/p/C-TFPYWNPcU/?igsh=MTM3MHVnZmo0ajkxYw==', channelId: '', type: 'openAndClaim', id: 9},
  {title: 'Like on Instagram post',text: 'Like our intagram post, it will take just a second!', image: instagramImg, link: 'https://www.instagram.com/reel/C-UdUYatrGW/?igsh=NTd1bGNqbmJ5ZXR1', channelId: '', type: 'openAndClaim', id: 10},
  {title: 'Like on Instagram post',text: 'Like our intagram post, it will take just a second!', image: instagramImg, link: 'https://www.instagram.com/p/C-apw5tNRcx/?igsh=M2l1OHh3M3g1cGpn', channelId: '', type: 'openAndClaim', id: 11},
  {title: 'Like on Instagram post',text: 'Like our intagram post, it will take just a second!', image: instagramImg, link: 'https://www.instagram.com/p/C-hgvaQNasd/?igsh=N3VrcHI3MG5mcXdy', channelId: '', type: 'openAndClaim', id: 12},
  {title: 'Like on Instagram post',text: 'Like our intagram post, it will take just a second!', image: instagramImg, link: 'https://www.instagram.com/reel/C-mZrFeNqqn/?igsh=MXRhb251OW5nMTl3dg==', channelId: '', type: 'openAndClaim', id: 13},
  {title: 'Like on Youtube short',text: 'Like our youtube short, it will take just a second!', image: youtubeImg, link: 'https://youtube.com/shorts/Y9PRghBRED0?si=BkU-UJVnDF70Sh51', channelId: '', type: 'openAndClaim', id: 14},
  {title: 'Like on Youtube short',text: 'Like our youtube short, it will take just a second!', image: youtubeImg, link: 'https://youtube.com/shorts/vwOQCWjOqNw?si=bK8NqHiQZrdmqgaI', channelId: '', type: 'openAndClaim', id: 15},
  {title: 'Plant token page',text: 'Follow our tiktok page in which all updates will be shared', image: tiktokImg, link: 'https://www.tiktok.com/@plant_token?_t=8opZQsTuCRN&_r=1', channelId: '', type: 'openAndClaim', id: 16},
  {title: 'Like on Tiktok post',text: 'Like our tiktok post, it will take just a second!', image: tiktokImg, link: 'https://vm.tiktok.com/ZGec2eCS5/', channelId: '', type: 'openAndClaim', id: 17},
  {title: 'Like on Tiktok post',text: 'Like our tiktok post, it will take just a second!', image: tiktokImg, link: 'https://vm.tiktok.com/ZGecY3Pff/', channelId: '', type: 'openAndClaim', id: 18},
  //{title: 'Test',text: 'Test', image: tiktokImg, link: '', channelId: '', type: 'justClaim', id: 100000000},
];