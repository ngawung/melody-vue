import axios from "axios";

export default class MelodyAPI {
    constructor(url) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 10000,
        })
    }

    getSingle() {
        
    }

    getBlog() {

    }

    getList() {
        return new Promise(async (res, rej) => {
            try {
                const result = await this.instance.post(`/list/${mode}`, data);
                res(result.data)
            } catch(e) {
                rej("Failed to load data")
                console.log(e);
            }
        })
    }

    getCount(mode, data) {
        return new Promise(async (res, rej) => {
            try {
                const result = await this.instance.post(`/count/${mode}`, data);
                res(result.data)
            } catch(e) {
                rej("Failed to load data")
                console.log(e);
            }
        })
    }


}