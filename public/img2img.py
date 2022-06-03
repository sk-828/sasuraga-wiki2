import os
import glob
from unicodedata import name
from PIL import Image
def resize(name):
  dst_dir = "img/"+name
  os.makedirs(dst_dir, exist_ok=True)
  files = glob.glob("./img-original/"+name+"/*.png")
  for f in files:
      img = Image.open(f)
      widthRate=img.width/600
      heightRate=img.height/800
      if widthRate>heightRate:
        g=widthRate
      else:
        g=heightRate
      if g<1:
        g=1
      img_resize = img.resize((int(img.width //g), int(img.height //g)))
      root, ext = os.path.splitext(f)
      basename = os.path.basename(root)
      img_resize.save(os.path.join(dst_dir, basename + ext))

name=["聖人","ほらがい","ユフトゥン","もちたぬき","河辺文","黒上","ヘッドアイコン","もちたぬき/もちたぬき画像まとめ","ユフトゥン/ユフトゥン立ち絵まとめ","聖人/聖人立ち絵まとめ","聖人/聖人立ち絵まとめ/キリエ"]

for i in name:
  resize(i)