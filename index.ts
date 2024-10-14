import { XMLParser } from "fast-xml-parser";

type RssFeed = {
  id: string;
  title: string;
  url: string;
  date: string;
}[];

type RssStructure = {
  rss: {
    channel: {
      title: string;
      description: string;
      lastBuildDate: string;
      link: string;
      item: {
        title: string;
        category: string;
        pubDate: string;
        description: string;
        link: string;
      }[];
    };
  };
};

const parser = new XMLParser();

export function parseRss(xml: string): RssFeed {
  const parsedXml = parser.parse(xml) as RssStructure;

  if (parsedXml.rss === undefined) {
    throw new Error("Unable to parse RSS feed");
  }

  return parsedXml.rss.channel.item.map((item, index) => ({
    id: index.toString(),
    title: item.title,
    date: item.pubDate,
    url: item.link,
  }));
}
