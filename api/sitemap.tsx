import { NextApiRequest, NextApiResponse } from "next"

type post = {
  id: string,
  publishedAt: string,
}

const generateSitemap = (posts: post[], location: string): string => {
  let xml: string = ""

  posts.map(post => {
    // YYYY-MM-DD
    const postDate: string = new Date(post.publishedAt)
      .toISOString()
      .split("T")[0]
    const postUrl = location + post.id

    xml += `<url>
          <loc>${postUrl}</loc>
          <lastmod>${postDate}</lastmod>
          <priority>0.50</priority>
        </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${xml}
      </urlset>`
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const content = await fetch(`https://xxxxx.microcms.io/api/v1/post`, {
    headers: { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "" },
  })
    .then(res => res.json())
    .catch(error => null)

  if (!content) {
    return res.status(401).json({ message: "Invalid slug" })
  }

  const location = "https://xxxxx.com/post/"
  const sitemap: string = generateSitemap(content.contents, location)

  res.statusCode = 200
  res.setHeader("Content-Type", "text/xml; charset=utf-8")
  res.end(sitemap)
}