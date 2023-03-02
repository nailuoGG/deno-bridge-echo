import _ from "npm:lodash@^4.17.21";
import { ChatGPTAPI } from "npm:chatgpt@5.0.4";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import Keyv from 'npm:keyv';
import { KeyvFile } from 'npm:keyv-file';

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const messageStore = new Keyv({
    store: new KeyvFile({ expiredCheckDelay: 24 * 3600 * 1000 * 30 })
});

const api = new ChatGPTAPI({
    apiKey: OPENAI_API_KEY,
    messageStore
})

export const getChatGptResponse = async () => {
    const message = `请介绍你自己`
    const res = await api.sendMessage(message);

    return res
}
