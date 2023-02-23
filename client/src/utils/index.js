import { surpriseMePrompts } from "../constants";
import FileSaver from 'file-saver'

export function getRandomEntry() {
    return surpriseMePrompts[Math.floor(Math.random() * surpriseMePrompts.length)]
}

export function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}