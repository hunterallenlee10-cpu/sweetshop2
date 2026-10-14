"""Builds /data/products.json (Storefront API shape) from the live Shopify products.json dump.

Usage: python3 -I build_data.py <raw_dir> <out_dir>
"""
import html
import json
import re
import sys
from urllib.parse import quote

RAW, OUT = sys.argv[1], sys.argv[2]
STORE = "https://myfavoritesweetshoppe.com"
raw = {p["handle"]: p for p in json.load(open(f"{RAW}/products_1.json"))["products"]}

ALLERGEN_NOTE = (
    "Every item may contain or come into contact with wheat, eggs, peanuts and tree nuts."
)

# clean handle, shopify handle, category, overrides
# fam: caramel | chocolate | candy | nutty  (apples only, for the flavor explorer)
# made: ingredients named in the product's own description that matter for allergies
# ship: False when the live store says local pickup / delivery only
C = []


def add(handle, src, cat, **kw):
    C.append(dict(handle=handle, src=src, cat=cat, **kw))


# ---------- Caramel apples (core menu) ----------
A = "apples"
add("caramel-apple", "caramel-gourmet-caramel-apple-1", A, name="Caramel", fam=["caramel"],
    short="The base of every apple: homemade small-batch caramel over a tart Granny Smith.")
add("candy-apple", "gourmet-candy-apple", A, name="Candy Apple", fam=["candy"],
    short="Traditional red candy taffy apple. Seasonal, or by special order.")
add("i-like-apple-pie", "i-like-apple-pie", A, name="I Like Apple Pie", fam=["caramel", "chocolate"],
    badge="best-seller", short="Caramel, white chocolate and brown sugar cinnamon. Our #1 apple.")
add("triple-chocolate", "triple-chocolate-gourmet-caramel-apple", A, name="Triple Chocolate",
    fam=["chocolate"], short="Caramel, milk chocolate, then white and dark drizzle.")
add("chocolate-caramel-sea-salt", "chocolate-caramel-sea-salt-gourmet-caramel-apple", A,
    name="Chocolate Caramel Sea Salt", fam=["chocolate", "caramel"],
    short="Smooth milk chocolate finished with sea salt. Dark by special order.")
add("chocolate-covered-pretzel", "chocolate-covered-pretzel-gourmet-caramel-apple", A,
    name="Chocolate Covered Pretzel", fam=["chocolate"], made=["wheat"],
    short="Chopped pretzels pressed into caramel, then fully dipped in milk chocolate.")
add("snickers", "snickers-gourmet-caramel-apple", A, name="Snickers", fam=["chocolate", "candy", "nutty"],
    made=["peanuts"], short="Caramel topped with a chopped-up Snickers bar.")
add("peanut-butter-paradise", "peanut-butter-paradise-gourmet-caramel-apple", A,
    name="Peanut Butter Paradise", fam=["chocolate", "candy", "nutty"], made=["peanuts"],
    short="Crumbled Reese's cups over homemade caramel.")
add("heath-heaven", "heath-heaven-gourmet-caramel-apple", A, name="Heath Heaven",
    fam=["chocolate", "candy"], made=["tree nuts"], short="Chocolate Heath toffee over caramel.")
add("cookies-and-cream", "cookies-cream-gourmet-caramel-apple", A, name="Cookies & Cream",
    fam=["chocolate", "candy"], made=["wheat"], short="Cookie crumbles over smooth white chocolate. A kid favorite.")
add("crunch-bar", "crunch-bar-gourmet-caramel-apple", A, name="Crunch Bar", fam=["chocolate", "candy"],
    short="Chopped Nestle Crunch over homemade caramel.")
add("m-and-m", "m-m-gourmet-caramel-apple", A, name="M&M", fam=["candy", "chocolate"],
    short="Bright, colorful and covered in M&Ms.")
add("reeses-pieces", "reese-pieces-gourmet-caramel-apple", A, name="Reese's Pieces",
    fam=["candy", "nutty"], made=["peanuts"], short="Mini Reese's Pieces on a classic caramel apple.")
