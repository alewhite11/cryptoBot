import { Pool } from "../interfaces/Pool";
import wateringCanImg from './../img/plantPage/wateringCan.png'
import antihailImg from './../img/plantPage/antihail.png'
import fertilizerImg from './../img/plantPage/fertilizer.png'
import greenhouseImg from './../img/plantPage/greenhouse.png'
import pumpImg from './../img/plantPage/pump.png'

export const pools : Pool[] = [
    {name: "Watering can", earning: 10, price: 200, img: wateringCanImg},
    {name: "Anti-hail", earning: 30, price: 500, img: antihailImg},
    {name: "Fertilizer", earning: 100, price: 1000, img: fertilizerImg},
    {name: "Pump", earning: 250, price: 2500, img: pumpImg},
    {name: "Greenhouse", earning: 500, price: 5000, img: greenhouseImg},
  ]