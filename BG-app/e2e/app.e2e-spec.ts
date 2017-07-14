import { BGAppPage } from './app.po';

describe('bg-app App', () => {
  let page: BGAppPage;

  beforeEach(() => {
    page = new BGAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