add("confetti", "confetti-gourmet-caramel-apple", A, name="Confetti", fam=["candy"],
    short="Rolled in seasonal sprinkles, or your colors by special order.")
add("pecan", "pecan-gourmet-caramel-apple", A, name="Pecan", fam=["nutty", "caramel"], made=["tree nuts"],
    short="Rolled in chopped pecans. One of the owner's favorites.")
add("pecan-drizzle", "pecan-drizzle-gourmet-caramel-apple", A, name="Pecan Drizzle",
    fam=["nutty", "chocolate"], made=["tree nuts"], short="A chocolate turtle in apple form: pecans and milk chocolate.")
add("peanut", "peanut-gourmet-caramel-apple", A, name="Peanut", fam=["nutty", "caramel"], made=["peanuts"],
    short="Homemade caramel rolled in crushed peanuts. A fall classic.")
add("peanut-chocolate-drizzle", "peanut-with-milk-chocolate-drizzle-gourmet-caramel-apple", A,
    name="Peanut with Chocolate Drizzle", fam=["nutty", "chocolate"], made=["peanuts"],
    short="Our peanut apple, with milk chocolate drizzle.")

# ---------- Halloween apples & treats (fall season) ----------
H = dict(season=["halloween"], badge="seasonal")
add("witchs-brew", "witchs-brew-gourmet-caramel-apple", A, name="Witch's Brew", fam=["chocolate", "candy"],
    short="Marshmallows, colored chocolate and dark chocolate bubbling over caramel.", **H)
add("melted-skull", "melted-skull-gourmet-caramel-apple", A, name="Melted Skull", fam=["chocolate"],
    short="Ooozing with chocolate. Milk, dark or plain caramel base.", **H)
add("ghost", "ghost-gourmet-caramel-apple", A, name="Ghost", fam=["chocolate"],
    short="Caramel, creamy white chocolate and two marshmallow arms.", **H)
add("jack-o-lantern", "jack-o-lantern-caramel-apple", A, name="Jack-o-Lantern", fam=["caramel", "candy"],
    short="Homemade caramel, decorated by hand with a friendly face.", **H)
add("halloween-spirit", "halloween-spirit-gourmet-caramel-apple", A, name="Halloween Spirit",
    fam=["chocolate", "candy"], short="Festively decorated in milk, white or dark chocolate.", **H)
add("mummy", "mummy-gourmet-caramel-apple", A, name="Mummy", fam=["chocolate"],
    short="Wrapped in creamy white chocolate. A favorite this time of year.", **H)
add("skeleton", "skeleton-gourmet-caramel-apple", A, name="Skeleton", fam=["chocolate"],
    short="White chocolate with a hand-drawn skeleton face.", **H)
add("fall-confetti", "fall-confetti-apple", A, name="Fall Confetti", fam=["chocolate", "candy"],
    short="White chocolate rolled in seasonal jimmies.", **H)
add("monster-marshmallow-pop", "monster-jumbo-mm-pop", "chocolates", name="Monster Jumbo Marshmallow Pop",
    short="A one-eyed spooky monster pop, sure to delight, not fright.", **H)

# ---------- Club ----------
add("caramel-apple-club", "the-caramel-apple-club-3-apple-subscription", "club",
    name="The Caramel Apple Club", short="Three gourmet caramel apples, handpicked for the season and shipped to your door.")
add("caramel-apple-club-single", "the-caramel-apple-club-single-apple-subscription", "club",
    name="The Caramel Apple Club: Single", short="One gourmet caramel apple per delivery.")

# ---------- Hand-dipped chocolates ----------
D = "chocolates"
add("mountain-magic-bites", "mountain-bark-bites", D, name="Mountain Magic Bites", badge="best-seller",
    made=["peanuts"], kind="bags & boxes",
    short="Our almost-famous peanut buttery chocolate crunch, in a half-pound bag.")
