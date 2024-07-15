import { Pool } from "../interfaces/Pool";
import wateringCanImg from './../img/plantPage/wateringCan.png'
import antihailImg from './../img/plantPage/antihail.png'
import fertilizerImg from './../img/plantPage/fertilizer.png'
import greenhouseImg from './../img/plantPage/greenhouse.png'
import pumpImg from './../img/plantPage/pump.png'

export const pools : Pool[] = [
    {name: "Watering can", earning: 10, price: 0, img: wateringCanImg},
    {name: "Anti-hail", earning: 10, price: 100, img: antihailImg},
    {name: "Fertilizer", earning: 10, price: 100, img: fertilizerImg},
    {name: "Pump", earning: 10, price: 100, img: pumpImg},
    {name: "Greenhouse", earning: 10, price: 100, img: greenhouseImg},
  ]