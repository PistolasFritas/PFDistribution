import pathlib, re, sys
SITE = pathlib.Path('/home/claude/site')
PAGES = ['index','es','fr','de','it','pt','pl','ru','ar','hi','zh','ja']

# 1) remove the silver design medal from the Double Gold (Spirits) gallery
OLD_SF = "sf:['images/award-sf-1_7.jpg','images/award-sf-2.jpg','images/award-sf-3.jpg','images/award-sf-4.jpg']"
NEW_SF = "sf:['images/award-sf-1_7.jpg','images/award-sf-2.jpg','images/award-sf-3.jpg']"

# 2) append SIP Platinum Package Design to the Design Competition row subtitle
RX = re.compile(r'(<div class="comp">SF World Design Competition</div><div class="what">)([^<]*)(</div>)')
ADD = " · SIP Awards Platinum — Package Design"

ok = True
for p in PAGES:
    f = SITE / (p + '.html')
    t = f.read_text(encoding='utf-8')
    if t.count(OLD_SF) != 1:
        print(f'{p}: SKIP sf gallery count={t.count(OLD_SF)}'); ok = False; continue
    m = RX.findall(t)
    if len(m) != 1:
        print(f'{p}: SKIP row5 matches={len(m)}'); ok = False; continue
    t = t.replace(OLD_SF, NEW_SF)
    t = RX.sub(lambda mo: mo.group(1) + mo.group(2) + ADD + mo.group(3), t)
    f.write_text(t, encoding='utf-8')
    print(f"{p}: patched (subtitle now: {m[0][1] + ADD})")
sys.exit(0 if ok else 1)
