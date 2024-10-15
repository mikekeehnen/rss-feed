import { XMLParser } from "fast-xml-parser";
import { findFirstImage, tryDifferentAttributes } from "./image";
import type { RssFeed, RssStructure } from "./types";

const parser = new XMLParser({
  ignoreAttributes: false,
  processEntities: true,
  htmlEntities: true,
});

export function parseRss(xml: string): RssFeed {
  const parsedXml = parser.parse(xml) as RssStructure;
  if (parsedXml.rss === undefined) {
    throw new Error("Unable to parse RSS feed");
  }

  return parsedXml.rss.channel.item.map((item, index) => {
    const image = tryDifferentAttributes([
      () => item["media:content"]?.["@_url"],
      () =>
        findFirstImage(
          item["content:encoded"]
            ? parser.parse(item["content:encoded"])
            : undefined,
        ),
      () => findFirstImage(parser.parse(item.description)),
    ]);

    return {
      id: index.toString(),
      title: item.title,
      date: item.pubDate,
      url: item.link,
      image: image,
    };
  });
}
