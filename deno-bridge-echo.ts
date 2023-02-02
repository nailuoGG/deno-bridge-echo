import { DenoBridge } from "https://deno.land/x/denobridge@0.0.1/mod.ts";

import { serve } from "https://deno.land/std/http/server.ts";
import { getChatGptResponse } from './chatgpt';

const bridge = new DenoBridge(
  Deno.args[0],
  Deno.args[1],
  Deno.args[2],
  messageDispatcher
);

// 存放数据用的
const data: {
  currentTab: {
    url?: string;
    title?: string;
  };
} = { currentTab: {} };

async function messageDispatcher(message: string) {
  const [funcName, funcArgs] = JSON.parse(message)[1];
  if (funcName === "getCurrentTab") {
    const { currentTab } = data;
    if (!currentTab.url) {
      bridge.messageToEmacs("No Valid CurrentTab");
      return;
    }
    bridge.evalInEmacs(
      `(insert "[[${data.currentTab.url}][ ${currentTab.title}]]")`
    );
  }
  if (funcName === 'getChatGptResponse') {
    const reply = await getChatGptResponse()
    bridge.messageToEmacs(reply.text);
  }
}

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  if (url.pathname === "/v1/echo") {
    const payload = await req.json();
    data.currentTab = {
      url: payload.url,
      title: payload.title,
    };
    return new Response(JSON.stringify({ message: "already memorize" }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }
  if (url.pathname === "/v1/show") {
    return new Response(JSON.stringify(data.currentTab), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }

  const body = JSON.stringify({ message: "NOT FOUND" });

  return new Response(body, {
    status: 404,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}

serve(handler, { port: 8000 });