add("caramel-cashew-patties", "homemade-caramel-cashew-patties", D, name="Caramel Cashew Patties",
    made=["tree nuts"], kind="bags & boxes", short="Creamy caramel, salty cashews (or pecans) and rich chocolate.")
add("chocolate-buckeyes", "chocolate-buckeyes", D, name="Chocolate Buckeyes", made=["peanuts"], kind="bags & boxes",
    short="Smooth peanut butter balls dipped in creamy milk chocolate. A regional staple.")
add("assorted-chocolate-box", "assorted-chocolate-box-1", D, name="Assorted Chocolate Box",
    made=["peanuts", "tree nuts"], kind="bags & boxes",
    short="Caramels, clusters, creams, patties and truffles in milk, white and dark.")
add("milk-chocolate-nonpareils", "milk-chocolate-nonpareils", D, name="Milk Chocolate Nonpareils", kind="bags & boxes",
    short="Creamy milk chocolate drops in crunchy rainbow sprinkles.")
add("dark-chocolate-nonpareils", "dark-chocolate-nonpareils", D, name="Dark Chocolate Nonpareils", kind="bags & boxes",
    short="Smooth dark chocolate drops in crunchy white sprinkles.")
P = dict(made=["wheat"], kind="pretzels")
add("milk-chocolate-pretzel-twist", "milk-chocolate-pretzel-twist-2", D, name="Milk Chocolate Pretzel Twist",
    short="A traditional favorite, hand-dipped and drizzled.", **P)
add("dark-chocolate-pretzel-twist", "dark-chocolate-pretzel-twist", D, name="Dark Chocolate Pretzel Twist",
    short="Lustrous dark chocolate over a salty twist.", **P)
add("white-chocolate-pretzel-twist", "white-chocolate-pretzel-twist", D, name="White Chocolate Pretzel Twist",
    short="Creamy white chocolate, any time of day.", **P)
add("triple-chocolate-pretzel-twist", "triple-chocolate-pretzel-twist", D, name="Triple Chocolate Pretzel Twist",
    short="Milk, white and dark on one twist.", **P)
add("milk-chocolate-pretzel-rod", "milk-chocolate-pretzel-rod", D, name="Milk Chocolate Pretzel Rod",
    short="A store favorite. Grab one, or a dozen.", **P)
add("dark-chocolate-pretzel-rod", "dark-chocolate-pretzel-rod", D, name="Dark Chocolate Pretzel Rod",
    short="Dark chocolate on a salty rod. Just the ticket.", **P)
add("white-chocolate-pretzel-rod", "white-chocolate-pretzel-rod", D, name="White Chocolate Pretzel Rod",
    short="Salty pretzel, sweet white chocolate.", **P)
add("triple-chocolate-pretzel-rod", "triple-chocolate-pretzel-rod", D, name="Triple Chocolate Pretzel Rod",
    short="Milk, white and dark. Elegant and sweet.", **P)
S = dict(kind="stuffed twists")
add("nutella-stuffed-pretzel-twist", "nutella-stuffed-pretzel-twist", D, name="Nutella Stuffed Pretzel Twist",
    made=["wheat", "tree nuts"], short="Gooey chocolate hazelnut inside a chocolate-covered twist.", **S)
add("peanut-butter-stuffed-pretzel-twist", "peanut-butter-stuffed-pretzel-twist-1", D,
    name="Peanut Butter Stuffed Pretzel Twist", made=["wheat", "peanuts"],
    short="Peanut butter, chocolate and a crunchy, salty twist.", **S)
add("peanut-butter-caramel-stuffed-pretzel-twist", "peanut-butter-stuffed-pretzel-twist", D,
    name="Peanut Butter & Caramel Stuffed Twist", made=["wheat", "peanuts"],
    short="Can't decide between caramel and peanut butter? No need.", **S)
add("caramel-stuffed-pretzel-twist", "mystery-stuffed-chocolate-pretzel-twist", D,
    name="Caramel Stuffed Pretzel Twist", made=["wheat"],
    short="Homemade caramel fills every hole of the twist.", **S)
