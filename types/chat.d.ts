interface Message {
  sender: string;
  content: string;
}

type Messages = Message[];

export { Message, Messages };
