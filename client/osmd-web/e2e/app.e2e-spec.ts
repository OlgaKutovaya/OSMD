import { OsmdWebPage } from './app.po';

describe('osmd-web App', function() {
  let page: OsmdWebPage;

  beforeEach(() => {
    page = new OsmdWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
