import json, sys, urllib.request, os
from rembg import remove, new_session
from PIL import Image
data, src, out = sys.argv[1], sys.argv[2], sys.argv[3]
prods = [e["node"] for e in json.load(open(data))["data"]["products"]["edges"]]
m = lambda n, k: next((f["value"] for f in n["metafields"] if f["key"] == k), None)
apples = [n for n in prods if m(n, "category") == "apples"]
sess = new_session("isnet-general-use")
for n in apples:
    url = n["featuredImage"]["url"]; url += ("&" if "?" in url else "?") + "width=1400"
    sp = f"{src}/{n['handle']}.png"
    if not os.path.exists(sp):
        urllib.request.urlretrieve(url, sp)
    im = Image.open(sp).convert("RGB")
    cut = remove(im, session=sess, post_process_mask=True)
    bbox = cut.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    cut = cut.crop(bbox)
    cut.save(f"{out}/{n['handle']}.png")
    print(n["handle"], cut.size, flush=True)