add("caramel-sea-salt-milk-chocolate-twist", "caramel-sea-salt-stuffed-milk-chocolate-pretzel-twist", D,
    name="Caramel Sea Salt Stuffed Twist, Milk", made=["wheat"],
    short="Caramel-filled, milk chocolate dipped, sea salt on top.", **S)
add("caramel-sea-salt-dark-chocolate-twist", "copy-of-caramel-sea-salt-stuffed-dark-chocolate-pretzel-twist", D,
    name="Caramel Sea Salt Stuffed Twist, Dark", made=["wheat"],
    short="Dark chocolate, caramel, sea salt, pretzel. Yes please.", **S)
O = dict(made=["wheat"], kind="dipped cookies")
add("milk-chocolate-dipped-oreo", "milk-chocolate-dipped-oreo", D, name="Milk Chocolate Dipped Oreo",
    short="Everyone's favorite cookie, dunked in smooth milk chocolate.", **O)
add("dark-chocolate-dipped-oreo", "dark-chocolate-dipped-oreo", D, name="Dark Chocolate Dipped Oreo",
    short="Rich dark chocolate on a classic cookie.", **O)
add("white-chocolate-dipped-oreo", "white-chocolate-dipped-oreo", D, name="White Chocolate Dipped Oreo",
    short="Cookies and cream, the way it should be.", **O)
add("caramel-filled-oreo", "milk-chocolate-pretzel-twist", D, name="Caramel Filled Dipped Oreo",
    short="Homemade caramel smushed in the middle, dipped in milk chocolate.", **O)
add("reeses-stuffed-oreo", "peanut-butter-filled-chocolate-dipped-oreo", D, name="Reese's Stuffed Oreo",
    made=["wheat", "peanuts"], kind="dipped cookies",
    short="A Double Stuf Oreo with a Reese's Cup inside, dunked in milk chocolate.")

# ---------- Strawberries (pickup only per live store) ----------
B = dict(ship=False)
add("milk-chocolate-strawberries", "milk-chocolate-chocolate-covered-strawberries", "strawberries",
    name="Milk Chocolate Covered Strawberries", short="Hand-dipped to order in creamy milk chocolate, then drizzled.", **B)
add("dark-chocolate-strawberries", "dark-chocolate-chocolate-covered-strawberries", "strawberries",
    name="Dark Chocolate Covered Strawberries", short="Hand-dipped to order in dark chocolate, then drizzled.", **B)

# ---------- Care packages ----------
add("happy-birthday-care-package", "happy-birthday-care-package-🎉🎂", "care-packages",
    name="Happy Birthday Care Package",
    short="Hand-dipped favorites, a gourmet caramel apple and a cake pop with a real candle.")
add("valentines-care-package", "valentine-s-day-care-package-💝", "care-packages", name="Valentine's Day Care Package",
    season=["valentines"], badge="seasonal",
    short="Our most-loved hand-dipped chocolates with a gourmet caramel apple.")

# ---------- Christmas ----------
X = dict(season=["christmas"], badge="seasonal")
add("christmas-tree-apple", "christmas-tree-apple", A, name="Christmas Tree Apple", fam=["chocolate", "candy"],
    short="Hand decorated for the holidays in milk, white or dark.", **X)
add("holiday-drizzle-apple", "holiday-drizzle-apple", A, name="Holiday Drizzle Apple", fam=["chocolate"],
    short="A festive crowd pleaser in milk, white or dark.", **X)
add("frosty-apple", "frosty-the-snowman", A, name="Frosty the Snowman Apple", fam=["chocolate"],
    short="White chocolate Frosty, decorated by hand.", **X)
add("snowflake-apple", "snowflake-apple", A, name="Snowflake Apple", fam=["chocolate"],
    short="Let it snow, in milk or dark chocolate.", **X)
add("christmas-twist-stack", "christmas-twist-stack", "chocolates", name="Christmas Twist Stack", made=["wheat"],
    short="Nine hand-dipped, decorated twists: three each milk, white and dark.", season=["christmas"],
    badge="best-seller")
