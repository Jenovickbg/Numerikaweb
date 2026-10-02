"""Generate web assets from the preserved originals (requires Pillow)."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
# The two trusted brand exports exceed Pillow's default pixel warning threshold.
Image.MAX_IMAGE_PIXELS = 150_000_000


def export(source, target, size, *, crop=None, lossless=True):
    with Image.open(ROOT / source) as image:
        image = image.convert("RGBA")
        if crop:
            image = image.crop(crop)
        image.thumbnail(size, Image.Resampling.LANCZOS)
        output = ROOT / target
        if output.suffix == ".webp":
            image.save(output, lossless=lossless, quality=85, method=6)
        else:
            image.save(output, optimize=True)
        print(f"{target}: {image.width}x{image.height}, {output.stat().st_size:,} bytes")


for width in (640, 1120):
    export("assets/images/numerika360-technologie.png",
           f"assets/images/numerika360-technologie-{width}.webp",
           (width, width * 3 // 4), lossless=False)

# Match the old centered 468% CSS background crop, without its huge empty canvas.
for source, target in (("motifs-40.png", "motif-outline.webp"),
                       ("motifs en blanc-39.png", "motif-white.webp")):
    export(f"assets/icons/{source}", f"assets/icons/{target}",
           (960, 1600), crop=(4914, 1941, 7586, 6393))

for source, target in (("logo.png", "logo-web.webp"),
                       ("logo_blanc.png", "logo-blanc-web.webp")):
    export(f"assets/logo/{source}", f"assets/logo/{target}", (540, 180))

for size, name in ((48, "favicon-48.png"), (180, "apple-touch-icon.png")):
    export("assets/logo/favicon.png", f"assets/logo/{name}", (size, size))
