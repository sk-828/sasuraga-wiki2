from matplotlib.pyplot import text
from numpy import array
from bs4 import BeautifulSoup
# Webページを取得して解析する

array=["1-1","2-2","3-3","4-1","5-2","6-4","7-5","8-3","9-1","10-2","11-5"]

def makeText(url):
  t=[]
  path = 'logs/テキスト抜き出しまとめ.txt'
  soup = BeautifulSoup(open("./logs/"+url+".html", encoding='utf-8'), "html.parser")
  # HTML全体を表示する
  for element in soup.find_all('span', class_='message'):    # すべてのliタグを検索して表示
    t.append(element.text)
  with open(path, 'a',encoding="utf-8") as f:
    for d in t:
      f.write("%s\n" % d)

path = 'logs/テキスト抜き出しまとめ.txt'
text=[]
with open(path, 'w',encoding="utf-8") as f:
    f.write("")
for i in range(len(array)):
  makeText(array[i])