add("mountain-bark-gift-box", "mountain-bark-gift-box", "chocolates", name="Mountain Bark Gift Box", made=["peanuts"],
    short="Our peanut buttery, crunchy store favorite in a holiday gift box.", **X)
add("dozen-decorated-oreo-gift", "dozen-chocolate-cookie-gift", "chocolates", name="Dozen Holiday Oreo Gift",
    made=["wheat"], short="Twelve hand-dipped Oreos dressed as Santas, snowmen, trees and Rudolphs.", **X)
add("snowman-cookie-gift-pack", "snowman-cookie-gift-pack", "chocolates", name="Snowman Cookie Gift Pack",
    made=["wheat"], short="Three dipped sandwich cookies decorated like everyone's favorite snowman.", **X)

# ---------- Valentine's ----------
V = dict(season=["valentines"], badge="seasonal")
add("valentines-strawberries", "chocolate-covered-strawberries", "strawberries",
    name="Valentine's Chocolate Covered Strawberries", ship=False,
    short="Milk, white and dark, dressed up with Valentine's designs.", **V)
add("strawberry-bouquet", "valentines-day-chocolate-covered-strawberry-bouquet", "strawberries",
    name="Chocolate Covered Strawberry Bouquet", ship=False,
    short="A one-pound bouquet of milk, white and dark berries.", **V)
add("milk-chocolate-strawberry-bouquet", "valentines-day-milk-chocolate-covered-strawberry-bouquet", "strawberries",
    name="Milk Chocolate Strawberry Bouquet", ship=False, short="A one-pound bouquet in milk chocolate.", **V)
add("mountain-magic-heart-box", "mountain-magic-limited-edition-heart-box", "chocolates",
    name="Mountain Magic Heart Box", made=["peanuts"], short="One whole pound of Mountain Magic in a heart box.", **V)
add("valentines-chocolate-pizza", "valentines-day-chocolate-pizza", "chocolates", name="Valentine's Chocolate Pizza",
    short="Milk chocolate pizza with sprinkles and valentine decorations.", **V)
add("valentines-pretzel-stack", "valentines-day-gourmet-chocolate-pretzel-stack", "chocolates",
    name="Valentine's Pretzel Stack", made=["wheat"], short="Eight decorated twists in milk, white and dark.", **V)
add("valentines-oreo-dozen", "valentines-day-milk-chocolate-oreo-dozen-gift-pack", "chocolates",
    name="Valentine's Oreo Dozen", made=["wheat"], short="Twelve milk chocolate Oreos with festive decorations.", **V)

# ---------- Spring: Easter + Mother's Day ----------
E = dict(season=["spring"], badge="seasonal")
add("easter-apple", "easter-gourmet-caramel-apple", A, name="Easter Apple", fam=["chocolate", "candy"],
    short="White chocolate, colorful drizzle and an Easter sugar piece.", **E)
add("easter-pretzel-stack", "easter-chocolate-covered-pretzel-gourmet-stack", "chocolates", name="Easter Pretzel Stack",
    made=["wheat"], short="Six hand-dipped twists with spring decorations.", **E)
add("small-easter-basket", "small-easter-basket", "chocolates", name="Small Easter Basket", made=["wheat"],
    short="Twists, rods, Oreos, pops, jelly beans and half-dipped Peeps, ready to go.", **E)
add("large-hollow-bunny", "large-hollow-bunny", "chocolates", name="Large Hollow Bunny",
    short="Gourmet chocolate bunny, filled with jelly beans.", **E)
add("hatching-chick-oreos", "hatching-chick-oreo-cookies", "chocolates", name="Hatching Chick Oreos", made=["wheat"],
    short="Hand-dipped, hand-decorated hatching chicks.", **E)
add("mothers-day-strawberries", "mothers-day-chocolate-covered-strawberries-sm", "strawberries",
    name="Mother's Day Strawberries, Half Dozen", ship=False, short="Six berries dipped to order, in Mom's color.", **E)
