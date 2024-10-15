export type RssFeed = {
  id: string;
  title: string;
  url: string;
  date: string;
  image?: string;
}[];

export type RssStructure = {
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
        "media:content"?: {
          "@_url": string;
        };
        "content:encoded"?: string;
      }[];
    };
  };
};
