import { expect, test } from "bun:test";
import { parseRss } from "..";

async function baseTest(response: Response) {
  const responseText = await response.text();
  const parsedRss = parseRss(responseText);
  const firstItem = parsedRss[0];
  expect(firstItem.id).toBeString();
  expect(firstItem.title).toBeString();
  expect(firstItem.date).toBeString();
  expect(firstItem.url).toBeString();
}

test("EspressoPlanet test", async () => {
  const response = await fetch(
    "https://www.espressoplanet.com/xcmsrss/feed-23.xml",
    { method: "GET" },
  );
  await baseTest(response);
});

test("CoffeeGeek test", async () => {
  const response = await fetch("https://coffeegeek.com/feed/", {
    method: "GET",
  });
  await baseTest(response);
});

test("EspressoPlanet test", async () => {
  const response = await fetch("https://www.nestle.com/news-rss.xml", {
    method: "GET",
  });
  await baseTest(response);
});

test("Google FAIL test", async () => {
  const response = await fetch("https://google.com", {
    method: "GET",
  });

  const responseText = await response.text();
  try {
    const result = parseRss(responseText);
    expect(result).toBeFalsy();
  } catch (e) {
    expect(e).toEqual(new Error("Unable to parse RSS feed"));
  }
});
