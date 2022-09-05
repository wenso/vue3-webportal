import {Request} from "../../utils/request";
import settings from "../config/index"

export default function request(){
    return Request.get(settings.service);
}