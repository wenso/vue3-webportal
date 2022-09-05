import requestService from "../../utils/request";
import settings from "../config/index"

export default function request(){
    return requestService.get(settings.service);
}