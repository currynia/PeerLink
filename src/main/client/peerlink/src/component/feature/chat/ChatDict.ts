import { Message } from "./ChatDto";

class ChatDict {
  private readonly dict: { [key: string]: Message[] };
  constructor(dict: { [key: string]: Message[] } = {}) {
    this.dict = { ...dict };
  }

  static parsefromApi(
    data: Array<{ id: string; results: Array<Message> }>
  ): ChatDict {
    const newDict: { [id: string]: Message[] } = {};
    console.log(data);
    for (const i of data) {
      newDict[i.id] = i.results;
    }
    return new ChatDict(newDict);
  }

  addKey(key: string): ChatDict {
    if (!this.dict[key]) {
      const newDict = { ...this.dict, [key]: [] };
      return new ChatDict(newDict);
    }
    return this;
  }

  addMessage(key: string, message: Message): ChatDict {
    const newDict = { ...this.dict };

    if (!newDict[key]) {
      newDict[key] = [];
    }

    newDict[key] = [...newDict[key], message];

    return new ChatDict(newDict);
  }
  getMessages(key: string): Message[] {
    return this.dict[key] || [];
  }

  getPeople(): string[] {
    var people: string[] = [];
    for (const [key, value] of Object.entries(this.dict)) {
      people = people.concat(key);
    }

    return people;
  }
}

export default ChatDict;
