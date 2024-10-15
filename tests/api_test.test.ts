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

test("Nestle test", async () => {
  const response = await fetch("https://www.nestle.com/news-rss.xml", {
    method: "GET",
  });
  await baseTest(response);
});

test("Spend with pennies test", async () => {
  const response = await fetch("https://spendwithpennies.com/feed", {
    method: "GET",
  });
  await baseTest(response);
});

test("RecipeTinEats test", async () => {
  const response = await fetch(
    "https://www.recipetineats.com/category/main-dishes/rss",
    {
      method: "GET",
    },
  );
  await baseTest(response);
});

test("BudgetBytes test", async () => {
  const response = await fetch(
    "https://www.budgetbytes.com/category/recipes/cost-per-recipe/recipes-under-10/rss",
    {
      method: "GET",
    },
  );
  await baseTest(response);
});

test("Apple FAIL test", async () => {
  const response = await fetch("https://apple.com", {
    method: "GET",
  });

  const responseText = await response.text();
  try {
    parseRss(responseText);
  } catch (e) {
    expect(e).toEqual(new Error("Unable to parse RSS feed"));
  }
});
