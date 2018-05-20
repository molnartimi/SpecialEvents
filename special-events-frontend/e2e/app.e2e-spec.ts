import { SpecialEventsPage } from './app.po';

describe('special-events App', () => {
  let page: SpecialEventsPage;

  beforeEach(() => {
    page = new SpecialEventsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
