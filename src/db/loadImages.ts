import loadingImg from './../img/loadingBg.jpg'
import mainBg from './../img/mainBg.jpg'
import woodenBg from './../img/woodenBg.jpg'
import inviteImg from './../img/buttonBar/invite.png'
import moneyImg from './../img/buttonBar/money.png'
import shopImg from './../img/buttonBar/shop.png'
import sproutImg from './../img/buttonBar/sprout.png'
import addImg from './../img/mainPage/add.png'
import appleImg from './../img/mainPage/apple.png'
import arrowLeftImg from './../img/mainPage/arrowLeft.png'
import arrowRightImg from './../img/mainPage/arrowRight.png'
import asparagusImg from './../img/mainPage/asparagus.png'
import carrotImg from './../img/mainPage/carrot.png'
import cherryImg from './../img/mainPage/cherry.png'
import courgetteImg from './../img/mainPage/courgette.png'
import emptyFieldImg from './../img/mainPage/emptyField.png'
import lockedFieldImg from './../img/mainPage/lockedField.png'
import pearImg from './../img/mainPage/pear.png'
import pepperImg from './../img/mainPage/pepper.png'
import radishImg from './../img/mainPage/radish.png'
import saladImg from './../img/mainPage/salad.png'
import spinachImg from './../img/mainPage/spinach.png'
import tomatoImg from './../img/mainPage/tomato.png'
import appleShopImg from './../img/shopItems/apple.png'
import asparagusShopImg from './../img/shopItems/asparagus.png'
import carrotShopImg from './../img/shopItems/carrot.png'
import cherryShopImg from './../img/shopItems/cherry.png'
import courgetteShopImg from './../img/shopItems/courgette.png'
import dollarShopImg from './../img/shopItems/dollar.png'
import hourglassShopImg from './../img/shopItems/hourglass.png'
import lettuceShopImg from './../img/shopItems/lettuce.png'
import orangeShopImg from './../img/shopItems/orange.png'
import pearShopImg from './../img/shopItems/pear.png'
import pepperShopImg from './../img/shopItems/pepper.png'
import radishShopImg from './../img/shopItems/radish.png'
import spinachShopImg from './../img/shopItems/spinach.png'
import tabButtonsShopImg from './../img/shopItems/tabButtons.jpg'
import tomatoShopImg from './../img/shopItems/tomato.png'
import woodenBarShopImg from './../img/shopItems/woodenBar.png'
import arrowTaskImg from './../img/taskPage/arrow.png'
import bachecaBgTaskImg from './../img/taskPage/bachecaBg.png'
import telegramTaskImg from './../img/taskPage/telegram.png'
import appleGif from './../gif/apple.gif'
import asparagusGif from './../gif/asparagus.gif'
import carrotGif from './../gif/carrot.gif'
import courgetteGif from './../gif/courgette.gif'
import pepperGif from './../gif/pepper.gif'
import radishGif from './../gif/radish.gif'
import saladGif from './../gif/salad.gif'
import spinachGif from './../gif/spinach.gif'
import tomatoGif from './../gif/tomato.gif'

function loadAsset(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(path);
    img.onerror = () => reject(new Error(`Failed to load ${path}`));
    img.src = path;
  });
}

export async function loadAssets(callback: () => void): Promise<void> {
  try {
    await loadAsset(loadingImg);
    await loadAsset(mainBg);
    await loadAsset(woodenBg);
    await loadAsset(inviteImg);
    await loadAsset(moneyImg);
    await loadAsset(shopImg);
    await loadAsset(sproutImg);
    await loadAsset(addImg);
    await loadAsset(appleImg);
    await loadAsset(arrowLeftImg);
    await loadAsset(arrowRightImg);
    await loadAsset(asparagusImg);
    await loadAsset(carrotImg);
    await loadAsset(cherryImg);
    await loadAsset(courgetteImg);
    await loadAsset(emptyFieldImg);
    await loadAsset(lockedFieldImg);
    await loadAsset(pearImg);
    await loadAsset(pepperImg);
    await loadAsset(radishImg);
    await loadAsset(saladImg);
    await loadAsset(spinachImg);
    await loadAsset(tomatoImg);
    await loadAsset(appleShopImg);
    await loadAsset(asparagusShopImg);
    await loadAsset(carrotShopImg);
    await loadAsset(cherryShopImg);
    await loadAsset(courgetteShopImg);
    await loadAsset(dollarShopImg);
    await loadAsset(hourglassShopImg);
    await loadAsset(lettuceShopImg);
    await loadAsset(orangeShopImg);
    await loadAsset(pearShopImg);
    await loadAsset(pepperShopImg);
    await loadAsset(radishShopImg);
    await loadAsset(spinachShopImg);
    await loadAsset(tabButtonsShopImg);
    await loadAsset(tomatoShopImg);
    await loadAsset(woodenBarShopImg);
    await loadAsset(arrowTaskImg);
    await loadAsset(bachecaBgTaskImg);
    await loadAsset(telegramTaskImg);
    await loadAsset(appleGif);
    await loadAsset(asparagusGif);
    await loadAsset(carrotGif);
    await loadAsset(courgetteGif);
    await loadAsset(pepperGif);
    await loadAsset(radishGif);
    await loadAsset(saladGif);
    await loadAsset(spinachGif);
    await loadAsset(tomatoGif);

    callback();
  } catch (error) {
    console.error('An error occurred while loading assets:', error);
  }
}