add("mothers-day-strawberries-dozen", "copy-of-mothers-day-chocolate-covered-strawberries-sm-1", "strawberries",
    name="Mother's Day Strawberries, Dozen", ship=False, short="A dozen berries dipped to order, in Mom's color.", **E)
add("mom-oreo-pack", "mom-oreo-pack", "chocolates", name="MOM Oreo Pack", made=["wheat"],
    short="Three dipped Oreos with an M&M flower, cute as a daisy.", **E)

# ---------- Graduation ----------
add("custom-photo-oreos", "custom-graduation-oreos", "chocolates", name="Custom Photo Oreos", made=["wheat"],
    season=["graduation"], badge="seasonal", ship=False, quote=True,
    short="Your grad's photo on a chocolate-covered Oreo. Priced per order.")

# ---------- copy cleanup ----------
FIXES = {
    "lustrious": "lustrous", "hazlenut": "hazelnut", "compliment": "complement", "recieve": "receive",
    "ooooooozing": "oozing", "chose a": "choose a", "Chocolate Sea is": "Chocolate sea salt is",
}


def clean(s):
    s = html.unescape(re.sub(r"<br\s*/?>|</p>|</li>|</div>", "\n", s or ""))
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"\*?Price is for ONE\*?", "", s, flags=re.I)
    s = re.sub(r"\$\d+\.\d\d per pretzel twist", "", s)
    s = s.replace("—", ", ").replace("–", "-").replace("*", "")
    s = re.sub(r"[\U0001F300-\U0001FAFF☀-➿]", "", s)
    for a, b in FIXES.items():
        s = s.replace(a, b)
    lines = [re.sub(r"[ \t ]+", " ", l).strip() for l in s.split("\n")]
    out = []
    for l in lines:
        if not l:
            continue
        # move shouty fulfillment/ordering notes out of the description body
        if re.search(r"PLEASE NOTE|PLEASE SPECIFY|PLEASE READ|preferred pickup date", l):
            continue
        out.append(l)
    return " ".join(out).replace(" ,", ",").strip()


def img_url(src):
    u = "https:" + src if src.startswith("//") else src
    if ".heic" in u.lower():  # the CDN serves HEIC as PNG/WebP when a width is requested
        u += ("&" if "?" in u else "?") + "width=1600"
    return u


def money(a):
    return {"amount": f"{float(a):.2f}", "currencyCode": "USD"}


