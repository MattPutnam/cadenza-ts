import { Message as MessageComponent } from './message';

export default {
  title: 'Components / Message'
};

export const Message = () => <MessageComponent>Message</MessageComponent>;

export const Error = () => <MessageComponent error>Error Message</MessageComponent>;
