import { MailboxModule } from './mailbox.module';

describe('MailboxModule', () => {
  let mailboxModule: MailboxModule;

  beforeEach(() => {
    mailboxModule = new MailboxModule();
  });

  it('should create an instance', () => {
    expect(mailboxModule).toBeTruthy();
  });
});