edges = []
for c in C:
    p = raw[c["src"]]
    name = c["name"]
    imgs = p["images"]
    is_apple = c["cat"] == "apples" and "club" not in c["handle"]
    title = f"{name} Gourmet Caramel Apple" if is_apple and name not in ("Candy Apple",) and "Apple" not in name else name
    if c["handle"] == "candy-apple":
        title = "Gourmet Candy Apple"
    if c["handle"] == "caramel-apple":
        title = "Classic Caramel Apple"
    alt = f"{title} from My Favorite Sweet Shoppe in Carnegie, PA"
    images = [
        {"id": f"gid://shopify/ProductImage/{i['id']}", "url": img_url(i["src"]), "altText": alt if n == 0 else f"{title}, view {n + 1}",
         "width": i["width"], "height": i["height"]}
        for n, i in enumerate(imgs)
        if "OLDPackaging" not in i["src"]
    ]
    desc = clean(p["body_html"])
    variants = []
    prices = []
    for v in p["variants"]:
        price = float(v["price"])
        prices.append(price)
        opts = [{"name": p["options"][k]["name"], "value": v[f"option{k + 1}"]} for k in range(len(p["options"])) if v.get(f"option{k + 1}")]
        variants.append({"node": {
            "id": f"gid://shopify/ProductVariant/{v['id']}",
            "title": v["title"],
            "sku": v.get("sku") or None,
            "availableForSale": bool(v.get("available", True)),
            "price": money(v["price"]),
            "compareAtPrice": money(v["compare_at_price"]) if v.get("compare_at_price") else None,
            "selectedOptions": opts,
        }})
    options = [{"id": f"gid://shopify/ProductOption/{o['id']}" if o.get("id") else None, "name": o["name"], "values": o["values"]}
               for o in p["options"]]
    meta = {
        "category": c["cat"],
        "flavor_families": c.get("fam", []),
        "made_with": c.get("made", []),
        "allergen_note": ALLERGEN_NOTE,
        "pickup": True,
        "ships": c.get("ship", True),
        "badge": c.get("badge"),
        "seasons": c.get("season", []),
        "short_description": c["short"],
        "kind": c.get("kind"),
        "requires_quote": c.get("quote", False),
        "shopify_handle": c["src"],
    }
    metafields = [
        {"namespace": "mfss", "key": k,
         "type": "list.single_line_text_field" if isinstance(v, list) else ("boolean" if isinstance(v, bool) else "single_line_text_field"),
         "value": json.dumps(v) if isinstance(v, list) else (("true" if v else "false") if isinstance(v, bool) else v)}
        for k, v in meta.items() if v is not None
    ]
    node = {
        "id": f"gid://shopify/Product/{p['id']}",
        "handle": c["handle"],
        "title": title,
        "description": desc,
        "descriptionHtml": f"<p>{html.escape(desc)}</p>",
        "productType": p["product_type"] or c["cat"],
        "vendor": p["vendor"],
        "tags": p["tags"],
        "availableForSale": any(v["node"]["availableForSale"] for v in variants),
        "onlineStoreUrl": f"{STORE}/products/{quote(c['src'])}",
        "publishedAt": p["published_at"],
        "priceRange": {"minVariantPrice": money(min(prices)), "maxVariantPrice": money(max(prices))},
        "featuredImage": images[0] if images else None,
        "images": {"edges": [{"node": i} for i in images]},
        "options": options,
        "variants": {"edges": variants},
        "metafields": metafields,
    }
    if c["cat"] == "club":
        node["sellingPlanGroups"] = {"edges": [{"node": {
            "name": "The Caramel Apple Club",
            "options": [{"name": "Deliver every", "values": ["month", "2 months", "season"]}],
            "sellingPlans": {"edges": [
                {"node": {"id": "gid://shopify/SellingPlan/691579158712", "name": "Monthly", "description": "A new box every month.",
                          "options": [{"name": "Deliver every", "value": "month"}], "recurringDeliveries": True}},
                {"node": {"id": "gid://shopify/SellingPlan/691579322552", "name": "Every other month", "description": "A new box every two months.",
                          "options": [{"name": "Deliver every", "value": "2 months"}], "recurringDeliveries": True}},
                {"node": {"id": "gid://shopify/SellingPlan/691579355320", "name": "Seasonally", "description": "A new box every season.",
                          "options": [{"name": "Deliver every", "value": "season"}], "recurringDeliveries": True}},
            ]},
        }}]}
    edges.append({"cursor": c["handle"], "node": node})

missing = [e["node"]["handle"] for e in edges if not e["node"]["featuredImage"]]
assert not missing, missing
handles = [e["node"]["handle"] for e in edges]
assert len(handles) == len(set(handles))

out = {
    "_source": "Pulled from https://myfavoritesweetshoppe.com/products.json on 2026-10-14. Shaped like the Shopify Storefront API `products` connection so it can be swapped for a live query. Custom attributes live in `metafields` (namespace `mfss`).",
    "data": {"products": {"edges": edges, "pageInfo": {"hasNextPage": False, "endCursor": handles[-1]}}},
}
json.dump(out, open(f"{OUT}/products.json", "w"), indent=2, ensure_ascii=False)
print(len(edges), "products written")
for e in edges:
    n = e["node"]
    print(f"  {n['handle']:46} {n['priceRange']['minVariantPrice']['amount']:>6} - {n['priceRange']['maxVariantPrice']['amount']:>6} imgs={len(n['images']['edges'])}  {n['title']}")
