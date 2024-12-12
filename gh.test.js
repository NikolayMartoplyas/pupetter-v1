let page;
jest.setTimeout(60000);

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe('Github page tests', () => {
  beforeEach(async () => {
    await page.goto('https://github.com/team');
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$('header div div a');
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    const expected = 'GitHub · Build and ship software on a single, collaborative platform · GitHub';
    expect(title2).toEqual(expected);
  }, 40000);

  test('The first link attribute', async () => {
    const actual = await page.$eval('a', (link) => link.getAttribute('href'));
    expect(actual).toEqual('#start-of-content');
  }, 20000);

  test('The page contains Sign in button', async () => {
    const btnSelector = '.btn-large-mktg.btn-mktg';
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    const expected = 'Get started with Team';
    expect(actual).toContain(expected);
  }, 20000);
});

test('The pricing page has a header', async () => {
  await page.goto('https://github.com/enterprise/startups');
  const btnSelector = '.col-10-max.color-fg-default.mx-auto.h1-mktg';
  const actual = await page.$eval(btnSelector, (link) => link.textContent);
  const expected = 'Build your startupon GitHub';
  expect(actual).toContain(expected);
}, 25000);

test('presence of a title on the page topics', async () => {
  await page.goto('https://github.com/topics');
  const btnSelector = '.h1';
  const actual = await page.$eval(btnSelector, (link) => link.textContent);
  const expected = 'Topics';
  expect(actual).toContain(expected);
}, 25000);

test('presence of a title on the sponsor page', async () => {
  await page.goto('https://github.com/sponsors');
  const btnSelector = '#hero-section-brand-heading';
  const actual = await page.$eval(btnSelector, (link) => link.textContent);
  const expected = 'Support the developers who power open source';
  expect(actual).toContain(expected);
}, 25000);
