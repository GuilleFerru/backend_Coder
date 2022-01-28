import BaseRepository from "./base/BaseRepository";
import { Mensaje } from "../model/DAOs/interfaces/IMensaje";


export  class MensajeRepository extends BaseRepository<Mensaje> {
    countOfMensaje(): Promise<number> {
        return this.collection.countDocuments({});
      }

}