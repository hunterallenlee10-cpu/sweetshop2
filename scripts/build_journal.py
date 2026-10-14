import re, html, json, sys
s = open(sys.argv[1], encoding="utf-8").read()
posts = []
for e in re.findall(r"<entry>(.*?)</entry>", s, re.S):
    g = lambda pat: (re.search(pat, e, re.S) or [None, None])[1]
    title = html.unescape(g(r"<title>(.*?)</title>")).replace("–", "-").replace("—", "-")
    link = g(r'<link[^>]*href="(.*?)"')
    slug = link.rsplit("/", 1)[-1]
    body = html.unescape(g(r"<content[^>]*>(.*?)</content>"))
    summ = g(r"<summary[^>]*>(.*?)</summary>")
    img = re.search(r'<img[^>]*src="([^"]+)"', html.unescape(e))
    # keep a small, safe subset of tags
    body = re.sub(r"<(script|style|iframe)[^>]*>.*?</\1>", "", body, flags=re.S | re.I)
    body = re.sub(r"<img[^>]*>", "", body)
    body = re.sub(r"<(/?)(?:h1|h2)\b[^>]*>", r"<\1h2>", body)
    body = re.sub(r"<(/?)(?:h3|h4|h5|h6)\b[^>]*>", r"<\1h3>", body)
    body = re.sub(r"<(/?)(p|ul|ol|li|strong|em|b|i|br)\b[^>]*>", r"<\1\2>", body)
    body = re.sub(r'<a [^>]*href="([^"]+)"[^>]*>', r'<a href="\1">', body)
    body = re.sub(r"<(?!/?(?:h2|h3|p|ul|ol|li|strong|em|b|i|br|a)\b)[^>]+>", "", body)
    body = re.sub(r"<(\w+)>\s*</\1>", "", body)
    body = re.sub(r"[\U0001F300-\U0001FAFF☀-➿️]", "", body)
    body = body.replace("—", ", ").replace("–", "-").replace("&nbsp;", " ")
    body = re.sub(r"\s+", " ", body).strip()
    text = re.sub(r"<[^>]+>", " ", body)
    excerpt = re.sub(r"\s+", " ", text).strip()[:180].rsplit(" ", 1)[0] + "..."
    imgurl = img.group(1) if img else None
    if imgurl and imgurl.startswith("//"): imgurl = "https:" + imgurl
    posts.append(dict(slug=slug, title=title, publishedAt=g(r"<published>(.*?)</published>"),
                      author=html.unescape(g(r"<name>(.*?)</name>") or ""), excerpt=excerpt, image=imgurl,
                      tags=[html.unescape(t) for t in re.findall(r'<category term="([^"]+)"', e)],
                      sourceUrl=link, bodyHtml=body))
json.dump({"_source": "https://myfavoritesweetshoppe.com/blogs/my-favorites.atom", "posts": posts},
          open(sys.argv[2], "w"), indent=2, ensure_ascii=False)
for p in posts: print(p["slug"], "|", p["author"], "|", p["image"], "|", len(p["bodyHtml"]))
